import { plainToClass } from 'class-transformer'
import _ from 'lodash'
import { MHcpEntity, MSrcRefHcpHcoEntity } from './entities'
import * as Entities from './entities'
import { MSrcHcpModel } from './model/m-src-hcp.model'
import * as SQL from './sql'
import moment from 'moment'
import 'dotenv/config'
import { DataSource } from './dataSource'
import { HcpClassificationCodeEnums } from './enum/hcp_enum'



export class Hcp {
    private _datasource: DataSource

    constructor() {
        this._datasource = new DataSource()
    }

    async transformHcp({ version }: { version?: number} = {}) {
        const conn = await this._datasource.getConnection();
        const defaultVersion = version || (await this._datasource.getVersion())
        // Truncate Table
        await conn.query(SQL.SrcDeleteData)
        await conn.query(SQL.SrcResetSequence)
        // base code
        const baseCodeList = await conn.manager.find(Entities.MBaseCodeEntity, { where: { sttsInd: 1 }, relations: ['baseCtgry']})
        const ctgryGroup = _.groupBy(baseCodeList, v => v.baseCtgry.ctgryEnglshName)
        const codeMap = {}
        _.each(ctgryGroup, (v, k) => codeMap[k] = _.zipObject(_.map(v, 'code'), _.map(v, 'name')))
        // data source
        const jsonhcps = await conn.manager.find(Entities.VeevaOriginDataEntity, { where: { versionNumber: defaultVersion }})
    
        const hcpEntities = []
        const refEntities = []
        for (const info of jsonhcps) {
            const { jsonData: { entities } } = (info as any);
            for (const item of entities) {
                const newModel = plainToClass(MSrcHcpModel, item.entity);
                newModel.setLicenses();
                const srcHcpEntities = await conn.manager.save(new Entities.MSrcHcpEntity(newModel))
                const hcpEntity = new MHcpEntity(newModel);
                

                Object.assign(hcpEntity, {
                    rcrdStateName: codeMap?.['RecordStatus']?.[hcpEntity.rcrdStateCd],
                    gender: newModel.gender === 'M' ? 1 : 0,
                    fullName: hcpEntity.fmlyName + hcpEntity.givenName,
                    clinician: hcpEntity.clssfctnCd === HcpClassificationCodeEnums.CLINICIAN_PHYSICIAN ? 1 : 0,
                    hcpTypName: codeMap?.['HCPType']?.[hcpEntity.hcpTypCd],
                    subClssFctnName: codeMap?.['HCPSubClassification']?.[hcpEntity.subClssFctnCd],
                    clssfctnName: codeMap?.['HCPClassification']?.[hcpEntity.clssfctnCd],
                    hcpSttsName: codeMap?.['HCPStatus']?.[hcpEntity.hcpSttsCd],
                    acadTitle: codeMap?.['HCPAcademicTitle']?.[hcpEntity.acadCd],
                    profTitle: codeMap?.['HCPProfessionalTitle']?.[hcpEntity.profCd],
                    spcltyName: codeMap?.['Specialty']?.[hcpEntity.spcltyCd],
                    prmryDprtmntName: codeMap?.['DepartmentClass']?.[hcpEntity.prmryDprtmntCd],
                    sttsInd: hcpEntity.hcpSttsCd === 'A' || hcpEntity.hcpSttsCd === 'U' ? 1 : 0,
                    refHcpHcos: [],
                    createdDate: moment().utc().toDate(),
                    createdUser: 'manual',
                    modifiedDate: moment().utc().toDate(),
                    modifiedUser: 'manual',
                })
                    
                hcpEntities.push(hcpEntity);
        
                const ref = newModel.parentHcos.map(item => new MSrcRefHcpHcoEntity({
                        hcpId: srcHcpEntities.id,
                        isPrmry: item.is_primary_relationship__v === 'Y' ? 1 : 0,
                        afltnRoleCd: item.afltn_role__c,
                        hcoVnEntityId: item.parent_hco_vid__v,
                        prntHcoStts: item.parent_hco_status__v,
                        rcrdStateCd: item.record_state__v,
                        isVeevaMaster: item.is_veeva_master__v,
                    })
                )
                refEntities.push(...ref)
            }
        }
        
        await conn.manager.save(refEntities)
        const [insertHcpRes, insertHcpCount] = await conn.manager.save(hcpEntities)
        console.log('----------insertHcpRes-------------', insertHcpRes)
        console.log('----------insertHcpCount-------------', insertHcpCount)
        const hcoCount = await conn.manager.query(`SELECT Count(1) FROM cmd_owner.m_hco WHERE vn_entity_id IN (SELECT hco_vn_entity_id FROM cmd_owner.m_src_ref_hcp_hco)`)
        console.log('----------hcoCount-------------', JSON.stringify(hcoCount))
        const missHco = await conn.query(SQL.SrcRef2MissHco)
        console.log('----------missing Hco entity id-------------', JSON.stringify(missHco.map(v => v.hco_vn_entity_id)))
        await conn.query(SQL.SrcRef2RefSQL)
    
        console.log('----------successfully-------------', 'successfully')
    }
}
import { plainToClass } from 'class-transformer'
import 'dotenv/config'
import _ from 'lodash'
import * as Entities from './entities'
import { MHcoEntity, MSrcHcoEntity } from './entities'
import { MSrcHcoModel } from './model'
import * as SQL from './sql'
import { DataSource } from './dataSource'

/**
 * fetch veeva hco data
 */
export class Hco {
    private _datasource: DataSource

    constructor(){
        this._datasource =  new DataSource()
    }

    /**
     * address
     */
    async transformHco({ version }: {version?:number} = {}) {
        const conn = await this._datasource.getConnection();
        const defaultVersion = version || (await this._datasource.getVersion())
        if(!defaultVersion) throw new Error('version is required')
        console.log('-----------defaultVersion------------', defaultVersion)
        // Truncate Table
        await conn.query(SQL.SrcDeleteData)
        await conn.query(SQL.SrcResetSequence)
        console.log('-----------Truncate Table------------', )

        const jsonEntities = await conn.manager.find(Entities.VeevaOriginDataEntity, { where: { versionNumber: defaultVersion }})
        // handle
        for (const info of jsonEntities) {
            const { jsonData: { entities } } = (info as any);
            for (const item of entities) {
                const mSrcHco = plainToClass(MSrcHcoModel, item.entity);
                mSrcHco.setAddress();
                mSrcHco.setParentHco();
                if (mSrcHco.hcoId) await conn.manager.save(new MSrcHcoEntity(mSrcHco))
                else console.log('----------mSrcHco is empty-------------', mSrcHco)
            }
        }

        // base code
        const baseCodeList = await conn.manager.find(Entities.MBaseCodeEntity, { where: { sttsInd: 1 }, relations: ['baseCtgry']})
        const ctgryGroup = _.groupBy(baseCodeList, v => v.baseCtgry.ctgryEnglshName)
        const codeMap = {}
        _.each(ctgryGroup, (v, k) => codeMap[k] = _.zipObject(v.map(v => v.code), v.map(v => v.name)))
        
        // src TO  m_hco
        const srcHcoEntities = await conn.manager.find(Entities.MSrcHcoEntity)
        const prvncList = await conn.manager.find(Entities.MPrvncEntity)
        const cityList = await conn.manager.find(Entities.MCityEntity)
        const cntyList = await conn.manager.find(Entities.MCntyEntity)

        const MHcoEntities: MHcoEntity[] = []
        for (const currHco of srcHcoEntities) {
            Object.assign(currHco, {
                rcrdStateName: codeMap?.['RecordStatus']?.[currHco.rcrdStateCd],
                hcoCd: currHco.hcoCd,
                subClsfctnName: codeMap?.['HCOSubClassification']?.[currHco.subClsfctnCd],
                clsfctnName: codeMap?.['HCOIndustryClassification']?.[currHco.clsfctnCd],
                hcoSttsName: codeMap?.['HCOStatus']?.[currHco.hcoSttsCd],
                hcoTypeName: codeMap?.['HCOType']?.[currHco.hcoTypeCd],
                sttsInd: currHco.hcoSttsCd === 'A' || currHco.hcoSttsCd === 'U' ? 1 : 0,
                crtDt: new Date(currHco.crtDt),
                updtDt: new Date(currHco.updtDt),
                createdDate: new Date(),
                createdUser: 'system',
                modifiedDate: new Date,
                modifiedUser: 'system',
                hospitalGradeName: codeMap['HCOHospitalGrade'][currHco.hospitalGrade],
                departmentClassName: codeMap['DepartmentClass'][currHco.departmentClass],
            })            
            const prvncObj = _.find(prvncList, { prvncCd: currHco.prvncCd });
            currHco.prvncName = prvncObj.prvncName || null;
            const cityObj = prvncObj && _.find(cityList, { prvncCd: prvncObj.prvncCd, cityName: currHco.cityName });
            currHco.cityCd = cityObj ? cityObj.cityCd : null;
            const cntyObj = cityObj && (_.find(cntyList, { cityCd: cityObj.cityCd, cntyName: currHco.cntyName }));
            currHco.cntyCd = cntyObj ? cntyObj.cntyCd : null;

            MHcoEntities.push(currHco as any as MHcoEntity);

        }
        const insertHco = await conn.manager.save(MHcoEntity, MHcoEntities);
        console.log('----------insertHco-------------', insertHco.length)
    }
}

import { createConnection } from 'typeorm'
import { v4 as uuidv4 } from 'uuid';
import xlsx from 'node-xlsx'
import fsx from 'fs-extra'
import _ from 'lodash'
import sqlstring from 'sqlstring'
import 'dotenv/config'

// set prefix to execute progame.   
/**
 * BiRongLe/QianYongQiang
 */
const prefix = 'QianYongQiang'

const UserMapping = {
    BiRongLe: '8a5f6390f5dc434cb8b36c30f2743e6e',
    QianYongQiang: 'c496f5f021e64473bd89bf7b201070b0'
}
const userId = UserMapping[prefix]
const SOURCE_DIR=__dirname + `/static/${prefix}`
const DONE_DIR=__dirname + `/static/${prefix}_DONE`

export async function main() {
    const conn = await createConnection({
        name: 'default',
        type: 'mssql',
        schema: 'dbo',
        database: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        port: 1433,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        // 'entities': Object.values(Entities),
        options: { encrypt: false },
    })

    // const count = await conn.query(`SELECT COUNT(1) FROM sys_data_dic`)
    // console.log('------------count-----------:', count);


    console.log('------------__dirname-----------:', process.env.DATABASE_PASSWORD);
    const dirs = fsx.readdirSync(SOURCE_DIR)

    for (const filename of dirs) {
        if(filename == ".DS_Store") continue;
        const filePath = `${SOURCE_DIR}/${filename}`
        const donePath = `${DONE_DIR}/${filename}`
        const backupPathName = `${DONE_DIR}/${filename}_____V2`
        try {
            const sheets = xlsx.parse(filePath, { raw: false })
            const sheet = sheets.find(sheet => sheet.data[0].some((v: any) => v.includes("检查报告")))
            if(!sheet) throw new Error(`${filename} sheet can't find.`)
            const { data, name } = sheet;
            // supplierIndex
            const supplierIndex = data.findIndex((row: any[]) => row?.[0]?.includes("供应商"))
            if(supplierIndex == -1) throw new Error(`${filename} supplierIndex can't find.`)
            // supplierIndex
            const sizeIndex = data.findIndex((row: any[]) => row?.[0]?.includes("尺寸项目"))
            if(sizeIndex == -1) throw new Error(`${filename} sizeIndex can't find.`)
            // supplierIndex
            let appearanceIndex = data.findIndex((row: any[]) => row?.[0]?.includes("外观项目"))
            if(appearanceIndex == -1) {
                appearanceIndex = sizeIndex;
                // throw new Error(`${filename} appearanceIndex can't find.`)
            }
            // remarkIndex
            const DecisionIndex = data.findIndex((row: any[]) => row?.[0]?.includes("结论"))
            if(DecisionIndex == -1) throw new Error(`${filename} DecisionIndex can't find.`)

            // transform data
            const vendorCode = replace(data[supplierIndex+1][1]) || ''
            const materialNo = data[supplierIndex+1][2] || ''
            const drawNo = data[supplierIndex+1][3] || ''
            const drawVersion = data[supplierIndex+1][6] || ''
            const materialDesc = (data[supplierIndex+1][7] || '').replace(/'/g, '‘')
            const productionType = data[supplierIndex+1][13] || ''
            const productionNo = data[supplierIndex+2][3] || ''
            const productionVersion = data[supplierIndex+2][6] || ''
            const remark = data[DecisionIndex+1][0] || ''
            if(!materialNo) throw new Error(`${filename} materialNo can't find.`)


            // appearance
            const appearanceArea = data.slice(appearanceIndex, sizeIndex)
            const appearanceArray = appearanceArea.reduce((total, row) => {
                if(row?.[1]) total.push(row[1])
                return total;
            }, [])
            if(appearanceArray.length == 0) {
                appearanceArray.push( "包装状态 (Packing)", "是否有伤 (Scratch)", "毛刺 (Burr)", "变形 (Deformed)", "油污，脏污 (Dirty)", "其它 (Others)", )
            }

            // size
            const sizeArea = data.slice(sizeIndex, DecisionIndex).filter(row => !!row?.[2])
            const sizeArray = sizeArea.reduce((total, row, index) => {
                if(index != 0 && row?.[2]) total.push(`${row[2] || ''},mm,${row[3] || ''}`)
                return total;
            }, [])


            // material
            let materialUUID = uuid()
            const materialNos = await conn.query(sqlstring.format(`SELECT * FROM material WHERE material_no=?`, [materialNo]))
            if(materialNos.length == 0) {
                await conn.query(sqlstring.format(`INSERT INTO SIEMENS_QM_DP.dbo.material 
                    (id, material_no, material_status, material_desc, create_time) VALUES(?,?,?,?,?); `, 
                    [materialUUID, materialNo, '001', materialDesc, new Date()]));
                console.log(`insert material: ${materialNo}`)
            } else {
                materialUUID = materialNos[0].id
            }

            // vendor
            let vendorUUID = uuid()
            if(vendorCode) {
                const vendors = await conn.query(sqlstring.format(`SELECT * FROM vendor WHERE code=?`, [vendorCode]))
                if(vendors.length == 0) {
                    await conn.query(sqlstring.format(`INSERT INTO SIEMENS_QM_DP.dbo.vendor
                        (id, vendor_name_en, vendor_name_cn, code, create_time)
                        VALUES(?,?,?,?,?);`, 
                        [vendorUUID, vendorCode, vendorCode, vendorCode, new Date()]));
                    console.log(`insert vendor: ${vendorCode}`)
                } else {
                    vendorUUID = ''
                }
            }

            let rlntUUID = uuid()
            if(materialUUID && vendorCode && vendorUUID) {
                const rlnts = await conn.query(sqlstring.format(`SELECT * FROM rltn_material_vendor WHERE material_id=? AND vendor_id=?;`, [materialUUID,vendorUUID]))
                if(rlnts.length == 0) {
                    await conn.query(sqlstring.format(`INSERT INTO SIEMENS_QM_DP.dbo.rltn_material_vendor
                        (id, material_id, vendor_id, del_flag, create_time)
                        VALUES(?,?,?,?,?);`, 
                        [rlntUUID, materialUUID,vendorUUID, '0', new Date()]))
                    console.log(`insert rlnt: ${rlntUUID}`)
                } else {
                    rlntUUID = rlnts[0].id
                }
            }

            // template
            const templateUUID = uuid()
            // const templateUUID = '4b2ba5ce36f84862994c7fa56e2b406d'
            await conn.query(sqlstring.format(`INSERT INTO SIEMENS_QM_DP.dbo.inspection_material_template
                (id, material_id, vendor_id, maintainer, status, draw_no, draw_version, production_no, production_version, remark, del_flag, create_time, create_user_id, update_time, update_user_id, production_category, material_list)
                VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`, 
                [templateUUID, materialUUID, vendorUUID, userId, '002', drawNo, drawVersion, productionNo, productionVersion, remark, '0', new Date(), userId, new Date(), userId, '004', 'Y']))

            console.log('-------------------------------------------------------------------------------------');
            console.log(`add template: ${templateUUID}`)


            // appearance
            for (const [index, appearanceName] of Object.entries(appearanceArray)) {
                await conn.query(sqlstring.format(`INSERT INTO SIEMENS_QM_DP.dbo.inspection_material_template_ctx
                    (id, material_template_id, item_type, series_number, item_name, del_flag, unit)
                    VALUES(?,?,?,?,?,?,?);`, 
                    [uuid(), templateUUID, '001', index+1, appearanceName, '0', '002']))
                console.log(`added 1 appearance`)
            }

            // size
            for (const [index, sizeName] of Object.entries(sizeArray)) {
                await conn.query(sqlstring.format(`INSERT INTO SIEMENS_QM_DP.dbo.inspection_material_template_ctx
                    (id, material_template_id, item_type, series_number, item_name, del_flag, unit)
                    VALUES(?,?,?,?,?,?,?);`, 
                    [uuid(), templateUUID, '002', index+1, sizeName, '0', '002']))
                console.log(`added 1 sizeName`)
            }

            fsx.ensureDir(DONE_DIR)
            const exists = fsx.pathExistsSync(donePath)
            fsx.moveSync(filePath, exists ? backupPathName : donePath)
        } catch (err) {
            console.log('------------filename-----------:', filename);
            console.log('------------err-----------:', err);
        }
    }



}


main()
    .then(() => {

        console.log('------------finally then-----------:', );
    })
    .catch(err => {
        console.log('------------finally err-----------:', err);
    })


const uuid = () => uuidv4().replace(/-/g, '')
const replace = str => str && str.replace(/\s/g, '')
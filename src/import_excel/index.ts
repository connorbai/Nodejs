import { createConnection } from 'typeorm'
import { v4 as uuidv4 } from 'uuid';
import xlsx from 'node-xlsx'
import fsx from 'fs-extra'
import _ from 'lodash'
import sqlstring from 'sqlstring'



const BiRongLe = '8a5f6390f5dc434cb8b36c30f2743e6e'
const QianYongQiang = 'c496f5f021e64473bd89bf7b201070b0'
const SOURCE_DIR=__dirname + '/static/QianYongQiang'

export async function main() {
    // const conn = await createConnection({
    //     name: 'default',
    //     type: 'mssql',
    //     schema: 'dbo',
    //     database: 'SIEMENS_QM_DP',
    //     host: '47.114.107.72',
    //     port: 1433,
    //     username: 'siemens_test',
    //     password: 'P@ssw0rd_qazwsx!@#',
    //     // 'entities': Object.values(Entities),
    //     options: { encrypt: false },
    // })

    // const count = await conn.query(`SELECT COUNT(1) FROM sys_data_dic`)
    // console.log('------------count-----------:', count);


    console.log('------------__dirname-----------:', __dirname);
    const dirs = fsx.readdirSync(SOURCE_DIR)
    console.log('------------dirs-----------:', dirs, __dirname);

    for (const filename of dirs) {
        const sheets = xlsx.parse(`${SOURCE_DIR}/${filename}`, { raw: true })
        console.log('------------sheets-----------:', sheets);
        
    }



}


main()
    .then(() => {
        console.log('------------then-----------:', );
    })
    .catch(err => {
        console.log('------------err-----------:', err);
    })


const uuid = () => uuidv4().replace(/-/g, '')
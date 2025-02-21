import fsx from 'fs-extra'
import fs from 'fs';
import _ from 'lodash';
import sqlstring from 'sqlstring';
import path, { resolve } from 'path';



const BASE_DIR = 'D:/Download'
export const main = async () => {
    let r
    const file = fsx.readJSONSync(resolve(__dirname, `./response.json`))

    const { reference_type_codes } = file

    const maps = []
    for (const it of reference_type_codes) {
        maps.push({
            code: it.code,
            zh: it.values.zh,
            en: it.values.en.replace("'", "''")
        })
    }


    /**
     * Generate SQL
     */
    let sqlstr = ''
    for (const t of maps) {
        // sqlstring.format('($)')
        sqlstr += `(9, '${t.code}', '${t.zh}', '${t.en}', 1),`
    }
    sqlstr = sqlstr.slice(0, -1)

    fsx.writeJSONSync(resolve(__dirname, `./response_transform.json`), maps)


    sqlstr = `
        INSERT INTO cmd_owner.m_base_code(
            base_ctgry_id, code, name, englsh_name, stts_ind)
        VALUES
            ${sqlstr};
    `
    // ON CONFLICT (code,base_ctgry_id, name, englsh_name) DO UPDATE SET name = EXCLUDED.name, englsh_name = EXCLUDED.englsh_name
        

    fsx.writeFileSync(resolve(__dirname, `./response_sql.sql`), sqlstr)





    









    



    console.log(sqlstr)
}

main()
import moment from "moment";
import sqlstring from 'sqlstring'


export async function main() {
    veevaTime()
    
}

function veevaTime() {
        /**
         * Veeva Data
         */
        let offsetH = 0;
        let r1 = moment('2022-08-24T00:10:37.000-07:00').add(offsetH, 'day');
        let r2 = moment('2023-03-07T00:00:00.000-07:00').add(offsetH, 'day');
        console.log(r1.utc().utcOffset(8).format('YYYY-MM-DD HH:mm:ss'), r1.valueOf());
        console.log(r2.utc().utcOffset(8).format('YYYY-MM-DD HH:mm:ss'), r2.valueOf());
        console.log('------------------------------------------------------------------------------')
        r1 = r1.utc().utcOffset(8).startOf('day').add(-1, 'day')
        r2 = r1.clone().add(1, 'day')
        console.log(r1.format('YYYY-MM-DD HH:mm:ss'), r1.valueOf());
        console.log(r2.format('YYYY-MM-DD HH:mm:ss'), r2.valueOf());
        console.log('------------------------------------------------------------------------------')
        console.log(`${r1.valueOf()}||${r2.valueOf()}`)
    
    
        /**
         * PRC Date
         */
        let t1 = moment('2022-12-19 00:00:00')
        console.log('------------------------------------------------------------------------------')
        t1 = t1.startOf('day')//.add(-1, 'day')
        let t2 = t1.clone().add(1, 'day')
        console.log('PRC: ', t1.format('YYYY-MM-DD HH:mm:ss'), t1.valueOf());
        console.log('PRC: ', t2.format('YYYY-MM-DD HH:mm:ss'), t2.valueOf());
        console.log('------------------------------------------------------------------------------')
        console.log(`${t1.valueOf()}||${t2.valueOf()}`)

        
        // [1,1,false,1,false,1,1,false,1,false,1,1,1,1,false,1,false,1,false,1,false,1,false,1,false,1,false,202305]
        const str = `
        SELECT "hpc"."year_month" AS "yearMonth", "hpc"."hco_id" AS "veevaIdH", "hpc"."pharmacy_id" AS "veevaIdP", "hpc"."ctgry_id" AS "ctgryId", "hpc"."pharmacy_type" AS "pharmacyType", "hpc"."effective_date" AS "effectiveDate", "hpc"."is_approval" AS "isApproval", "thc"."group_key" AS "groupKey", "district"."prd_gk" AS "dmGroupKey", "hco"."star_hco_id" AS "starIdH", "hco"."hco_name" AS "hcoName", "pharmacy"."star_hco_id" AS "starIdP", "pharmacy"."hco_name" AS "pharmacyName", "ctgry"."prdct_ctgry_english_name" AS "ctgryName", "nm"."org_name" "buName", "regionName"."org_name" "regionName", COALESCE("trtryNm"."org_name", "region"."desc" || ' ' || "thc"."group_key" || ' (' || COALESCE("emply"."chinese_name", 'open') || ')') AS "territoryName", COALESCE("emply"."chinese_name", 'Open' || "thc"."group_key") AS "repName", COALESCE("dmEmply"."chinese_name", 'Open' || "district"."prd_gk") AS "dmName" FROM "cmd_owner"."m_rltn_hco_prdct" "hpc" LEFT JOIN "cmd_owner"."m_rltn_trtry_hco_ctgry" "thc" ON "hpc"."year_month" = "thc"."year_month" and "hpc"."hco_id" = "thc"."hco_id" and "hpc"."ctgry_id" = "thc"."prdct_ctgry_id" and "thc"."stts_ind" = $1  LEFT JOIN "cmd_owner"."m_sales_prd" "trtry" ON "trtry"."prd_gk" = "thc"."group_key" and ("trtry"."start_cycle" <= "hpc"."year_month" and "trtry"."end_cycle" >= "hpc"."year_month") and "trtry"."stts_ind" = $2  LEFT JOIN "cmd_owner"."m_rltn_sales_org_emply" "orgEmply" ON "orgEmply"."sales_prd_id" = "trtry"."id" and ("orgEmply"."start_cycle" <= "hpc"."year_month" and "orgEmply"."end_cycle" >= "hpc"."year_month")
        and "orgEmply"."isdeleted" = $3 and "orgEmply"."stts_ind" = $4  LEFT JOIN "cmd_owner"."hcm_emply" "emply" ON "emply"."id" = "orgEmply"."emply_id" and "emply"."isdeleted" = $5 and "emply"."stts_ind" = $6  LEFT JOIN "cmd_owner"."m_sales_prd" "district" ON "district"."id" = "trtry"."prnt_org_prd_id" and ("district"."start_cycle" <= "hpc"."year_month" and "district"."end_cycle" >= "hpc"."year_month") and "trtry"."stts_ind" = $7  LEFT JOIN "cmd_owner"."m_rltn_sales_org_emply" "dmOrgEmply" ON "dmOrgEmply"."sales_prd_id" = "district"."id" and ("dmOrgEmply"."start_cycle" <= "hpc"."year_month" and "dmOrgEmply"."end_cycle" >= "hpc"."year_month")
        and "dmOrgEmply"."isdeleted" = $8 and "dmOrgEmply"."stts_ind" = $9  LEFT JOIN "cmd_owner"."hcm_emply" "dmEmply" ON "dmEmply"."id" = "dmOrgEmply"."emply_id" and "dmEmply"."isdeleted" = $10 and "dmEmply"."stts_ind" = $11  LEFT JOIN "cmd_owner"."m_sales_prd" "region" ON "region"."id" = "district"."prnt_org_prd_id" and ("region"."start_cycle" <= "hpc"."year_month" and "region"."end_cycle" >= "hpc"."year_month") and "region"."stts_ind" = $12  LEFT JOIN "cmd_owner"."m_sales_prd" "national" ON "national"."id" = "region"."prnt_org_prd_id" and ("national"."start_cycle" <= "hpc"."year_month" and "national"."end_cycle" >= "hpc"."year_month") and "national"."stts_ind" = $13  LEFT JOIN "cmd_owner"."m_sales_prd" "bu" ON "bu"."id" = "national"."prnt_org_prd_id" and ("bu"."start_cycle" <= "hpc"."year_month" and "bu"."end_cycle" >= "hpc"."year_month") and "bu"."stts_ind" = $14  LEFT JOIN "cmd_owner"."m_sales_org_nm_hstry" "nm" ON "nm"."org_id" = "bu"."org_id" and ("nm"."end_cycle" >= "thc"."year_month" and "nm"."start_cycle" <= "thc"."year_month")
        and "nm"."isdeleted" = $15 and "nm"."stts_ind" = $16  LEFT JOIN "cmd_owner"."m_sales_org_nm_hstry" "regionName" ON "regionName"."org_id" = "region"."org_id" and ("regionName"."end_cycle" >= "hpc"."year_month" and "regionName"."start_cycle" <= "hpc"."year_month")
        and "regionName"."isdeleted" = $17 and "regionName"."stts_ind" = $18  LEFT JOIN "cmd_owner"."m_sales_org_nm_hstry" "trtryNm" ON "trtryNm"."org_id" = "trtry"."org_id" and ("trtryNm"."end_cycle" >= "hpc"."year_month" and "trtryNm"."start_cycle" <= "hpc"."year_month")
        and "trtryNm"."isdeleted" = $19 and "trtryNm"."stts_ind" = $20  LEFT JOIN "cmd_owner"."m_hco" "hco" ON "hpc"."hco_id" = "hco"."hco_id" and "hco"."isdeleted" = $21 and "hco"."stts_ind" = $22  LEFT JOIN "cmd_owner"."m_hco" "pharmacy" ON "hpc"."pharmacy_id" = "pharmacy"."hco_id" and "pharmacy"."isdeleted" = $23 and "pharmacy"."stts_ind" = $24  LEFT JOIN "cmd_owner"."m_prdct_ctgry" "ctgry" ON "hpc"."ctgry_id" = "ctgry"."star_id" and "ctgry"."isdeleted" = $25 and "ctgry"."stts_ind" = $26 WHERE "hpc"."isdeleted" = $27 AND "hpc"."stts_ind" = $28 AND "hpc"."year_month" IN ($29) AND "bu"."id" IN ($30, $31, $32, $33) ORDER BY "hpc"."year_month" DESC, "thc"."group_key" ASC -- PARAMETERS: [1,1,false,1,false,1,1,false,1,false,1,1,1,1,false,1,false,1,false,1,false,1,false,1,false,1,false,1,202304,20000007,20000003,20000004,20000006]
 

        `

        const sqlstr = str.split('-- PARAMETERS:')[0].replace(/\$\d+/gi, '?')
        const paramstr = str.split('-- PARAMETERS:')[1]
        const params = eval(paramstr)

        const sql = sqlstring.format(sqlstr, params)
        // console.log('----------sql-------------', sql)
}

main()
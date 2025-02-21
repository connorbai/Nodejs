import { createConnection, getRepository } from "typeorm";
// import * as Entities from '../hco_hcp/entities';
import * as Entities from '../entities';
import { TempTable } from './TempTable';



export async function main() {
    const conn = await createConnection({
        name: 'default',
        "type": "postgres",
        "schema": "cmd_owner",
        "database": "cmds",
        "host": "127.0.0.1",
        "port": 5432,
        "username": "postgres",
        "password": "Win2008",
        "entities": Object.values(Entities),
        // "entities": [TempTable],
        logging: 'all'
    })
    const veevaEntityRepository = conn.getRepository(Entities.MRltnHcoPrdctEntity)
    // let r1 = veevaEntityRepository.createQueryBuilder('a')
    // .where('cycle IN (:cycle)', { cycle: [202307]})
    // console.log(r1.getQuery())
    // const veevaEntity = await veevaEntityRepository.findOne({ where: { id: 74 }})
    // veevaEntity.createdDate = null;
    // veevaEntity.createdUser = null;
    // const res = await veevaEntityRepository.save([veevaEntity])
    // const res = await conn.query(`SELECT * FROM CMD_OWNER.M_HCO WHERE HCO_ID IN (:$...1)`, [[20000003,20000004,20000006]])
    // console.log('----------res-------------', res)

    

    const tempTableRepository = conn.getRepository(TempTable);

    // await conn.transaction(async manager => {
        // // 创建临时表
        // await conn.query('CREATE TEMPORARY TABLE temp_table (id SERIAL  PRIMARY KEY, name VARCHAR(50))');
        // // 插入数据  // Insert data into the temporary table
        // const result = await conn.query(
        //     'INSERT INTO temp_table (id,name) VALUES (100,$1) RETURNING id',
        //     ['John']
        // );
        // // await tempTableRepository.insert({ name: 'Jane' });
        // // 查询数据
        // // const results = await tempTableRepository.find();
        // const results = await conn.query(
        //     'SELECT * FROM temp_table',
        // );
        // console.log(results);
        // // 删除临时表
        // await tempTableRepository.query('DROP TABLE temp_table');
    // })
}


main()


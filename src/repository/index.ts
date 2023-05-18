import { createConnection } from "typeorm";
import * as Entities from '../hco_hcp/entities'




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
        logging: 'all'
    })

    // const veevaEntityRepository = conn.getRepository(Entities.VeevaHcpEntity)

    // const veevaEntity = await veevaEntityRepository.findOne({ where: { id: 74 }})

    // veevaEntity.createdDate = null;
    // veevaEntity.createdUser = null;

    // const res = await veevaEntityRepository.save([veevaEntity])


    const res = await conn.query(`SELECT * FROM CMD_OWNER.M_HCO WHERE HCO_ID IN (:$...1)`, [[20000003,20000004,20000006]])
    

    console.log('----------res-------------', res)
}


main()
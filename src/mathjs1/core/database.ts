import { createConnection } from "typeorm";
import * as entities from "../entities";

export async function createDatabase() {
    const conn = await createConnection({
        name: 'default',
        "type": "postgres",
        "schema": "cmd_owner",
        "database": "cmds",
        // "host": "127.0.0.1",
        // "port": 5432,
        // "username": "root",
        // "password": "123456",
        
        "host": "192.168.100.46",
        "port": 5432,
        "username": "postgres",
        "password": "Win2008",
        // "entities": Object.values(Entities),
        "entities": Object.values(entities),
        logging: 'all'
      })
      .catch(error => {
        console.error(`Couldn't connect to the database!`);
        console.error(error);
      });
      console.log('------------conn-----------:', conn)
}
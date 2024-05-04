import { createConnection } from "typeorm";
import { User } from "./user";

export async function createDatabase() {
    const conn = await createConnection({
        name: 'default',
        "type": "postgres",
        "schema": "public",
        "database": "postgres",
        "host": "127.0.0.1",
        "port": 5432,
        "username": "root",
        "password": "123456",
        // "entities": Object.values(Entities),
        "entities": [User],
        logging: 'all'
      })
      .catch(error => {
        console.error(`Couldn't connect to the database!`);
        console.error(error);
      });
      console.log('------------conn-----------:', conn)
}
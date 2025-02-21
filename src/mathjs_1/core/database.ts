const { createConnection } = require('typeorm');

export async function createDatabase() {
  console.log('------------conn start-----------:', )
    const conn = await createConnection({
        name: 'default',
        "type": "postgres",
        "schema": "public",
        "database": "postgres",
        "host": "dify-db.clzbxkoauro6.ap-southeast-1.rds.amazonaws.com",
        "port": 5432,
        "username": "postgres",
        "password": "wRm3EXzI6SxlVuICuBtL",
        logging: 'all',
        connectionTimeout: 10e3,
        options: {
          encrypt: false
        }
      })
      .catch(error => {
        console.error(`Couldn't connect to the database!`);
        console.error(error);
      });
      console.log('------------conn-----------:', conn)
}

// createDatabase()
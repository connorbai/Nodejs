// const AWS = require('aws-sdk')
const { createConnection } = require("typeorm")
const moment = require('moment')


const {
    env: {
        DATABASE_HOST: host,
        DATABASE_PORT: port,
        DATABASE_NAME: database,
        DATABASE_USERNAME: username,
        DATABASE_PASSWORD: password,
        DATABASE_SCHEMA: schema,
    }
} = process;


exports.handler = async () => {
        const conn = await createConnection({
            type: "postgres",
            host,
            port: Number(port),
            username,
            password,
            database,
            schema,
            // entities,
            ssl: false,
        })

        // const updtDt = moment(1679500800000)// .toDate()
        // console.log('updtDt: ', updtDt.format('YYYY-MM-DD HH:mm:ss'))


        const result = await conn.query(`SELECT * FROM CMD_OWNER.M_SRC_HCO`)

        console.log(result.length)

}






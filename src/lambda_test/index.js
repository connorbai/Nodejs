const AWS = require('aws-sdk')
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
            entities,
        })

        const updtDt = moment(1679500800000).toDate()
        console.log('updtDt: ', updtDt.formart('YYYY-MM-DD HH:mm:ss'))


        const result = conn.query(`
            SELECT * FROM CMD_OWNER.M_SRC_HCO WHERE UPDT_DT > $1
            ORDER BY UPDT_DT DESC
        `, [updtDt])

        console.log(result.length)

}






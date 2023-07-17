


class LargerInert {


    /**
     * 超大批量的数据插入，实体属性的顺序要和数据库保持一致
     * 支持类型 nvarchar int bigint datetime decimal date varchar text bit
     * @param entities
     */
    public async massBulkInsert(entities: TEntity[]) {
        if (process.env.DATABASE_TYPE == 'postgres') {
            // const sqlDriver = <any>this.manager.connection.options;
            // const client = new Client(sqlDriver);
            //-----测试连接
            const client =
                process.env.ENVIRONMENT === 'local'
                    ? new Client({
                        user: process.env.DATABASE_USERNAME,
                        database: process.env.DATABASE_NAME,
                        host: process.env.DATABASE_HOST,
                        port: +process.env.DATABASE_PORT,
                        password: process.env.DATABASE_PASSWORD
                    })
                    : new Client({
                        user: process.env.DATABASE_USERNAME,
                        database: process.env.DATABASE_NAME,
                        host: process.env.DATABASE_HOST,
                        port: +process.env.DATABASE_PORT,
                        password: process.env.DATABASE_PASSWORD,
                        ssl: {
                            rejectUnauthorized: false,
                            cert: fs
                                .readFileSync('client-certificates/rds-combined-ca-bundle.pem')
                                .toString()
                        }
                    });
            await client
                .connect()
                .then(() => this.logger.log('pg connected'))
                .catch((err) => this.logger.error('connection error', err.stack));
            //console.log('Start MassBulkInsert');
            const pgtableName = `"${this.metadata.schema}"."${this.metadata.tableName}"`;
            let entityStream = ``;
            const columnList = new Array<string>();
            const props = [];
            this.metadata.columns.forEach((col) => {
                if (!col.isPrimary) {
                    columnList.push(col.databaseName);
                    props.push(col);
                }
            });
            entities.forEach((entity) => {
                const rows = props.map(function(o) {
                    if (entity[o.propertyName] == null) {
                        return 'null-string-pg';
                    } else if (o.type == 'timestamp') {
                        return new Date(entity[o.propertyName]).format('YYYY-MM-DD HH:mm:ss');
                    } else if (o.type == 'varchar' || o.type == 'text') {
                        const quoteStr = String(entity[o.propertyName])
                            .replace(/\|/g, '||')
                            .replace(/"/g, '|"');
                        return `"${quoteStr}"`;
                    } else {
                        return entity[o.propertyName];
                    }
                });
                entityStream += `${rows.join(',')}\n`;
            });
            return await new Promise((resolve, reject) => {
                const stream = client.query(
                    from(
                        `copy ${pgtableName} (${columnList.join(
                            ','
                        )}) from stdin WITH (format csv,DELIMITER ',', NULL 'null-string-pg', quote  '"',escape '|' ) `
                    )
                );
                stream.on('error', function(err) {
                    client.end();
                    reject(err);
                });
                stream.on('finish', function() {
                    client.end();
                    //console.log('----------执行结束----------');
                    resolve();
                });
                stream.write(entityStream);
                stream.end();
            });
        } else if (process.env.DATABASE_TYPE == 'mssql') {
            const tableName = `[${this.metadata.schema}].[${this.metadata.tableName}]`;
            const sqlDriver = <any>this.manager.connection.driver;
            const request = <mssql.Request>new mssql.Request(sqlDriver.master);
            const table = new mssql.Table(tableName);
            const props: string[] = [];
            this.metadata.columns.forEach((col) => {
                if (!col.isPrimary) {
                    let colType: (() => ISqlType) | ISqlType;
                    switch (col.type) {
                        case 'nvarchar':
                            if (col.length == 'max') {
                                colType = mssql.NVarChar(mssql.MAX);
                            } else if (col.length) {
                                colType = mssql.NVarChar(Number.parseInt(col.length));
                            } else {
                                throw new InternalServerErrorException(
                                    500,
                                    `${this.metadata.tableName} ${col.databaseName} length illegal`
                                );
                            }
                            break;
                        case 'int':
                            colType = mssql.Int;
                            break;
                        case 'bigint':
                            colType = mssql.BigInt;
                            break;
                        case 'datetime':
                            colType = col.isNullable ? mssql.DateTime2 : mssql.DateTime;
                            break;
                        case 'decimal':
                            colType = mssql.Decimal(col.precision, col.scale);
                            break;
                        case 'date':
                            colType = mssql.Date;
                            break;
                        case 'varchar':
                            if (col.length == 'max') {
                                colType = mssql.VarChar(mssql.MAX);
                            } else if (col.length) {
                                colType = mssql.VarChar(Number.parseInt(col.length));
                            } else {
                                throw new InternalServerErrorException(
                                    500,
                                    `${this.metadata.tableName} ${col.databaseName} length illegal`
                                );
                            }
                        case 'text':
                            colType = mssql.Text;
                            break;
                        case 'bit':
                            colType = mssql.Bit;
                            break;
                    }
                    table.columns.add(col.databaseName, colType, { nullable: col.isNullable });
                    props.push(col.propertyName);
                }
            });
            entities.forEach((entity) => {
                const rows = props.map((o) => entity[o]);
                table.rows.add(...rows);
            });
            const begintime = new Date().getTime();
            const endTime = new Date().getTime();
            //console.log(`assemble entity time span:${endTime - begintime}`);
            return await request.bulk(table);
        }
    }


}
// const { Parser } = require('node-sql-parser');

import { Parser } from 'node-sql-parser'
import { Container } from 'typedi';
import { useContainer, Validator } from 'class-validator';

// do this somewhere in the global application level:

try {
    useContainer(Container);
    let validator = Container.get(Validator);
    const parser = new Parser();
    const ast = parser.astify('SELECT * FROM t;  你好', { parseOptions: { includeLocations: true }, database: 'Postgresql' });
    
    console.log(ast);


    
} catch (e) {
    console.log(e)
}
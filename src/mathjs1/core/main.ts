import { Container } from 'typedi';
import { Validator } from 'class-validator';
import nodeXlsx from 'node-xlsx';
import * as xlsx from "xlsx";
import { metadataArgsStorage } from './global-args-storage';
import { fstat, writeFileSync } from 'fs';

export async function AppMain(model) {
    const sheets = nodeXlsx.parse('./tdRelation_test.csv', { raw: true })
    console.log('sheets: ', sheets);
    const [sheet1] = sheets
    const { data } = sheet1
    const headers = data.shift()

    const columns = metadataArgsStorage.filterColumns(model)
    const objects = data.map(v => {
        const obj = new model()
        columns.forEach(col => {
            const val = v[col.options.column]
            obj[col.propertyName] = val ? col.options.type(val) : val
        });
        return obj
    })

    for (const iterator of objects) {
        const validator = Container.get(Validator)
        const errors = await validator.validate(iterator)
        
        const constraints = errors.map(e => Object.values(e.constraints))
        const messages = constraints.flat()
        iterator['message'] = messages.join(', ')
        console.log('------------errors-----------:', errors)
    }

    console.log('objects: ', objects);
    
    const objects2 = objects.map(obj => {
        const arr = []
        columns.forEach(col => {
            arr.push(obj[col.propertyName])
        });
        return arr
    })

    const headers2 = columns.map(v => v.options.name)
    const ws = xlsx.utils.aoa_to_sheet([headers2, ...objects2], { dense: true } as any);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws);
    const buf = xlsx.write(wb, {
      type: "buffer",
      bookType: "csv",
    });

    console.log('objects: ', objects2.length);
    writeFileSync('./done.csv', buf)

}



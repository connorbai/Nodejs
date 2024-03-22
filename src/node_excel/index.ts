
import { v4 as uuidv4 } from 'uuid';
import xlsx from 'node-xlsx'
import fsx from 'fs-extra'
import _ from 'lodash'
import { add } from 'mathjs'

// set prefix to execute progame.   
/**
 * BiRongLe/QianYongQiang
 */
const prefix = 'BiRongLe'


export async function main() {
    const sheets = xlsx.parse('D:/tmp/debug/assign_precision_issue2.csv', { raw: true })
    const [sheet] = sheets
    const {name, data} = sheet
    const arr = data.map(v => v[11])
    arr.shift()
    const sum = arr.reduce((pre, next) => {
        return add(pre, next)
    }, 0)

    let indexPriceArr: any = [];
    _.forEach(arr, v => indexPriceArr.push(v));

    let indexPriceTotal = 0;
    _.forEach(indexPriceArr, num => (indexPriceTotal = add(indexPriceTotal, num)));

    const a1 = Number(`${indexPriceTotal}`.slice(0, 16));

    console.log('sheets: ', sheet);
    

}


main()
    .then(() => {

        console.log('------------finally then-----------:', );
    })
    .catch(err => {
        console.log('------------finally err-----------:', err);
    })


const uuid = () => uuidv4().replace(/-/g, '')
const replace = str => str && str.replace(/\s/g, '')
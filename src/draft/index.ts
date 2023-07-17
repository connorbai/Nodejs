
import axios from 'axios';
import _ from 'lodash';
import { add, divide } from 'mathjs';
import moment from 'moment';

const data = [
    { prdct_id: null, star_prdct_id: 18, ctgry_id: 33, star_ctgry_id: 7, cycle: 202212, }, { prdct_id: undefined, star_prdct_id: 17, ctgry_id: 33, star_ctgry_id: 7, cycle: 202212, }, { prdct_id: 129, star_prdct_id: 1, ctgry_id: 34, star_ctgry_id: 16, cycle: 202212, }, { prdct_id: 130, star_prdct_id: 31, ctgry_id: 34, star_ctgry_id: 16, cycle: 202212, }, { prdct_id: 131, star_prdct_id: 361, ctgry_id: 35, star_ctgry_id: 101, cycle: 202212, }, { prdct_id: 132, star_prdct_id: 362, ctgry_id: 35, star_ctgry_id: 101, cycle: 202212, }, { prdct_id: 133, star_prdct_id: 15, ctgry_id: 36, star_ctgry_id: 8, cycle: 202212, }, { prdct_id: 134, star_prdct_id: 16, ctgry_id: 36, star_ctgry_id: 8, cycle: 202212, }, { prdct_id: 135, star_prdct_id: 121, ctgry_id: 36, star_ctgry_id: 8, cycle: 202212, }, { prdct_id: 136, star_prdct_id: 2, ctgry_id: 37, star_ctgry_id: 23, cycle: 202212, }, { prdct_id: 137, star_prdct_id: 44, ctgry_id: 37, star_ctgry_id: 23, cycle: 202212, }, { prdct_id: 138, star_prdct_id: 42, ctgry_id: 38, star_ctgry_id: 17, cycle: 202212, }, { prdct_id: 139, star_prdct_id: 38, ctgry_id: 38, star_ctgry_id: 17, cycle: 202212, }, { prdct_id: 140, star_prdct_id: 39, ctgry_id: 39, star_ctgry_id: 18, cycle: 202212, }, { prdct_id: 141, star_prdct_id: 40, ctgry_id: 39, star_ctgry_id: 18, cycle: 202212, }, { prdct_id: 142, star_prdct_id: 41, ctgry_id: 39, star_ctgry_id: 18, cycle: 202212, }, { prdct_id: 143, star_prdct_id: 161, ctgry_id: 40, star_ctgry_id: 2, cycle: 202212, }, { prdct_id: 144, star_prdct_id: 9, ctgry_id: 40, star_ctgry_id: 2, cycle: 202212, }, { prdct_id: 145, star_prdct_id: 25, ctgry_id: 40, star_ctgry_id: 2, cycle: 202212, }, { prdct_id: 146, star_prdct_id: 10, ctgry_id: 40, star_ctgry_id: 2, cycle: 202212, }, { prdct_id: 147, star_prdct_id: 37, ctgry_id: 40, star_ctgry_id: 2, cycle: 202212, }, { prdct_id: 148, star_prdct_id: 23, ctgry_id: 41, star_ctgry_id: 11, cycle: 202212, }, { prdct_id: 149, star_prdct_id: 35, ctgry_id: 41, star_ctgry_id: 11, cycle: 202212, }, { prdct_id: 150, star_prdct_id: 81, ctgry_id: 41, star_ctgry_id: 11, cycle: 202212, }, { prdct_id: 151, star_prdct_id: 43, ctgry_id: 41, star_ctgry_id: 11, cycle: 202212, }, { prdct_id: 152, star_prdct_id: 124, ctgry_id: 41, star_ctgry_id: 11, cycle: 202212, }, { prdct_id: 153, star_prdct_id: 122, ctgry_id: 41, star_ctgry_id: 11, cycle: 202212, }, { prdct_id: 154, star_prdct_id: 381, ctgry_id: 42, star_ctgry_id: 121, cycle: 202212, }, { prdct_id: 155, star_prdct_id: 382, ctgry_id: 42, star_ctgry_id: 121, cycle: 202212, }, { prdct_id: 156, star_prdct_id: 301, ctgry_id: 43, star_ctgry_id: 81, cycle: 202212, }, { prdct_id: 157, star_prdct_id: 441, ctgry_id: 44, star_ctgry_id: 161, cycle: 202212, }, { prdct_id: 158, star_prdct_id: 421, ctgry_id: 45, star_ctgry_id: 141, cycle: 202212, }, { prdct_id: 159, star_prdct_id: 30, ctgry_id: 46, star_ctgry_id: 15, cycle: 202212, }, { prdct_id: 160, star_prdct_id: 102, ctgry_id: 47, star_ctgry_id: 41, cycle: 202212, }, { prdct_id: 161, star_prdct_id: 141, ctgry_id: 48, star_ctgry_id: 14, cycle: 202212, }, { prdct_id: 162, star_prdct_id: 261, ctgry_id: 48, star_ctgry_id: 14, cycle: 202212, }, { prdct_id: 163, star_prdct_id: 32, ctgry_id: 48, star_ctgry_id: 14, cycle: 202212, }, { prdct_id: 164, star_prdct_id: 29, ctgry_id: 48, star_ctgry_id: 14, cycle: 202212, }, { prdct_id: 165, star_prdct_id: 33, ctgry_id: 48, star_ctgry_id: 14, cycle: 202212, }, { prdct_id: 166, star_prdct_id: 101, ctgry_id: 48, star_ctgry_id: 14, cycle: 202212, }, { prdct_id: 167, star_prdct_id: 262, ctgry_id: 48, star_ctgry_id: 14, cycle: 202212, }, { prdct_id: 168, star_prdct_id: 241, ctgry_id: 48, star_ctgry_id: 14, cycle: 202212, }, { prdct_id: 879, star_prdct_id: 401, ctgry_id: 39, star_ctgry_id: 18, cycle: 202212, }, { prdct_id: 884, star_prdct_id: 383, ctgry_id: 57, star_ctgry_id: 122, cycle: 202212, }, { prdct_id: 886, star_prdct_id: 481, ctgry_id: 58, star_ctgry_id: 181, cycle: 202212, }
]

export async function main() {
    let r: any;
    let r1: any;

    r = /[0-9]+/.test('')
    r = '9' > 0

    r = _('{"a": 1,"b":2, "c": 3}').value()

    r = moment("2023-01-17 16:00:00").utc().valueOf();
    r = moment(1673971200000).format('YYYY-MM-DD HH:mm:ss')

    r1 = r - 1000 * 3600 * 24 * 1
    // let result = add('1.025', '1.025')
    // result = _.difference([1,2,3,4], [0, 1, 2])
    // result = add(result, '1.025')
    // result = add(result, '1.025')
    r = _.difference([1,2,3,4], [0, 1, 5])


    r = _.groupBy(data, 'prdct_id')

    r = getTCnCodeInEntityManager('CN70331')

    // result = moment(new Date('2022-12-04 21:31:44.106')).format('YYYY-MM-DD HH:mm:ss')
    // result = divide(2000.7789, 345.6787687)


    console.log('----------result-------------', r)
}


main()


function getTCnCodeInEntityManager(cnCode) {
    const newCnCodeValue = _.toNumber(cnCode.slice(2));
    const newValue = (new Array(5).join('0') + (newCnCodeValue + 1)).slice(-5);
    cnCode = `CN${newValue}`;
    return cnCode;
}
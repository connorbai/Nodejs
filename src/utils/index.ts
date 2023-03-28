import moment from "moment";


export async function main() {
    const data = [ 
        { "STIME": "2023-03-23 09", "DATAFLOAT": 1 }, 
        { "STIME": "2023-03-23 10", "DATAFLOAT": 3 }, 
        { "STIME": "2023-03-23 11", "DATAFLOAT": 1 }, 
        { "STIME": "2023-03-23 14", "DATAFLOAT": 5 } 
    ]
    // 补充data的数据 并返回 [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3, 1, 0, 0, 5 ] 数组长度为STIME截取后两位的最大值+1 即 14 + 1 
    // 数组的值为对应的DATAFLOAT值 无对应值则填充0
   
    function handler(dt) {
        dt.forEach(v => v.STIME = +v.STIME.slice(-2))
        const maxValue = Math.max(...dt.map(v => v.STIME)) + 1
        const result = new Array(maxValue).fill(0)
        dt.forEach((v, i) => result[v.STIME] = v.DATAFLOAT)
       return result
    }

    console.log(
        '----------------------------------------------',
        handler(data)
    );

    // /**
    //  * Veeva Data
    //  */
    // let offsetH = 0;
    // let r1 = moment('2023-02-27T23:08:59.000-08:00').add(offsetH, 'day');
    // let r2 = moment('2023-03-07T00:00:00.000-07:00').add(offsetH, 'day');
    // console.log(r1.utc().utcOffset(8).format('YYYY-MM-DD HH:mm:ss'), r1.valueOf());
    // console.log(r2.utc().utcOffset(8).format('YYYY-MM-DD HH:mm:ss'), r2.valueOf());
    // console.log('------------------------------------------------------------------------------')
    // r1 = r1.utc().utcOffset(8).startOf('day')//.add(-1, 'day')
    // r2 = r1.clone().add(1, 'day')
    // console.log(r1.format('YYYY-MM-DD HH:mm:ss'), r1.valueOf());
    // console.log(r2.format('YYYY-MM-DD HH:mm:ss'), r2.valueOf());
    // console.log('------------------------------------------------------------------------------')
    // console.log(`${r1.valueOf()}||${r2.valueOf()}`)



    // /**
    //  * PRC Date
    //  */
    // let t1 = moment('2023-3-1 00:00:00')
    // console.log('------------------------------------------------------------------------------')
    // t1 = t1.startOf('day')//.add(-1, 'day')
    // let t2 = t1.clone().add(1, 'day')
    // console.log(t1.format('YYYY-MM-DD HH:mm:ss'), t1.valueOf());
    // console.log(t2.format('YYYY-MM-DD HH:mm:ss'), t2.valueOf());
    // console.log('------------------------------------------------------------------------------')
    // console.log(`${t1.valueOf()}||${t2.valueOf()}`)


    

}

main()
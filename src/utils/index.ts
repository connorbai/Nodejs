import moment from "moment";


export async function main() {
    veevaTime()
    
}

function veevaTime() {
        /**
         * Veeva Data
         */
        let offsetH = 0;
        let r1 = moment('2023-03-21T23:01:19.000-07:00').add(offsetH, 'day');
        let r2 = moment('2023-03-07T00:00:00.000-07:00').add(offsetH, 'day');
        console.log(r1.utc().utcOffset(8).format('YYYY-MM-DD HH:mm:ss'), r1.valueOf());
        console.log(r2.utc().utcOffset(8).format('YYYY-MM-DD HH:mm:ss'), r2.valueOf());
        console.log('------------------------------------------------------------------------------')
        r1 = r1.utc().utcOffset(8).startOf('day').add(-1, 'day')
        r2 = r1.clone().add(3, 'day')
        console.log(r1.format('YYYY-MM-DD HH:mm:ss'), r1.valueOf());
        console.log(r2.format('YYYY-MM-DD HH:mm:ss'), r2.valueOf());
        console.log('------------------------------------------------------------------------------')
        console.log(`${r1.valueOf()}||${r2.valueOf()}`)
    
    
        /**
         * PRC Date
         */
        let t1 = moment('2022-12-19 00:00:00')
        console.log('------------------------------------------------------------------------------')
        t1 = t1.startOf('day')//.add(-1, 'day')
        let t2 = t1.clone().add(1, 'day')
        console.log('PRC: ', t1.format('YYYY-MM-DD HH:mm:ss'), t1.valueOf());
        console.log('PRC: ', t2.format('YYYY-MM-DD HH:mm:ss'), t2.valueOf());
        console.log('------------------------------------------------------------------------------')
        console.log(`${t1.valueOf()}||${t2.valueOf()}`)
}

main()
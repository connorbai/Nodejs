import _ from 'lodash'
import 'dotenv/config'



import { Hco } from './hco'
import { Hcp } from './hcp'
import { fetchDataByUrl } from './fetchByUrl'
import { fetchByHcoId, fetchDataByIds } from './fetchDataByIds'


export const main = async () => {
    const ids = [111]
    const type: string = 'HCO'
    // const auth = new AuthorizationService();
    // await auth.fetchSession()
    
    // const dataSource = new DataSource()
    // dataSource.setDataType(TypeEnum.HCOVEEVAURL);
    // dataSource.setJsonFileDirectory(resolve(__dirname, './static/json_data'));
    // await dataSource.fetchData();
    process.env.VEEVA_SESSION = 'test'

    if(type == 'HCO') {
        const res = await fetchByHcoId(ids)
        const hco = new Hco()
        await hco.transformHco({ version: -1 })
    }

    if(type == 'HCP') {
        const hcp = new Hcp()
        await hcp.transformHcp({ version: -1 })
    }
}


main()
    .then((res) => {
        console.log('----------res-------------', res)
    })
    .catch((err) => {
        console.log('----------err-------------', err)
    })


import('fs').then(f => f.writeFileSync('./filename.text', 'aaa'))
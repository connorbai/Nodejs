import _ from 'lodash'
import 'dotenv/config'



import { Hco } from './hco'
import { fetchDataByUrl } from './fetchByUrl'
import { fetchDataByIds } from './fetchDataByIds'


export const main = async () => {
    // const auth = new AuthorizationService();
    // await auth.fetchSession()
    
    // const dataSource = new DataSource()
    // dataSource.setDataType(TypeEnum.HCOVEEVAURL);
    // dataSource.setJsonFileDirectory(resolve(__dirname, './static/json_data'));
    // await dataSource.fetchData();
    
    // const res = await fetchDataByUrl()
    const res = await fetchDataByIds()

    // const hco = new Hco()
    // await hco.transformHco({ version: 36 })

    // const hcp = new Hcp()
    // await hcp.transformHcp({ version: 32 })
}


main()
    .then((res) => {
        console.log('----------res-------------', res)
    })
    .catch((err) => {
        console.log('----------err-------------', err)
    })


import('fs').then(f => f.writeFileSync('./filename.text', 'aaa'))
import { URL } from 'url'
import { request } from '../../common/request';
import _ from 'lodash';
import { DataSource } from './dataSource';


const hcpUrl = 'https://lillycn.veevanetwork.com/api/v16.0/search?q=*&offset=0&limit=100&types=HCP&sort=master_vid__v&filters=range||modified_date__v:1658826000000||1658912400000~primary_country__v:CN~record_state__v:VALID&includeMasterResults=false'
// modified_date__v
const hcoUrl = 'https://lillycn.veevanetwork.com/api/v16.0/search?q=*&offset=0&limit=100&types=HCO&sort=master_vid__v&filters=range||modified_date__v:1658826000000||1658912400000~primary_country__v:CN~record_state__v:VALID&includeMasterResults=false'
const HCO_URL = 'https://lillycn.veevanetwork.com/api/v16.0/hcos/Network:Entity:{VEEVA_ENTITY_ID}'
const HCP_URL = 'https://lillycn.veevanetwork.com/api/v16.0/hcps/Network:Entity:{VEEVA_ENTITY_ID}'
const HCP_URL_BY_HCPID = 'https://lillycn.veevanetwork.com/api/v16.0/search?q=*&offset=0&limit=100&types=HCP&filters=lilly_hcp_id__c:CN-{HCP_ID}HCP'

export const fetchDataByUrl = async () => {
    // const _uri = hcpUrl;
    // const _type = 'HCP'
    const _uri = hcoUrl;
    const _type = 'HCO'
    
    const datasource = new DataSource()
    datasource.addVersion()

    const uriObject = new URL(_uri);
    uriObject.searchParams.delete('limit')
    uriObject.searchParams.delete('offset')
    uriObject.searchParams.append('limit', '0')
    uriObject.searchParams.append('offset', '0')
    const totalCountResponse = await request({
        url: uriObject.pathname + uriObject.search,
        method: 'GET',
    })

    const { totalCount } = (totalCountResponse || {});
    const pageSize = Math.ceil(totalCount/100)
    const pageIndexArray = _.times(pageSize, v => v + 1);

    console.log('----------totalCount,PageSize-------------', totalCount, pageSize)
    


    
    for (const pageIndex of pageIndexArray) {
        console.log('----------limit,offset,pageIndex-------------', 100, (pageIndex - 1) * 100, pageIndex)
        const uriObject = new URL(_uri);
        uriObject.searchParams.delete('offset')
        uriObject.searchParams.append('offset', `${(pageIndex - 1) * 100}`)
        const chunk = await request({
            url: uriObject.pathname + uriObject.search,
            method: 'GET',
        })

        await datasource.saveMetadata({ data: chunk, type: _type, url: uriObject.toString(), offset: `${(pageIndex - 1) * 100}`})
    }

    console.log('----------res-------------', totalCountResponse)
}
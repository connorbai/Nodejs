import { URL } from 'url'
import { request } from '../../common/request';
import _ from 'lodash';
import { DataSource } from './dataSource';

const hcpUrl = 'https://lillycn.veevanetwork.com/api/v16.0/search?q=*&offset=0&limit=100&types=HCP&sort=master_vid__v&filters=range||modified_date__v:1658768400000||1658854800000~primary_country__v:CN~record_state__v:VALID&includeMasterResults=false'
const hcoUrl = 'https://lillycn.veevanetwork.com/api/v16.0/search?q=*&offset=0&limit=100&types=HCO&sort=master_vid__v&filters=range||modified_date__v:1658768400000||1658854800000~primary_country__v:CN~record_state__v:VALID&includeMasterResults=false'
const HCO_URL = 'https://lillycn.veevanetwork.com/api/v16.0/hcos/Network:Entity:{VEEVA_ENTITY_ID}'
const HCP_URL = 'https://lillycn.veevanetwork.com/api/v16.0/hcps/Network:Entity:{VEEVA_ENTITY_ID}'
const HCP_URL_BY_HCPID = 'https://lillycn.veevanetwork.com/api/v16.0/search?q=*&offset=0&limit=100&types=HCP&filters=lilly_hcp_id__c:CN-{HCP_ID}HCP'
const HCO_URL_BY_HCID = 'https://lillycn.veevanetwork.com/api/v16.0/search?q=*&offset=0&limit=100&types=HCP&filters=lilly_hcp_id__c:CN-{HCP_ID}HCP'

export const fetchDataByIds = async ids => {
    // await fetchByVeevaId(ids)
    // await fetchByHcpId(ids)
    await fetchByHcoId(ids)
}

const fetchByVeevaId = async (ids) => {
    const _TYPE = 'HCP';
    // const _TYPE = 'HCO';
    const _URI = _TYPE == 'HCP' ? HCP_URL : HCO_URL;

    const datasource = new DataSource()
    datasource.addVersion()

    const connection = (await datasource.getConnection())
    // const [,response] = await connection.query(`update cmd_owner.m_sales_prd set modifieddate=now();`)
    // const response = await connection.query(`INSERT INTO cmd_owner.api_credential(appid, appname) VALUES ('test', 'test');`)
    // const response = await connection.query(`INSERT INTO cmd_owner.api_credential(appid, appname) (SELECT appid, appname FROM cmd_owner.api_credential LIMIT 1) RETURNING ID`)
    for (const veevaId of ids) {
        const reponse = await request({
            url: _URI.replace('{VEEVA_ENTITY_ID}', veevaId),
            method: 'GET',
        })
        if(reponse.responseStatus !== 'SUCCESS') throw reponse
        const { entities } = (reponse || {})
        const entitiy = entities && entities.length > 0 && entities[0] || {}

        await datasource.saveMetadata({ data: reponse, type: _TYPE, url: _URI + veevaId, offset: `0`})
    }
    console.log('----------done-------------')
}

export const fetchByHcpId = async (ids) => {
    let _URI = '/api/v21.0/search?q=*&offset=0&limit=100&types=HCP&filters=lilly_hcp_id__c:CN-{HCP_ID}HCP'
    // _URI += 'DELETED,UNDER_REVIEW,MERGED_INTO,MERGE_INACTIVATED,MERGE_ADDED,INVALID,VALID'
    const datasource = new DataSource()
    datasource.addVersion()

    for (const hcpId of ids) {
        const url = _URI.replace(`{HCP_ID}`, hcpId)
        const reponse = await request({
            url,
            method: 'GET',
        })
        if(reponse.responseStatus !== 'SUCCESS') throw new Error('HCP_ID not exits')
        const { entities } = (reponse || {})
        const entitiy = entities && entities.length > 0 && entities[0] || {}

        await datasource.saveMetadata({ data: reponse, type: 'HCP', url, offset: `0`})
    }
    console.log('----------done-------------')
}

export const fetchByHcoId = async (ids) => {
    const _URI = '/api/v16.0/search?q=*&offset=0&limit=100&types=HCO&filters=lilly_hco_id__c:CN-{HCO_ID}HCO'

    const datasource = new DataSource()
    datasource.addVersion()

    const urls = []
    for (const hcoId of ids) {
        const url = _URI.replace(`{HCO_ID}`, hcoId)
        urls.push(url)
    }

    const chunks = _.chunk(urls, 20)

    for (const chunk of chunks) {
        const promiseChunk = chunk.map(uri => request({ url: uri, method: 'GET', }))
        const promiseResponse = await Promise.all(promiseChunk)
        for (const [index, reponse] of Object.entries(promiseResponse)) {
            if(reponse.responseStatus !== 'SUCCESS') throw new Error('HCO_ID not exits')
            const { entities } = (reponse || {})
            const entitiy = entities && entities.length > 0 && entities[0] || {}
    
            await datasource.saveMetadata({ data: reponse, type: 'HCO', url: chunk[index], offset: `0`})
        }
    }

    // for (const hcoId of ids) {
    //     const reponse = await request({
    //         url,
    //         method: 'GET',
    //     })
    //     if(reponse.responseStatus !== 'SUCCESS') throw new Error('HCO_ID not exits')
    //     const { entities } = (reponse || {})
    //     const entitiy = entities && entities.length > 0 && entities[0] || {}

    //     await datasource.saveMetadata({ data: reponse, type: 'HCP', url, offset: `0`})
    // }
    console.log('----------done-------------')
}
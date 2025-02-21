
/**
 *
 */
const data = [
	{
		"STAR_CSTMR_ID" : 1000116,
		"VENDOR_CN_NM" : "瑞康医药集团股份有限公司",
		"SKU_MTRL_CODE" : "TA445458WCN",
		"SKU_EN_NM" : "Zydis 10mg*7",
		"sec" : 0
	}
]

import _ from 'lodash'

group = _.groupBy(data, 'STAR_CSTMR_ID')
console.log(group)
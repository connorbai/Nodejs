const _ = require('lodash')
const { divide } = require('mathjs')
const math = require('mathjs');

/* 
        "ctgryStarId": 16,
        "ctgryNm": "Alimta",
        "indctnId": "CN_304530-DS039"
*/
const data = [
    {
        "ctgryStarId": 16,
        "ctgryNm": "Alimta",
        "indctnId": "CN_304530-DS039"
    },
    {
        "ctgryStarId": 16,
        "ctgryNm": "Alimta",
        "indctnId": "CN_304530-DS041"
    },
    {
        "ctgryStarId": 16,
        "ctgryNm": "Alimta",
        "indctnId": "CN_304530-DS125"
    },
    {
        "ctgryStarId": 16,
        "ctgryNm": "Alimta",
        "indctnId": "CN_304530-DS002"
    },
    {
        "ctgryStarId": 8,
        "ctgryNm": "Zyprexa",
        "indctnId": "CN_304452-DS018"
    },
    {
        "ctgryStarId": 8,
        "ctgryNm": "Zyprexa",
        "indctnId": "CN_304452-DS049"
    },
    {
        "ctgryStarId": 23,
        "ctgryNm": "Zydis",
        "indctnId": "CN_304457-DS018"
    },
    {
        "ctgryStarId": 23,
        "ctgryNm": "Zydis",
        "indctnId": "CN_304457-DS049"
    },
    {
        "ctgryStarId": 17,
        "ctgryNm": "Cymbalta",
        "indctnId": "CN_304475-DS101"
    },
    {
        "ctgryStarId": 17,
        "ctgryNm": "Cymbalta",
        "indctnId": "CN_304475-DS025"
    },
    {
        "ctgryStarId": 17,
        "ctgryNm": "Cymbalta",
        "indctnId": "CN_304475-DS030"
    },
    {
        "ctgryStarId": 18,
        "ctgryNm": "Strattera",
        "indctnId": "CN_304516-DS013"
    },
    {
        "ctgryStarId": 2,
        "ctgryNm": "Prozac",
        "indctnId": "CN_304554-DS025"
    },
    {
        "ctgryStarId": 2,
        "ctgryNm": "Prozac",
        "indctnId": "CN_304554-DS112"
    },
    {
        "ctgryStarId": 2,
        "ctgryNm": "Prozac",
        "indctnId": "CN_304554-DS070"
    },
    {
        "ctgryStarId": 11,
        "ctgryNm": "Humalog",
        "indctnId": "CN_304542-DS026"
    },
    {
        "ctgryStarId": 121,
        "ctgryNm": "Trulicity",
        "indctnId": "CN_304529-DS026"
    },
    {
        "ctgryStarId": 81,
        "ctgryNm": "Jardiance",
        "indctnId": "CN_304544-DS026"
    },
    {
        "ctgryStarId": 81,
        "ctgryNm": "Jardiance",
        "indctnId": "CN_304544-653067"
    },
    {
        "ctgryStarId": 161,
        "ctgryNm": "Taltz",
        "indctnId": "CN_304528-DS151"
    },
    {
        "ctgryStarId": 141,
        "ctgryNm": "Olumiant",
        "indctnId": "CN_304547-DS158"
    },
    {
        "ctgryStarId": 141,
        "ctgryNm": "Olumiant",
        "indctnId": "CN_304547-708039"
    },
    {
        "ctgryStarId": 15,
        "ctgryNm": "Evista",
        "indctnId": "CN_304503-DS044"
    },
    {
        "ctgryStarId": 41,
        "ctgryNm": "Forteo",
        "indctnId": "CN_304561-DS044"
    },
    {
        "ctgryStarId": 14,
        "ctgryNm": "Cialis",
        "indctnId": null
    },
    {
        "ctgryStarId": 3,
        "ctgryNm": "Vancocin",
        "indctnId": null
    },
    {
        "ctgryStarId": 4,
        "ctgryNm": "Humulin",
        "indctnId": "CN_304535-DS026"
    },
    {
        "ctgryStarId": 12,
        "ctgryNm": "Humapen",
        "indctnId": "CN_304468-DS026"
    },
    {
        "ctgryStarId": 21,
        "ctgryNm": "Ceclor(Liquid)",
        "indctnId": null
    },
    {
        "ctgryStarId": 22,
        "ctgryNm": "Ceclor(Solid)",
        "indctnId": null
    },
    {
        "ctgryStarId": 82,
        "ctgryNm": "Trajenta Duo",
        "indctnId": null
    },
    {
        "ctgryStarId": 61,
        "ctgryNm": "Trajenta",
        "indctnId": null
    },
    {
        "ctgryStarId": 122,
        "ctgryNm": "Tyvyt",
        "indctnId": null
    },
    {
        "ctgryStarId": 122,
        "ctgryNm": "Tyvyt",
        "indctnId": null
    },
    {
        "ctgryStarId": 122,
        "ctgryNm": "Tyvyt",
        "indctnId": null
    },
    {
        "ctgryStarId": 122,
        "ctgryNm": "Tyvyt",
        "indctnId": null
    },
    {
        "ctgryStarId": 181,
        "ctgryNm": "Verzenios",
        "indctnId": "CN_304521-DS171"
    },
    {
        "ctgryStarId": 181,
        "ctgryNm": "Verzenios",
        "indctnId": "CN_304521-558393"
    },
    {
        "ctgryStarId": 202,
        "ctgryNm": "Halpryza",
        "indctnId": null
    },
    {
        "ctgryStarId": 221,
        "ctgryNm": "Cyramza",
        "indctnId": null
    },
    {
        "ctgryStarId": 101,
        "ctgryNm": "Elunate",
        "indctnId": null
    },
    {
        "ctgryStarId": 7,
        "ctgryNm": "Gemzar",
        "indctnId": "CN_304525-DS006"
    },
    {
        "ctgryStarId": 7,
        "ctgryNm": "Gemzar",
        "indctnId": "CN_304525-DS008"
    },
    {
        "ctgryStarId": 7,
        "ctgryNm": "Gemzar",
        "indctnId": "CN_304525-DS148"
    },
    {
        "ctgryStarId": 7,
        "ctgryNm": "Gemzar",
        "indctnId": "CN_304525-DS007"
    }
]

const options = _.groupBy(data, 'ctgryStarId')

r1 = _.groupBy(data, v => `${v.ctgryNm}_${v.ctgryStarId}`)
r1 = Object.values(r1)
r2 = _.map(r1, v => v[0])

r = _.mapValues(options, (arr) =>  _.uniq(_.map(arr, 'indctnId')))
r = _.omitBy(r, v => !v[0]);


// r = divide('0.0000909411', '116.7')
// r = r.toString()
// console.log('typeof r: ', typeof r);
console.log('r: ', '' + r);
// r = r.toExponential()
// console.log('r: ', r.toFixed(18));


// const resultString = math.format(r, { notation: 'auto' });
// console.log('resultString: ', resultString, typeof resultString);
// console.log('r: ', (r).toFixed(18));
// console.log('r: ', (r).toFixed(18).replace(/\.\d+$/, ""));
// console.log('r: ', ('1.00000000000').replace(/\.0+$/, ""));
// console.log('r: ', ('1.000000200000').replace(/\.0+$/, "").replace(/(\.\d+[1-9])0+$/, "$1"));




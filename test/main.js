
// math.test.js
// const math = require('./math');
const sinon = require('sinon');
const math = require('mathjs')


describe('subtract()', () => {
  it('should correctly subtract two numbers', () => {
    // 每月月供额=〔贷款本金×月利率×(1+月利率)^还款月数〕÷〔(1+月利率)^还款月数-1〕
    let scope = {total: 615000,lv: 4.4 / 100 / 12, mns: 30 * 12, i: 2}
    const node1 = math.parse('(total * lv * (1+lv) ^ mns) / ((1+lv)^mns-1)') // 12
    const code1 = node1.compile()
    const  r1 = code1.evaluate(scope) // 12

    // 每月应还利息=贷款本金×月利率×〔(1+月利率)^还款月数-(1+月利率)^(还款月序号-1)〕÷〔(1+月利率)^还款月数-1〕
    const node2 = math.parse('total * lv * ((1+lv)^mns-(1+lv) ^ (i - 1)) / ((1+lv) ^ mns - 1)') // 12
    const code2 = node2.compile()
    const  r2 = code2.evaluate(scope) // 12

    // 每月应还本金=贷款本金×月利率×(1+月利率)^(还款月序号-1)÷〔(1+月利率)^还款月数-1〕
    const node3 = math.parse('total*lv*(1+lv)^(i-1) / ((1+lv)^mns - 1) ') // 12
    const code3 = node3.compile()
    const  r3 = code3.evaluate(scope) // 12

    // 总利息=还款月数×每月月供额-贷款本金
    scope.r1 = r1
    const node4 = math.parse('mns * r1 - total') // 12
    const code4 = node4.compile()
    const  r4 = code4.evaluate(scope) // 12

    console.log('1: ', 1);
  });
});


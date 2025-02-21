// math.test.js
const math = require('mathjs')
const fs = require('fs')


describe('mathjs()', () => {
  it('s', () => {
    /**
     // 每月月供额=〔贷款本金×月利率×(1+月利率)^还款月数〕÷〔(1+月利率)^还款月数-1〕
     * 
     */
    let scope = {total: 615000,lv: 4.4 / 100 / 12, mns: 30 * 12, i: 1}
    const node1 = math.parse('(total * lv * (1+lv) ^ mns) / ((1+lv)^mns-1)')
    const code1 = node1.compile()
    const  r1 = code1.evaluate(scope)

    /**
     // 每月应还利息=贷款本金×月利率×〔(1+月利率)^还款月数-(1+月利率)^(还款月序号-1)〕÷〔(1+月利率)^还款月数-1〕
     * 
     */
    const node2 = math.parse('total * lv * ((1+lv)^mns-(1+lv) ^ (i - 1)) / ((1+lv) ^ mns - 1)')
    const code2 = node2.compile()
    const  r2 = code2.evaluate(scope)

    /**
     // 每月应还本金=贷款本金×月利率×(1+月利率)^(还款月序号-1)÷〔(1+月利率)^还款月数-1〕
     * 
     */
    const node3 = math.parse('total*lv*(1+lv)^(i-1) / ((1+lv)^mns - 1) ')
    const code3 = node3.compile()
    const  r3 = code3.evaluate(scope)
    
    /**
     * 
     */
    scope.r1 = r1
    const node4 = math.parse('(mns - 1) * r1 - total')
    const code4 = node4.compile()
    const  r4 = code4.evaluate(scope)

    scope.total2 = 615000
    const node5 = math.parse('total2 - r3')
    const code5 = node5.compile()

    fs.writeFileSync('./filename.txt', '')
    new Array(30*12).fill(true).forEach((v,i) => {
      scope.i = i + 1
      const r2 = code2.evaluate(scope)
      const r3 = code3.evaluate(scope)
      scope.r3 = r3
      const r4 = code4.evaluate(scope)
      const rest = code5.evaluate(scope)
      scope.total2 = rest
      fs.appendFileSync('./filename.txt', `${i+1},${r3.toFixed(2)},${r2.toFixed(2)},${rest.toFixed(2)}\n`)
    })
    console.log('1: ', 1);
  });
});


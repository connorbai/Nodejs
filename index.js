// import _ from 'lodash'
const _ = require('lodash')


var users = [];
 
// Sort by `user` in ascending order and by `age` in descending order.
let a = _.orderBy(users, 'title');
let r = _.map(a, 'title')
// => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
console.log(r)
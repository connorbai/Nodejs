import axios from 'axios'
const Authorization = "Bearer {{token}}"
const query = "{ employees( pageNum:1 pageSize:100 ){ edges{ accountName globalEmployeeId chineseName } totalCount } }"

axios.request({
    url: 'https://cmdsapi.qa.lilly.cn/employee',
    method: 'POST',
    headers: { Authorization, 'Content-Type': 'application/json', },
    data: { query }
})
   .then(response => {
    console.log(response)
   })
   .catch(error => {
    console.log('error', error)
   });



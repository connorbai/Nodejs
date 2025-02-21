import axios from 'axios'

// const request = axios.create({
//     baseURL: `https://lillycn.veevanetwork.com`, // prd
//     // baseURL: `https://sandbox.veevanetwork.com`, // qa
//     timeout: 20e3,
// });


// // Add a request interceptor
// request.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     config.headers.Authorization = process.env.VEEVA_SESSION
//     return config;
// }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
// });

// // Add a response interceptor
// request.interceptors.response.use(function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     if(response.status === 200) return response.data;
//     return response
// }, function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
// });

// request({
//     method: 'POST',
//     url: 'http://localhost',
//     params: {

//     }
// })
// .then(response => {

// })
// .catch(error => {

// })

axios.request({
  url: 'https://cmdsapi.qa.lilly.cn/employee',
  method: 'POST',
  data: {
    query: 'query{employees(pageNum:1 pageSize:10 ){edges{accountName}totalCount}}',
  },
  headers: {
    Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Il9DSkFPdHlzWVZtNXhjMVlvSzBvUTdxeUJDUSIsImtpZCI6Il9DSkFPdHlzWVZtNXhjMVlvSzBvUTdxeUJDUSJ9.eyJhdWQiOiJhcGk6Ly81MjVkNGQ4MS03ZTM1LTQyY2EtODdkYy1jN2MxZmUzZTgwMWYiLCJpc3MiOiJodHRwczovL3N0cy5jaGluYWNsb3VkYXBpLmNuL2VkYTE3ODFiLTE0YzUtNDdjNC1hYmEzLTc2NmE2ZjNhNTBmZC8iLCJpYXQiOjE3MDE4NDgzNTUsIm5iZiI6MTcwMTg0ODM1NSwiZXhwIjoxNzAxODUyMjU1LCJhaW8iOiI0MkpnWUhDc1ptYzZYYy9HNy83czlneXhQckdYQUE9PSIsImFwcGlkIjoiNTI1ZDRkODEtN2UzNS00MmNhLTg3ZGMtYzdjMWZlM2U4MDFmIiwiYXBwaWRhY3IiOiIxIiwiaWRwIjoiaHR0cHM6Ly9zdHMuY2hpbmFjbG91ZGFwaS5jbi9lZGExNzgxYi0xNGM1LTQ3YzQtYWJhMy03NjZhNmYzYTUwZmQvIiwib2lkIjoiMzM0ZTczM2ItZDU4OC00NDJiLTk5YWUtYjRhNTExYmY5YTQ3IiwicmgiOiIwLkRBSUFHM2loN2NVVXhFZXJvM1pxYnpwUV9ZRk5YVkkxZnNwQ2g5ekh3ZjQtZ0I4Q0FBQS4iLCJzdWIiOiIzMzRlNzMzYi1kNTg4LTQ0MmItOTlhZS1iNGE1MTFiZjlhNDciLCJ0aWQiOiJlZGExNzgxYi0xNGM1LTQ3YzQtYWJhMy03NjZhNmYzYTUwZmQiLCJ1dGkiOiI3UW9wLWxwZ1gwNkdvbXVxMkFaaUFBIiwidmVyIjoiMS4wIn0.u46CvXkAZxEO2OpFxQejxVV3Myl5DbsfXrfzXqk38Sl3jIZZTaZvC5YfrLpGd7DaJ2IouKY8PunRN-UYYyLsw-IOUS5MF6y0nFCsCVbBss5PX3ucO1Zoytfx4Ll1GjC_S1Meapm6X1sur-1B4cr8jpgbPkEwUENVdVOKBPdi4F0692y2PCepFAlnPEP6sTOSgccRjx2hFV_OSThm6Dhl5BqJPHORHRxjuyiej4eUIXfhRdDAzoZYmPE2V-iWbzEhgEAl3f5pIAqzN-fWNi7Tu7GzM5snP7fQeUsorsLsZBq9W9e78IdhE3N3rQuBAwz9Fce_WT8j2qtmcfTrw2F59w`,
    'Content-Type': 'application/json',
  },
}).then(res => {
  console.log(res);
})
  .catch(
    err => {
      console.log(err);
    }
  );
import { createClient } from 'redis'

async function main() {
  let r
  console.log('container init');
  
  const client = createClient({
    url: 'redis://127.0.0.1:6379'
  });
  console.log('createClient done')
  

  client.on('error', err => console.log('Redis Client Error', err));

  console.log('client connect....')
  await client.connect();
  console.log('client connect done')
  
  
  // await client.set('retriveHcpJob-20230130', 'SUCCEED');
  // await client.lPush('test', '1');
  // await client.lPush('test', '2');
  // await client.lPush('test', '3');
  // await client.lPush('test', '4');


  // r = await client.lLen('test');
  r = await client.lRange('test', 0, -1);
  console.log(r)
  // r = await client.lIndex('test', '1');
  r = await client.lPos('test', '1');
  console.log(r)

  const value = await client.get('retriveHcpJob-20230130');
  console.log('value', value)
  
  // for await (const key of client.scanIterator({  TYPE: 'string',  MATCH: 'retriveHcpJob*',  COUNT: 1000})) {
  for await (const key of client.scanIterator()) {
    // await client.sendCommand(['DEL', key]);
    const redisValue = await client.get(key);
    console.log('redisKey----Value: ', key, '----', redisValue)
    

  }

  await client.disconnect();
  console.log('disconnect')
}

main()
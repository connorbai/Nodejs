import Redis from 'ioredis'



async function main() {
    
    let r
    const redis = new Redis()
    redis.on('error', e => console.log(e))
    await redis.set('key', 'value')
    r = await redis.get('key')
    console.log(r)

    await redis.rpush('t', 1)
    const v = await redis.lindex('t', -1)
    await redis.rpush('t', +v+1)
    r = await redis.lrange('t', 0, -1)



    console.log(r)
}

main()


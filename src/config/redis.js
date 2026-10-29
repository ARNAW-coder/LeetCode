import { createClient } from 'redis';
import dotenv from 'dotenv';
dotenv.config("../.env");


const redisClient = createClient({
    username: 'default',
    password: process.env.REDIS_PASS,
    socket: {
        host: 'ultraquiet-popcorn-icing-57443.db.redis.io',
        port: 13391
    }
});

redisClient.on('error', err => console.log('Redis Client Error', err));

// await client.connect();

// await client.set('foo', 'bar');
// const result = await client.get('foo');
// console.log(result)  // >>> bar

export {redisClient};
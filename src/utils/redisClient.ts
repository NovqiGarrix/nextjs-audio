import Redis from 'ioredis';

export class RedisClient {

    public static redisClient: Redis;

    public static getClient() {
        if (this.redisClient) return this.redisClient;

        const REDIS_CONNECTION_STRING = process.env.REDIS_CONNECTION_STRING;
        if (!REDIS_CONNECTION_STRING) throw new Error("Redis Connection Not Found!");

        this.redisClient = new Redis(REDIS_CONNECTION_STRING);
        return this.redisClient;
    }

}
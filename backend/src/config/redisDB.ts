import { promisify } from "util";
import { createClient, RedisClientType } from "redis";

// Define custom types or interfaces as needed

class RedisClient {
  client;

  constructor() {
    const host: string = process.env.REDIS_HOST || "localhost";
    const port: string | number = process.env.REDIS_PORT || 6379;

    this.client = createClient({ url: `redis://${host}:${port}` });

    this.client.on("error", (err: Error) => {
      console.error("Redis client failed to connect:", err);
    });
  }

  connected(): Promise<boolean | Error> {
    return new Promise((resolve, reject) => {
      this.client
        .connect()
        .then(() => {
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  async set(key: string, value: any, exp: number): Promise<string> {
    return this.client.SETEX(key, exp, value);
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;

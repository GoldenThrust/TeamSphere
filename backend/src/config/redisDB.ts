import { promisify } from "util";
import { createClient, RedisClientType } from "redis";
import { Dev } from "../utils/constants";
import fs from "fs";

// Define custom types or interfaces as needed

class RedisClient {
  client;

  constructor() {
    if (Dev) {
      this.client = createClient({ url: `redis://localhost:6379` });
    } else {
      this.client = createClient({
        password: process.env.REDIS_PASSWORD,
        socket: {
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT)
        },
      });
    }

    this.client.on("error", (err: Error) => {
      console.error("Redis client failed to connect:", err);
    });
  }

  async connected(){
    try {
      await this.client.connect();
      console.log("Successfully connected to Redis!");
    } catch (err) {
      console.error("Redis client failed to connect:", err);
    }
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

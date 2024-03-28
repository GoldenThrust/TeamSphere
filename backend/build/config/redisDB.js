"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
// Define custom types or interfaces as needed
class RedisClient {
    constructor() {
        const host = process.env.REDIS_HOST || "localhost";
        const port = process.env.REDIS_PORT || 6379;
        this.client = (0, redis_1.createClient)({ url: `redis://${host}:${port}` });
        this.client.on("error", (err) => {
            console.error("Redis client failed to connect:", err);
        });
    }
    connected() {
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
    set(key, value, exp) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.SETEX(key, exp, value);
        });
    }
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.get(key);
        });
    }
}
const redisClient = new RedisClient();
exports.default = redisClient;

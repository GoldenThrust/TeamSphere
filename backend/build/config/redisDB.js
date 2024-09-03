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
const constants_1 = require("../utils/constants");
// Define custom types or interfaces as needed
class RedisClient {
    constructor() {
        if (constants_1.Dev) {
            this.client = (0, redis_1.createClient)({ url: `redis://localhost:6379` });
        }
        else {
            this.client = (0, redis_1.createClient)({
                password: process.env.REDIS_PASSWORD,
                socket: {
                    host: process.env.REDIS_HOST,
                    port: Number(process.env.REDIS_PORT)
                },
            });
        }
        this.client.on("error", (err) => {
            console.error("Redis client failed to connect:", err);
        });
    }
    connected() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.connect();
                console.log("Successfully connected to Redis!");
            }
            catch (err) {
                console.error("Redis client failed to connect:", err);
            }
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

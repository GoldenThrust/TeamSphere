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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const constants_1 = require("../utils/constants");
require("dotenv/config");
class DB {
    constructor() {
        this.uri = constants_1.Dev ? "mongodb://0.0.0.0:27017/TeamSphere" : `${process.env.DB_CONNECTION}`;
    }
    connected() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield mongoose_1.default.connect(this.uri, {
                    autoIndex: true,
                });
                console.log("Successfully connected to MongoDB!");
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}
const mongoDB = new DB();
exports.default = mongoDB;

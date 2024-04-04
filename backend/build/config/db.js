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
require("dotenv").config();
class DB {
    constructor() {
        const isProduction = process.env.PRODUCTION === 'true';
        const db = process.env.DB_CONNECTION || 'mongodb';
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || 27017;
        const database = process.env.DB_DATABASE || 'TeamSphere';
        const uri = isProduction ? `${process.env.DB_CONNECTION}` : `${db}://${host}:${port}/${database}`;
        console.log();
        try {
            mongoose_1.default.connect(uri, { autoIndex: true });
        }
        catch (error) {
            console.error(error);
        }
    }
    connected() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                mongoose_1.default.connection.once("open", () => {
                    resolve(true);
                });
                mongoose_1.default.connection.on("error", err => {
                    reject(err);
                });
            });
        });
    }
}
const mongoDB = new DB();
exports.default = mongoDB;

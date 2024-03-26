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
const sinon_1 = require("sinon");
const chai_1 = require("chai");
const node_test_1 = require("node:test");
const db_1 = __importDefault(require("../../src/config/db"));
(0, node_test_1.describe)("DB Connection", () => {
    (0, node_test_1.it)("DB Connection", () => __awaiter(void 0, void 0, void 0, function* () {
        const mongo = (0, sinon_1.spy)(db_1.default);
        (0, chai_1.expect)(yield mongo.connected).to.be(true);
    }));
});

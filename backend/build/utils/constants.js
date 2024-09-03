"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dev = exports.COOKIE_NAME = void 0;
exports.COOKIE_NAME = "auth_token";
exports.Dev = process.env.NODE_ENV === "production" ? false : true;

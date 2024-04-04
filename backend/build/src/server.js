"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
require('dotenv').config();
const authentication_1 = __importDefault(require("./routes/authentication"));
const meeting_1 = __importDefault(require("./routes/meeting"));
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.listen(PORT, () => {
    db_1.default.connected()
        .then((res) => {
        console.log("DB connection successful -----");
    })
        .catch((err) => {
        console.log("DB connection failed", err);
    });
    console.log(`Server is running on port ${PORT}`);
});
app.get('/test', (req, res) => {
    res.json({ "hello": "world" });
});
// ..... Routes ......
app.use('/user', authentication_1.default);
app.use('/meeting', meeting_1.default);
exports.default = app;

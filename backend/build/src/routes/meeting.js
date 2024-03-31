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
const express_1 = require("express");
const { WebsocketServer } = require('ws');
const Meeting = require('../models/meeting');
const router = (0, express_1.Router)();
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const meeting = new Meeting(req.body);
        yield meeting.save()
            .then((result) => {
            console.log('meeting created');
            res.status(200).json(result);
        })
            .catch((err) => {
            console.log(`Error on creating a meething ${err}`);
            res.status(500).json({ error: `Error on creating a meething ${err}` });
        });
    }
    catch (err) {
        console.log(`Error on creating a meething ${err}`);
        res.status(500).json({ error: `Error on creating a meething ${err}` });
    }
});
const join = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (err) {
    }
});
// create a meeting
router.post('/create', create);
// join a meeting
router.get('/join', join);
exports.default = router;

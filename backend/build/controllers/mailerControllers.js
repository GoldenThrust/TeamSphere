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
const user_1 = __importDefault(require("../models/user"));
const mailservice_1 = __importDefault(require("../config/mailservice"));
class MailerController {
    sendMail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_1.default.findById(res.locals.jwtData.id);
            const { emails, id } = req.body;
            const name = (user === null || user === void 0 ? void 0 : user.firstname) + " " + (user === null || user === void 0 ? void 0 : user.lastname);
            const data = {
                name,
                emails,
                id,
            };
            try {
                mailservice_1.default.sendInvite(data);
            }
            catch (e) {
                res.status(400).send({ message: e.message });
            }
            res.status(201).send({});
        });
    }
}
const mailer = new MailerController();
exports.default = mailer;

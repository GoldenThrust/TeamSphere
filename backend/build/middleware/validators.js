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
exports.signupValidator = exports.loginValidator = exports.validate = void 0;
const express_validator_1 = require("express-validator");
function validate(validations) {
    return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        for (let validation of validations) {
            const result = yield validation.run(req);
            if (!result.isEmpty()) {
                break;
            }
        }
        const errors = (0, express_validator_1.validationResult)(req);
        if (errors.isEmpty()) {
            return next();
        }
        return res.status(422).json({ errors: errors.array() });
    });
}
exports.validate = validate;
;
exports.loginValidator = [
    (0, express_validator_1.body)("email").trim().isEmail().withMessage("Email is required"),
    (0, express_validator_1.body)("password")
        .trim()
        .isLength({ min: 6 })
        .withMessage("Password should contain at least 6 characters"),
];
exports.signupValidator = [
    (0, express_validator_1.body)("firstname").notEmpty().withMessage("Firstname is required"),
    (0, express_validator_1.body)("lastname").notEmpty().withMessage("Lastname is required"),
    // Custom validation to check if a file exists in the request
    (0, express_validator_1.body)().custom((value, { req }) => {
        if (!req.file) {
            throw new Error('Image is required');
        }
        return true;
    }),
    ...exports.loginValidator,
];

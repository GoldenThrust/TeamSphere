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
const UserModel = require('../models/user');
const { validateRegistrationData } = require('../utils/validate');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = (0, express_1.Router)();
const registration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Validate email and password
        const errors = validateRegistrationData(req.body);
        if (errors)
            return res.status(400).json({ errors });
        // Check if there is a user with the same email
        const existingUser = yield UserModel.findOne({ email });
        console.log(existingUser);
        if (existingUser)
            return res.status(400).json({ message: 'Email already exists' });
        // Hash the password before saving it to the database
        const hashedPassword = yield bcrypt.hash(password, 10);
        const user = new UserModel({ email, password: hashedPassword });
        yield user.save();
        res.status(201).json({ message: 'User created successfully' });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Validate email and password
        const errors = validateRegistrationData(req.body);
        if (errors)
            return res.status(400).json({ errors });
        // Find user by email
        const user = yield UserModel.findOne({ email });
        if (!user)
            return res.status(401).json({ message: 'Invalid credentials' });
        // Compare passwords
        const isMatch = yield bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ message: 'Invalid credentials' });
        // Generate JWT
        const token = jwt.sign({ id: user._id }, 'Teamsphere');
        res.status(200).json({ message: 'Login successful', token });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server error' });
    }
});
router.post('/create', registration);
router.post('/login', login);
exports.default = router;

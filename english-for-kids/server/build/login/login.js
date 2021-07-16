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
const status_codes_1 = require("../status-codes");
// eslint-disable-next-line no-bitwise,no-param-reassign
const hashCode = (s) => s.split('').reduce((a, b) => { a = ((a << 5) - a) + b.charCodeAt(0); return a & a; }, 0);
const routerLog = express_1.Router();
const hashes = [];
const checkAuth = (hash) => {
    if (hashes.find((item) => item === hash))
        return true;
    return false;
};
routerLog.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const loginPass = JSON.parse(data);
    if (!loginPass.login || !loginPass.pass)
        return res.sendStatus(400);
    const hash = String(hashCode(loginPass.login + loginPass.pass + String(new Date().getTime())));
    hashes.push(hash);
    if (loginPass.login === 'admin' && loginPass.pass === 'admin')
        return res.status(status_codes_1.StatusCodes.Ok).json(hash);
    return res.status(status_codes_1.StatusCodes.BadRequest).send('login or pass incorrect');
}));
routerLog.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const auth = String(req.headers.authentication);
    if (!checkAuth(auth) || !auth)
        return res.status(status_codes_1.StatusCodes.Ok).json('user not Authorized');
    const index = hashes.findIndex((item) => auth === item);
    hashes.splice(index, 1);
    return res.status(status_codes_1.StatusCodes.Ok).json('ok');
}));
routerLog.get('/check', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!checkAuth(String(req.headers.authentication)) || !req.headers.authentication)
        return res.status(403).send('user not Authorized');
    return res.status(status_codes_1.StatusCodes.Ok).json('ok');
}));
exports.default = routerLog;

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
exports.upload = void 0;
const express_1 = require("express");
// eslint-disable-next-line import/no-extraneous-dependencies
const multer_1 = __importDefault(require("multer"));
const data_1 = require("../data");
const repository_1 = require("./repository");
const status_codes_1 = require("../status-codes");
const Constatnts_1 = require("../Constatnts");
const login_1 = require("../login/login");
const storageConfig = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        if (file.mimetype === 'audio/mpeg')
            cb(null, `${Constatnts_1.UPLOAD_FILE_PATH}/audio`);
        else if (file.mimetype === 'image/jpeg')
            cb(null, `${Constatnts_1.UPLOAD_FILE_PATH}/img`);
        else
            cb(null, `${Constatnts_1.UPLOAD_FILE_PATH}`);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
exports.upload = multer_1.default({ storage: storageConfig });
const wordsRouter = express_1.Router();
wordsRouter.delete('/:name/:index', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!login_1.checkAuth(String(req.headers.authentication)) || !req.headers.authentication)
        return res.status(403).send('user not Authorized');
    const index = Number(req.params.index);
    const nameCategory = String(req.params.name);
    const indexOfCategory = data_1.categories.findIndex((item) => nameCategory === item);
    if (indexOfCategory < 0 || index < 0)
        return res.sendStatus(400);
    if (Number.isNaN(index) || data_1.words[indexOfCategory].length < index || index < 0) {
        return res.sendStatus(400);
    }
    try {
        const message = yield repository_1.deleteWord(indexOfCategory, index);
        return res.status(status_codes_1.StatusCodes.Ok).json(message);
    }
    catch (e) {
        console.log(e);
        return res.status(status_codes_1.StatusCodes.BadRequest).send(e.message);
    }
}));
wordsRouter.post('/rename/:name/:index', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!login_1.checkAuth(String(req.headers.authentication)) || !req.headers.authentication)
        return res.status(403).send('user not Authorized');
    const data = req.body;
    const index = Number(req.params.index);
    const nameCategory = String(req.params.name).replace(/%/g, ' ');
    const indexOfCategory = data_1.categories.findIndex((item) => nameCategory === item);
    if (indexOfCategory < 0 || index < 0)
        return res.sendStatus(400);
    if (Number.isNaN(index) || data_1.words[indexOfCategory].length < index || index < 0) {
        return res.sendStatus(400);
    }
    try {
        const message = yield repository_1.replaceWord(indexOfCategory, index, JSON.parse(data));
        return res.status(status_codes_1.StatusCodes.Ok).json(message);
    }
    catch (e) {
        console.log(e);
        return res.status(status_codes_1.StatusCodes.BadRequest).send(e.message);
    }
}));
wordsRouter.post('/:name/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!login_1.checkAuth(String(req.headers.authentication)) || !req.headers.authentication)
        return res.status(403).send('user not Authorized');
    const nameCategory = String(req.params.name).replace(/%/g, ' ');
    const indexOfCategory = data_1.categories.findIndex((item) => nameCategory === item);
    if (indexOfCategory < 0)
        return res.status(400).send(`Category with name  ${nameCategory}  not exists`);
    try {
        const message = yield repository_1.createEmptyWord(indexOfCategory);
        console.log('createEmptyWord  complite');
        return res.status(status_codes_1.StatusCodes.Ok).json(message);
    }
    catch (e) {
        console.log(e);
        return res.status(status_codes_1.StatusCodes.BadRequest).send(e.message);
    }
}));
wordsRouter.post('/upload/:name/:index', exports.upload.any(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!login_1.checkAuth(String(req.headers.authentication)) || !req.headers.authentication)
        return res.status(403).send('user not Authorized');
    if (!req.body.wordConfig)
        return res.sendStatus(400);
    const index = Number(req.params.index);
    const nameCategory = String(req.params.name).replace(/%/g, ' ');
    const indexOfCategory = data_1.categories.findIndex((item) => nameCategory === item);
    if (indexOfCategory < 0 || index < 0)
        return res.sendStatus(400);
    if (Number.isNaN(index) || data_1.words[indexOfCategory].length < index || index < 0) {
        return res.sendStatus(400);
    }
    try {
        const message = yield repository_1.replaceWord(indexOfCategory, index, JSON.parse(req.body.wordConfig));
        return res.status(status_codes_1.StatusCodes.Ok).json(message);
    }
    catch (e) {
        console.log(e);
        return res.status(status_codes_1.StatusCodes.BadRequest).send(e.message);
    }
}));
exports.default = wordsRouter;

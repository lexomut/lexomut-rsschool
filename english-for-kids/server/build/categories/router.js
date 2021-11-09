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
const repository_1 = require("./repository");
const status_codes_1 = require("../status-codes");
const login_1 = require("../login/login");
const router = express_1.Router();
router.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allCategories = yield repository_1.getAllWords();
    return res.json(allCategories);
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allCategories = yield repository_1.getCategories();
    return res.json(allCategories);
}));
router.get('/:index', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // if (!checkAuth(String(req.headers.authentication)) || !req.headers.authentication) return res.status(403).send('user not Authorized');
    const index = Number(req.params.index);
    const allCategories = yield repository_1.getAllWords();
    if (Number.isNaN(index) || allCategories.length < index || index < 0) {
        return res.sendStatus(400);
    }
    const allWords = yield repository_1.getWordsByIndex(index);
    if (!allWords) {
        return res.sendStatus(404);
    }
    return res.json(allWords);
}));
// Delete category
router.delete('/:index', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!login_1.checkAuth(String(req.headers.authentication)) || !req.headers.authentication)
        return res.status(403).send('user not Authorized');
    const index = Number(req.params.index);
    const allCategories = yield repository_1.getAllWords();
    if (Number.isNaN(index) || allCategories.length < index || index < 0) {
        return res.sendStatus(400);
    }
    try {
        yield repository_1.deleteCategory(index).catch(console.log);
        return res.status(status_codes_1.StatusCodes.Ok).json('ok');
    }
    catch (e) {
        return res.status(status_codes_1.StatusCodes.BadRequest).send(e);
    }
}));
// Create new category
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!login_1.checkAuth(String(req.headers.authentication)) || !req.headers.authentication)
        return res.status(403).send('user not Authorized');
    const data = req.body;
    if (!data)
        return res.sendStatus(status_codes_1.StatusCodes.BadRequest);
    try {
        const newCategory = yield repository_1.createCategory(data);
        return res.json(newCategory);
    }
    catch (e) {
        return res.status(status_codes_1.StatusCodes.BadRequest).send(e);
    }
}));
router.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield repository_1.deleteEmptyCategory().catch(console.log);
    return res.status(status_codes_1.StatusCodes.Ok).json('error category deleted');
}));
router.post('/:index', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!login_1.checkAuth(String(req.headers.authentication)) || !req.headers.authentication)
        return res.status(403).send('user not Authorized');
    const index = Number(req.params.index);
    const data = req.body;
    if (!data)
        return res.sendStatus(status_codes_1.StatusCodes.BadRequest);
    try {
        const result = yield repository_1.renameCategory(data, index);
        return res.json(result);
    }
    catch (e) {
        return res.status(status_codes_1.StatusCodes.BadRequest).send(e.message);
    }
}));
exports.default = router;

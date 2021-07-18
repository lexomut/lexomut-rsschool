"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const router_1 = __importDefault(require("./categories/router"));
const wordsRouter_1 = __importDefault(require("./words/wordsRouter"));
const login_1 = __importDefault(require("./login/login"));
const staticFilesPath = path_1.default.resolve(__dirname, '../dist');
const app = express_1.default();
const indexPath = path_1.default.resolve(__dirname, '../dist/index.html');
app.use(express_1.default.json());
app.use(express_1.default.text());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(cors_1.default());
app.use(/^(?!\/api\/)/, express_1.default.static(staticFilesPath));
app.use(/^(?!\/api\/)/, (req, res) => {
    res.sendFile(indexPath);
});
app.use('/api/categories', router_1.default);
app.use('/api/words', wordsRouter_1.default);
app.use('/api/login', login_1.default);
app.listen(80, () => console.log('server started on port 80'));

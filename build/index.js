"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
//seerver instance
let app = (0, express_1.default)();
dotenv_1.default.config();
const { PORT } = process.env;
app.use(express_1.default.json());
const port = PORT;
app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});
app.get('/', (req, res) => {
    res.json({
        message: "Server started"
    });
});
exports.default = app;

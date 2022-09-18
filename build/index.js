"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var user_1 = __importDefault(require("./handlers/user"));
var product_1 = __importDefault(require("./handlers/product"));
var order_1 = __importDefault(require("./handlers/order"));
//seerver instance
var app = (0, express_1.default)();
dotenv_1.default.config();
var PORT = process.env.PORT;
app.use(express_1.default.json());
var port = PORT || 3000;
app.listen(port, function () {
    console.log("Server started at port ".concat(port));
});
(0, user_1.default)(app);
(0, product_1.default)(app);
(0, order_1.default)(app);
app.get('/', function (req, res) {
    res.json({
        message: "Server started"
    });
});
exports.default = app;

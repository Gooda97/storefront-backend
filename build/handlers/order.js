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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var order_1 = require("../models/order");
var jwt = require('jsonwebtoken');
var OrderClass = new order_1.orderClass();
var TOKEN_SECRET = process.env.TOKEN_SECRET;
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var list, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, OrderClass.index()];
            case 1:
                list = _a.sent();
                res.json(list);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.json(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var show = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var prod, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, OrderClass.show(_req.body.id)];
            case 1:
                prod = _a.sent();
                res.json(prod);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.json(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var create = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ord, ordered, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ord = {
                    user_id: _req.body.user_id,
                    products: _req.body.products
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, OrderClass.create(ord)];
            case 2:
                ordered = _a.sent();
                res.json(ordered);
                return [3 /*break*/, 4];
            case 3:
                err_3 = _a.sent();
                res.json(err_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
function checkAuth(req, res, next) {
    if (!req.headers.authorization) {
        res.status(401);
        res.json("Unauthorized access denied");
        return false;
    }
    try {
        var token = req.headers.authorization.split(" ")[1];
        if (jwt.verify(token, TOKEN_SECRET)) {
            next();
        }
        else {
            res.status(401);
            res.json("Unauthorized access denied");
            return false;
        }
    }
    catch (err) {
        console.error(err);
        res.status(401);
        return false;
    }
}
var update = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var ord, updated, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ord = {
                    id: req.params.id,
                    products: req.body.products,
                    user_id: req.body.user_id
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, OrderClass.update(ord)];
            case 2:
                updated = _a.sent();
                res.json(updated);
                return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                res.status(400);
                res.json(err_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var destroy = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, result, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = parseInt(req.params.id);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, OrderClass.delete(id)];
            case 2:
                result = _a.sent();
                return [2 /*return*/, res.json({ result: result })];
            case 3:
                err_5 = _a.sent();
                res.status(400);
                res.json(err_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var products_routes = function (app) {
    app.get('/orders', checkAuth, index);
    app.get('/orders/:id', checkAuth, show);
    app.post('/orders/create', checkAuth, create);
    app.put('/orders/:id', checkAuth, update);
    app.delete('/orders/:id', checkAuth, destroy);
};
exports.default = products_routes;

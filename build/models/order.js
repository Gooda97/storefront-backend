"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderClass = void 0;
var database_1 = __importDefault(require("../database"));
var orderClass = /** @class */ (function () {
    function orderClass() {
    }
    orderClass.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var conn, sql, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        sql = 'SELECT * FROM orders';
                        return [4 /*yield*/, conn.query(sql)];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows];
                    case 3:
                        err_1 = _a.sent();
                        throw new Error("".concat(err_1));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    orderClass.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, conn, result, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        sql = 'SELECT * FROM orders WHERE id=$1';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 2:
                        result = _a.sent();
                        conn.release();
                        return [2 /*return*/, result.rows[0]];
                    case 3:
                        err_2 = _a.sent();
                        throw new Error("Error: ".concat(err_2));
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    orderClass.prototype.create = function (order) {
        return __awaiter(this, void 0, void 0, function () {
            var products, user_id, sql, conn, result, order_1, sql1, ordered, _i, products_1, product, product_id, quantity, res, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        products = order.products, user_id = order.user_id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        sql = "INSERT INTO orders (user_id) VALUES ($1) RETURNING *";
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [user_id])];
                    case 3:
                        result = _a.sent();
                        order_1 = result.rows[0];
                        sql1 = "INSERT INTO orders_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING product_id, quantity";
                        ordered = [];
                        _i = 0, products_1 = products;
                        _a.label = 4;
                    case 4:
                        if (!(_i < products_1.length)) return [3 /*break*/, 7];
                        product = products_1[_i];
                        product_id = product.product_id, quantity = product.quantity;
                        return [4 /*yield*/, conn.query(sql1, [order_1.id, product_id, quantity])];
                    case 5:
                        res = _a.sent();
                        ordered.push(res.rows[0]);
                        _a.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7:
                        conn.release();
                        return [2 /*return*/, __assign(__assign({}, order_1), { products: ordered })];
                    case 8:
                        err_3 = _a.sent();
                        throw new Error("Could not add new order for user ".concat(user_id, ". ").concat(err_3));
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    orderClass.prototype.update = function (newData) {
        return __awaiter(this, void 0, void 0, function () {
            var id, products, user_id, sql, conn, result, order, orderProductsSql, orderProducts, _i, products_2, product, product_id, quantity, res, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = newData.id, products = newData.products, user_id = newData.user_id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        sql = "UPDATE orders SET user_id = $1 WHERE id = $2 RETURNING *";
                        return [4 /*yield*/, database_1.default.connect()];
                    case 2:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [user_id, id])];
                    case 3:
                        result = _a.sent();
                        order = result.rows[0];
                        orderProductsSql = "UPDATE orders_products SET product_id = $1, quantity = $2 WHERE order_id = $3 RETURNING product_id, quantity";
                        orderProducts = [];
                        _i = 0, products_2 = products;
                        _a.label = 4;
                    case 4:
                        if (!(_i < products_2.length)) return [3 /*break*/, 7];
                        product = products_2[_i];
                        product_id = product.product_id, quantity = product.quantity;
                        return [4 /*yield*/, conn.query(orderProductsSql, [product_id, quantity, order.id])];
                    case 5:
                        res = _a.sent();
                        orderProducts.push(res.rows[0]);
                        _a.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7:
                        conn.release();
                        return [2 /*return*/, __assign(__assign({}, order), { products: orderProducts })];
                    case 8:
                        err_4 = _a.sent();
                        throw new Error("Could not update order for user ".concat(user_id, ". ").concat(err_4));
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    orderClass.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sql1, sql, conn, result, result2, ord, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        sql1 = 'DELETE FROM orders_products WHERE order_id=$1';
                        sql = 'DELETE FROM orders WHERE id=$1 RETURNING *';
                        return [4 /*yield*/, database_1.default.connect()];
                    case 1:
                        conn = _a.sent();
                        return [4 /*yield*/, conn.query(sql1, [id])];
                    case 2:
                        result = _a.sent();
                        return [4 /*yield*/, conn.query(sql, [id])];
                    case 3:
                        result2 = _a.sent();
                        ord = result2.rows[0];
                        conn.release();
                        return [2 /*return*/, ord];
                    case 4:
                        err_5 = _a.sent();
                        throw new Error("".concat(err_5));
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return orderClass;
}());
exports.orderClass = orderClass;

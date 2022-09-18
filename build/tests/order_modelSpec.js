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
Object.defineProperty(exports, "__esModule", { value: true });
var order_1 = require("../models/order");
var user_1 = require("../models/user");
var product_1 = require("../models/product");
var ordersClass = new order_1.orderClass();
var Table = new user_1.user_table();
var Store = new product_1.store();
describe("Order Model", function () {
    var user_id, product_id, ord;
    (function createUser() {
        return __awaiter(this, void 0, void 0, function () {
            var user, prod, createdProduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Table.create({
                            username: "customer",
                            first_name: "fname",
                            last_name: "lname",
                            password: "password123"
                        })];
                    case 1:
                        user = _a.sent();
                        user_id = user.id;
                        prod = {
                            product_name: "prod_test",
                            price: 100
                        };
                        return [4 /*yield*/, Store.create(prod)];
                    case 2:
                        createdProduct = _a.sent();
                        product_id = createdProduct.id;
                        ord = {
                            products: [{
                                    product_id: product_id,
                                    quantity: 5
                                }],
                            user_id: user_id
                        };
                        return [2 /*return*/];
                }
            });
        });
    })();
    it("index method defined", function () {
        expect(ordersClass.index).toBeDefined();
    });
    it("show method defined", function () {
        expect(ordersClass.show).toBeDefined();
    });
    it("add method defined", function () {
        expect(ordersClass.create).toBeDefined();
    });
    it("delete method defined", function () {
        expect(ordersClass.delete).toBeDefined();
    });
    it("update method defined", function () {
        expect(ordersClass.update).toBeDefined();
    });
    it("orders index method should return a list of orders", function () { return __awaiter(void 0, void 0, void 0, function () {
        var list;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ordersClass.index()];
                case 1:
                    list = _a.sent();
                    expect(list).toEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("orders add method should add a new order", function () { return __awaiter(void 0, void 0, void 0, function () {
        var createdOrder, id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ordersClass.create(ord)];
                case 1:
                    createdOrder = _a.sent();
                    expect(createdOrder).toEqual(__assign({ id: createdOrder.id }, ord));
                    id = createdOrder.id;
                    return [4 /*yield*/, ordersClass.delete(id)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("orders show method should return the correct orders", function () { return __awaiter(void 0, void 0, void 0, function () {
        var createdOrder, id, retrieved;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ordersClass.create(ord)];
                case 1:
                    createdOrder = _a.sent();
                    id = createdOrder.id;
                    return [4 /*yield*/, ordersClass.show(id)];
                case 2:
                    retrieved = _a.sent();
                    expect({ id: retrieved.id, user_id: retrieved.user_id }).toEqual({ id: id, user_id: createdOrder.user_id });
                    return [4 /*yield*/, ordersClass.delete(id)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("orders update method should update the order", function () { return __awaiter(void 0, void 0, void 0, function () {
        var createdOrder, id, newOrder, products;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ordersClass.create(ord)];
                case 1:
                    createdOrder = _a.sent();
                    id = createdOrder.id;
                    newOrder = {
                        id: id,
                        products: [{
                                product_id: product_id,
                                quantity: 10
                            }],
                        user_id: user_id
                    };
                    return [4 /*yield*/, ordersClass.update(newOrder)];
                case 2:
                    products = (_a.sent()).products;
                    expect(products).toEqual(newOrder.products);
                    return [4 /*yield*/, ordersClass.delete(id)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("orders delete method should remove the order", function () { return __awaiter(void 0, void 0, void 0, function () {
        var createdOrder, id, orderList;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ordersClass.create(ord)];
                case 1:
                    createdOrder = _a.sent();
                    id = createdOrder.id;
                    return [4 /*yield*/, ordersClass.delete(id)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, ordersClass.index()];
                case 3:
                    orderList = _a.sent();
                    expect(orderList).toEqual([]);
                    return [4 /*yield*/, Table.deleteAll()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, Store.delete(product_id)];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});

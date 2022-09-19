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
var product_1 = require("../models/product");
var Store = new product_1.store();
describe('product model', function () {
    var prod = {
        product_name: 'test',
        price: 1000
    };
    it('store should have an index method', function () {
        expect(Store.index).toBeDefined();
    });
    it("store should have a show method", function () {
        expect(Store.show).toBeDefined();
    });
    it("store should have a create method", function () {
        expect(Store.create).toBeDefined();
    });
    it("store should have a delete method", function () {
        expect(Store.delete).toBeDefined();
    });
    it("store should have a update method", function () {
        expect(Store.update).toBeDefined();
    });
    it('store index should return a list of products', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Store.index()];
                case 1:
                    res = _a.sent();
                    expect(res).toEqual([]);
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    throw new Error("".concat(err_1));
                case 3: return [2 /*return*/];
            }
        });
    }); });
    it("store add should add a new product", function () { return __awaiter(void 0, void 0, void 0, function () {
        var newProd, id, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, Store.create(prod)];
                case 1:
                    newProd = _a.sent();
                    expect(newProd).toEqual({
                        id: newProd.id,
                        product_name: newProd.product_name,
                        price: newProd.price
                    });
                    id = newProd.id;
                    return [4 /*yield*/, Store.delete(id)];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    throw new Error("".concat(err_2));
                case 4: return [2 /*return*/];
            }
        });
    }); });
    it("store show should return the correct product", function () { return __awaiter(void 0, void 0, void 0, function () {
        var newProd, id, retreived, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, Store.create(prod)];
                case 1:
                    newProd = _a.sent();
                    id = newProd.id;
                    return [4 /*yield*/, Store.show(id)];
                case 2:
                    retreived = _a.sent();
                    expect(retreived).toEqual(newProd);
                    return [4 /*yield*/, Store.delete(id)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_3 = _a.sent();
                    throw new Error("".concat(err_3));
                case 5: return [2 /*return*/];
            }
        });
    }); });
    it("store update method should update the product", function () { return __awaiter(void 0, void 0, void 0, function () {
        var newProd, newData, id, retrieved, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, Store.create(prod)];
                case 1:
                    newProd = _a.sent();
                    newData = {
                        product_name: 'test2',
                        price: 999
                    };
                    id = newProd.id;
                    return [4 /*yield*/, Store.update(__assign({ id: id }, newData))];
                case 2:
                    retrieved = _a.sent();
                    expect({ id: retrieved.id, product_name: retrieved.product_name, price: parseInt(String(retrieved.price)) })
                        .toEqual({ id: newData.id, product_name: newData.product_name, price: newData.price });
                    return [4 /*yield*/, Store.delete(id)];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 4:
                    err_4 = _a.sent();
                    throw new Error("".concat(err_4));
                case 5: return [2 /*return*/];
            }
        });
    }); });
    it("Store remove method should remove the product", function () { return __awaiter(void 0, void 0, void 0, function () {
        var newprod, list, err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, Store.create(prod)];
                case 1:
                    newprod = _a.sent();
                    return [4 /*yield*/, Store.delete(newprod.id)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, Store.index()];
                case 3:
                    list = _a.sent();
                    expect(list).toEqual([]);
                    return [3 /*break*/, 5];
                case 4:
                    err_5 = _a.sent();
                    throw new Error("".concat(err_5));
                case 5: return [2 /*return*/];
            }
        });
    }); });
});

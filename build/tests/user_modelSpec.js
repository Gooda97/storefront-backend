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
var user_1 = require("../models/user");
var bcrypt_1 = __importDefault(require("bcrypt"));
var _a = process.env, PEPPER = _a.PEPPER, SALT_ROUNDS = _a.SALT_ROUNDS;
var Table = new user_1.user_table();
describe("User Model", function () {
    var user = {
        username: "customer",
        first_name: "fname",
        last_name: "lname",
        password: "password123"
    };
    it("Table should have an index method", function () {
        expect(Table.index).toBeDefined();
    });
    it("Table should have a show method", function () {
        expect(Table.show).toBeDefined();
    });
    it("Table should have a create method", function () {
        expect(Table.create).toBeDefined();
    });
    it("Table should have a remove method", function () {
        expect(Table.delete).toBeDefined();
    });
    it("Table should have a update method", function () {
        expect(Table.update).toBeDefined();
    });
    it("Table should have a authenticate method", function () {
        expect(Table.authenticate).toBeDefined();
    });
    // it("Table index method should return a list of users", async () => {
    //   const list = await Table.index()
    //   await Table.deleteAll()
    //   expect(list).toEqual([])
    // })
    it("Table create method should create a user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var newUser, id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Table.create(user)];
                case 1:
                    newUser = _a.sent();
                    expect({ id: newUser.id, username: newUser.username,
                        first_name: newUser.first_name, last_name: newUser.last_name })
                        .toEqual({ id: newUser.id,
                        username: user.username,
                        first_name: user.first_name,
                        last_name: user.last_name,
                    });
                    expect(bcrypt_1.default.compareSync("".concat(user.password).concat(PEPPER), newUser.password)).toBe(true);
                    id = newUser.id;
                    return [4 /*yield*/, Table.delete(id)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Table show method should return the correct users", function () { return __awaiter(void 0, void 0, void 0, function () {
        var newUser, retrieved;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Table.create(user)];
                case 1:
                    newUser = _a.sent();
                    return [4 /*yield*/, Table.show(newUser.id)];
                case 2:
                    retrieved = _a.sent();
                    expect(retrieved).toEqual(newUser);
                    return [4 /*yield*/, Table.delete(newUser.id)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Table remove method should remove the user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var newUser, list;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Table.create(user)];
                case 1:
                    newUser = _a.sent();
                    return [4 /*yield*/, Table.delete(newUser.id)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, Table.index()];
                case 3:
                    list = _a.sent();
                    expect(list).toEqual([]);
                    return [2 /*return*/];
            }
        });
    }); });
    it("Table update method should update the user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var newUser, newData, retreived;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Table.create(user)];
                case 1:
                    newUser = _a.sent();
                    newData = {
                        username: 'customer',
                        first_name: 'test1',
                        last_name: 'test2',
                        password: 'testpass'
                    };
                    return [4 /*yield*/, Table.update(__assign({ id: newUser.id }, newData))];
                case 2:
                    retreived = _a.sent();
                    expect({ first_name: newData.first_name,
                        last_name: newData.last_name
                    })
                        .toEqual({ first_name: retreived.first_name,
                        last_name: retreived.last_name });
                    expect(bcrypt_1.default.compareSync("".concat(newData.password).concat(PEPPER), retreived.password)).toBe(true);
                    return [4 /*yield*/, Table.delete(newUser.id)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("Table authenticate must return null when invalid user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var authenticated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Table.authenticate(user.username, user.password)];
                case 1:
                    authenticated = _a.sent();
                    expect(authenticated).toBe(false);
                    return [2 /*return*/];
            }
        });
    }); });
});

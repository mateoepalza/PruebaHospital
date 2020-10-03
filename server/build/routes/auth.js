"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const jwt_1 = require("../middlewares/jwt");
class Auth {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/login', auth_controller_1.default.login);
        this.router.post('/register', auth_controller_1.default.register);
        this.router.post('/change-password', [jwt_1.checkJwt], auth_controller_1.default.changePassword);
    }
}
const auth = new Auth();
exports.default = auth.router;

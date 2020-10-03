"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
class GlobalEnv {
    constructor() {
        dotenv_1.default.config();
        this.setVariables();
    }
    setVariables() {
        this.port = process.env.PORT;
        this.client = process.env.CLIENT;
        this.jwt = process.env.SECRET;
    }
}
const envVar = new GlobalEnv();
exports.default = envVar;

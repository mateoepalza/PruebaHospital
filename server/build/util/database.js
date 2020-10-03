"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const configdb_1 = __importDefault(require("../config/configdb"));
const pool = mysql2_1.default.createPool(configdb_1.default);
exports.default = pool.promise();

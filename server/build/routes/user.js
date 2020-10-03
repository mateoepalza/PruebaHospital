"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const express_1 = require("express");
const jwt_1 = require("../middlewares/jwt");
const role_1 = require("../middlewares/role");
class User {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //get citas
        this.router.get('/', [jwt_1.checkJwt, role_1.checkRole(['admin'])], user_controller_1.default.getCitas);
        //get cita
        this.router.get('/:id', [jwt_1.checkJwt, role_1.checkRole(['admin'])], user_controller_1.default.getCita);
        //asignar cita
        this.router.post('/', [jwt_1.checkJwt, role_1.checkRole(['admin'])], user_controller_1.default.newCita);
        //update cita
        this.router.put('/:id', [jwt_1.checkJwt, role_1.checkRole(['admin'])], user_controller_1.default.updateCita);
        //delete cita
        this.router.delete('/:id', [jwt_1.checkJwt, role_1.checkRole(['admin'])], user_controller_1.default.deleteCita);
    }
}
const user = new User();
exports.default = user.router;

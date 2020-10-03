"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../util/database"));
const user_1 = require("../models/user");
const config_1 = __importDefault(require("../config/config"));
const jwt = __importStar(require("jsonwebtoken"));
const class_validator_1 = require("class-validator");
class AuthController {
    constructor() {
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { correo, clave } = req.body;
            if (!(correo && clave)) {
                return res.status(400).json({ message: "username and password are required" });
            }
            //TODO :USER
            let user = new user_1.User(correo, "");
            try {
                const [rows, fields] = yield database_1.default.query("SELECT * FROM paciente WHERE correo = ?", [correo]);
                user = Object.assign(user, JSON.parse(JSON.stringify(rows))[0]);
            }
            catch (e) {
                return res.status(400).json({ message: "username or password not found" });
            }
            if (!user.checkClave(clave)) {
                return res.status(400).json({ message: 'username or password are incorrect' });
            }
            const token = jwt.sign({ id: user.idPaciente, correo: user.correo }, config_1.default.jwt, { expiresIn: '1h' });
            res.send({ message: 'ok', token, id: user.idPaciente, role: user.rol });
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { correo, clave } = req.body;
            let user = new user_1.User(correo, clave);
            try {
                const [rows, fields] = yield database_1.default.query('SELECT * FROM paciente WHERE correo = ?', [correo]);
                let user_data = JSON.parse(JSON.stringify(rows));
                if (user_data.length > 0) {
                    return res.status(409).json({ message: "User already exists" });
                }
            }
            catch (error) {
                return res.status(404).json({ message: "not found" });
            }
            user.rol = "paciadminente";
            user.hashClave();
            try {
                yield database_1.default.query('INSERT INTO paciente SET ?', [user]);
            }
            catch (error) {
                return res.status(409).json({ message: "Something bad happened" });
            }
            res.json({ message: "The register was successful" });
        });
    }
    changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = res.locals.jwtPayLoad;
            const { oldpassword, newpassword } = req.body;
            if (!(oldpassword && newpassword)) {
                res.status(400).json({ message: 'old password and new password are required' });
            }
            let user = new user_1.User("", "");
            try {
                const [rows, fields] = yield database_1.default.query('SELECT * FROM paciente WHERE idPaciente = ?', [id]);
                user = Object.assign(user, JSON.parse(JSON.stringify(rows))[0]);
            }
            catch (error) {
                return res.status(400).json({ message: "Something bad happened" });
            }
            if (!user.checkClave(oldpassword)) {
                return res.status(401).json({ message: "Password incorrect, try again!" });
            }
            user.clave = newpassword;
            const errors = yield class_validator_1.validate(user, { validationError: { target: false, value: false } });
            if (errors.length > 0) {
                return res.status(400).json(errors);
            }
            //hash password
            user.hashClave();
            try {
                const [rows, fields] = yield database_1.default.query("UPDATE paciente SET clave = ?", [user.clave]);
            }
            catch (error) {
                return res.status(400).json(error);
            }
            res.json({ message: "Password updated" });
        });
    }
}
const authController = new AuthController();
exports.default = authController;

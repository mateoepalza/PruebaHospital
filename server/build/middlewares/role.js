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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
const user_1 = require("../models/user");
const database_1 = __importDefault(require("../util/database"));
/**
 * In here we gotta keep in mind that we are receiving an array of roles
 * that can enter into the URI
 */
exports.checkRole = (roles) => {
    /**
     * In here we are returning a function
     */
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = res.locals.jwtPayLoad;
        let user = new user_1.User("", "");
        /**
         * Search if the user exists
         */
        try {
            const [rows, fields] = yield database_1.default.query('SELECT * FROM paciente WHERE idPaciente = ?', [id]);
            user = Object.assign(user, JSON.parse(JSON.stringify(rows))[0]);
        }
        catch (error) {
            return res.status(401).json({ message: "Not authorized" });
        }
        /**
         * Take the rol variable from the user
         */
        const { rol } = user;
        /**
         * If the rol is part of the roles list sent it can continue
         */
        if (roles.includes(rol)) {
            next();
        }
        else {
            res.status(401).json({ message: "Not authorized" });
        }
    });
};

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
/**
 * In order to understand this we gotta keep in mind that the first Token is created on
 * login (auth.controller.ts -> login) in there i sign with the id and with the email
 */
exports.checkJwt = (req, res, next) => {
    /**
     * this search for 'auth' in the request headers
     */
    const token = req.headers['auth'];
    let jwtPayLoad;
    /**
     * This verify the token sent
     */
    try {
        jwtPayLoad = jwt.verify(token, config_1.default.jwt);
        res.locals.jwtPayLoad = jwtPayLoad;
    }
    catch (error) {
        return res.status(401).send({ message: "Not authorized" });
    }
    /**
     * In here i take the values that were sent in the sign method
     */
    const { correo, id } = jwtPayLoad;
    /**
     * I create a new token that expires in 1 hour
     */
    const newToken = jwt.sign({ correo, id }, config_1.default.jwt, { expiresIn: '1h' });
    /**
     * Update the token value in the header
     */
    res.setHeader('token', newToken);
    //next method
    next();
};

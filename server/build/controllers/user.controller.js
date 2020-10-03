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
const database_1 = __importDefault(require("../util/database"));
const class_validator_1 = require("class-validator");
class UserController {
    constructor() {
    }
    getCitas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [rows, fields] = yield database_1.default.query("SELECT idCita, paciente.nombre as paciente, especialidad.nombre as especialidad FROM cita INNER JOIN paciente ON FK_idPaciente = idPaciente INNER JOIN especialidad ON FK_idEspecialidad = idEspecialidad");
                let citas = JSON.parse(JSON.stringify(rows));
                if (citas.length > 0) {
                    res.send(citas);
                }
                else {
                    return res.status(404).json({ message: 'Not result' });
                }
            }
            catch (error) {
                return res.status(404).json({ message: "Nor result" });
            }
        });
    }
    getCita(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const [rows, fields] = yield database_1.default.query("SELECT idCita, paciente.nombre as paciente, especialidad.nombre as especialidad FROM cita INNER JOIN paciente ON FK_idPaciente = idPaciente INNER JOIN especialidad ON FK_idEspecialidad = idEspecialidad WHERE idCita = ?", [id]);
                let cita = JSON.parse(JSON.stringify(rows));
                if (cita.length > 0) {
                    res.send(cita);
                }
                else {
                    return res.status(404).json({ message: "Not result" });
                }
            }
            catch (error) {
                return res.status(404).json({ message: "Nor result" });
            }
        });
    }
    newCita(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fecha, paciente, especialidad } = req.body;
            let cita = {
                fecha: fecha,
                FK_idPaciente: paciente,
                FK_idEspecialidad: especialidad,
            };
            console.log(cita);
            const errors = yield class_validator_1.validate(cita);
            if (errors.length > 0) {
                return res.status(400).json(errors);
            }
            //TODO hash
            try {
                yield database_1.default.query("INSERT INTO cita SET ? ", [cita]);
            }
            catch (error) {
                return res.status(409).json({ message: "Something bad happened" });
            }
            res.json({ message: 'Cita created' });
        });
    }
    updateCita(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { fecha, paciente, especialidad } = req.body;
            let cita = {
                fecha: fecha,
                FK_idPaciente: paciente,
                FK_idEspecialidad: especialidad
            };
            try {
                const [rows, fields] = yield database_1.default.query('SELECT * FROM cita WHERE idCita = ?', id);
                let cita_info = JSON.parse(JSON.stringify(rows));
                if (cita_info.length <= 0) {
                    return res.status(404).json({ message: "Cita not found" });
                }
            }
            catch (error) {
                return res.status(404).json({ message: "Cita not found" });
            }
            //TODO delete this
            const errors = yield class_validator_1.validate(cita, { validationError: { target: false, value: false } });
            if (errors.length > 0) {
                res.status(400).json(errors);
            }
            //Try to save cita
            try {
                yield database_1.default.query('UPDATE cita set ? where idCita = ?', [cita, id]);
            }
            catch (error) {
                return res.status(409).json({ message: "Something happened" });
            }
            res.status(201).json({ message: "cita updated" });
        });
    }
    deleteCita(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const [rows, fields] = yield database_1.default.query("SELECT idCita, paciente.nombre, especialidad.nombre FROM cita INNER JOIN paciente ON FK_idPaciente = idPaciente INNER JOIN especialidad ON FK_idEspecialidad = idEspecialidad WHERE idCita = ?", [id]);
                let cita = JSON.parse(JSON.stringify(rows));
                if (cita.length <= 0) {
                    return res.status(404).json({ message: "Cita not found" });
                }
            }
            catch (error) {
                return res.status(404).json({ message: "Cita not found" });
            }
            try {
                yield database_1.default.query('DELETE FROM cita WHERE idCita = ?', [id]);
            }
            catch (error) {
                return res.status(404).json({ message: "Something happened" });
            }
            res.status(201).json({ message: "Cita deleted" });
        });
    }
}
const userController = new UserController();
exports.default = userController;

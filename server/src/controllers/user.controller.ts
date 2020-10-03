import {Request, Response} from 'express';
import db from '../util/database';
import { validate } from 'class-validator';
import { Cita } from '../models/cita';

class UserController{

    constructor(){

    }

    async getCitas(req: Request, res:Response){

        try {
            const [rows, fields] = await db.query("SELECT idCita, paciente.nombre as paciente, especialidad.nombre as especialidad FROM cita INNER JOIN paciente ON FK_idPaciente = idPaciente INNER JOIN especialidad ON FK_idEspecialidad = idEspecialidad");

            let citas = JSON.parse(JSON.stringify(rows));

            if (citas.length > 0){
                res.send(citas);
            }else{
                return res.status(404).json({message: 'Not result'});
            }

        } catch (error) {
            return res.status(404).json({message: "Nor result"});
        }
    }

    async getCita(req: Request, res:Response){

        const {id} = req.params;
        try{
            const [rows, fields] = await db.query("SELECT idCita, paciente.nombre as paciente, especialidad.nombre as especialidad FROM cita INNER JOIN paciente ON FK_idPaciente = idPaciente INNER JOIN especialidad ON FK_idEspecialidad = idEspecialidad WHERE idCita = ?", [id]);
            let cita = JSON.parse(JSON.stringify(rows));

            if(cita.length > 0){
                res.send(cita);
            }else{
                return res.status(404).json({message: "Not result"});
            }
            
        }catch(error){
            return res.status(404).json({message: "Nor result"});
        }
        

    }

    async newCita(req: Request, res:Response){

        const {fecha, paciente, especialidad} = req.body;
        
        let cita:Cita={
            fecha: fecha,
            FK_idPaciente: paciente,
            FK_idEspecialidad: especialidad,
        }

        console.log(cita);

        const errors  = await validate(cita);

        if(errors.length > 0){
            return res.status(400).json(errors);
        }
        //TODO hash

        try{
            await db.query("INSERT INTO cita SET ? ", [cita]);
        }catch(error){
            return res.status(409).json({message: "Something bad happened"});
        }

        res.json({ message: 'Cita created'});
        

    }

    async updateCita(req: Request, res:Response){
        
        const { id } = req.params;
        const { fecha, paciente, especialidad } = req.body;

        let cita:Cita ={
            fecha: fecha,
            FK_idPaciente: paciente,
            FK_idEspecialidad: especialidad
        }

        try{
            const [rows, fields] = await db.query('SELECT * FROM cita WHERE idCita = ?', id);

            let cita_info = JSON.parse(JSON.stringify(rows));

            if(cita_info.length <= 0){
                return res.status(404).json({message: "Cita not found"});
            }

        }catch(error){
            return res.status(404).json({message: "Cita not found"});
        }
        //TODO delete this
        const errors = await validate(cita, {validationError:{target:false, value:false}});

        if(errors.length > 0){
            res.status(400).json(errors);
        }

        //Try to save cita

        try{
            await db.query('UPDATE cita set ? where idCita = ?', [cita, id]);
        }catch(error){
            return res.status(409).json({message: "Something happened"});
        }

        res.status(201).json({message: "cita updated"});

    }

    async deleteCita(req: Request, res:Response){
        const { id } = req.params;

        try{
            const [rows, fields] = await db.query("SELECT idCita, paciente.nombre, especialidad.nombre FROM cita INNER JOIN paciente ON FK_idPaciente = idPaciente INNER JOIN especialidad ON FK_idEspecialidad = idEspecialidad WHERE idCita = ?", [id]);

            let cita = JSON.parse(JSON.stringify(rows));

            if(cita.length <= 0){
                return res.status(404).json({message: "Cita not found"});
            }

        }catch(error){
            return res.status(404).json({message: "Cita not found"});
        }

        try{
            await db.query('DELETE FROM cita WHERE idCita = ?', [id]);
        }catch(error){
            return res.status(404).json({message: "Something happened"});
        }

        res.status(201).json({message: "Cita deleted"});
    }
}

const userController = new UserController();
export default userController;
import {Request, Response} from 'express';
import db  from '../util/database';
import { User } from '../models/user';
import  config  from '../config/config';
import * as jwt from 'jsonwebtoken';
import { validate } from 'class-validator';

class AuthController{

    constructor(){

    }

    async login(req: Request, res:Response){
        const {correo, clave} = req.body;

        if(! (correo && clave)){
            return res.status(400).json({message: "username and password are required"});
        }

        //TODO :USER

        let user:User = new User(correo, "");

        try{
            const [rows, fields] =  await db.query("SELECT * FROM paciente WHERE correo = ?", [correo]);
            user = Object.assign(user , JSON.parse(JSON.stringify(rows))[0]);
        }catch(e){
            return res.status(400).json({message: "username or password not found"});
        }

        if(! user.checkClave(clave)){
            return res.status(400).json({message: 'username or password are incorrect'});
        }

        const token = jwt.sign({id: user.idPaciente, correo: user.correo}, config.jwt, {expiresIn:'1h'});

        

        res.send({message: 'ok', token, id: user.idPaciente, role: user.rol});
        
    }

    async register(req: Request, res:Response){
        const {correo, clave} = req.body;

        let user = new User(correo, clave);

        try{
            const [rows, fields] = await db.query('SELECT * FROM paciente WHERE correo = ?',[correo]);
            let user_data =  JSON.parse(JSON.stringify(rows));

            if(user_data.length > 0){
                return res.status(409).json({message: "User already exists"});
            }

        }catch(error){
            return res.status(404).json({message: "not found"});
        }

        user.rol = "paciadminente";
        user.hashClave();

        try{
            await db.query('INSERT INTO paciente SET ?', [user]);
        }catch(error){
            return res.status(409).json({message: "Something bad happened"})
        }

        res.json({message: "The register was successful"});

    }

    async changePassword(req:Request, res:Response){
        const { id } = res.locals.jwtPayLoad;
        const { oldpassword, newpassword } = req.body;

        if(!(oldpassword && newpassword)){
            res.status(400).json({message: 'old password and new password are required'});
        }

        let user:User = new User("","");

        try{
            const [rows, fields] = await db.query('SELECT * FROM paciente WHERE idPaciente = ?', [id]);
            user = Object.assign(user, JSON.parse(JSON.stringify(rows))[0]);
        }catch(error){
            return res.status(400).json({message: "Something bad happened"});
        }
        
        if(! user.checkClave(oldpassword)){
            return res.status(401).json({message: "Password incorrect, try again!"});
        }

        user.clave = newpassword;

        const errors = await validate(user, {validationError:{target:false, value:false}});

        if(errors.length > 0){
            return res.status(400).json(errors);
        }

        //hash password

        user.hashClave();

        try{
            const [rows, fields] = await db.query("UPDATE paciente SET clave = ?", [user.clave]);
        }catch(error){
            return res.status(400).json(error);
        }

        res.json({message: "Password updated"});

    }


}

const authController = new AuthController();

export default authController;
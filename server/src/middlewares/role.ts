import { Request, Response, NextFunction } from 'express' ;
import { User } from '../models/user';
import db from '../util/database';

/**
 * In here we gotta keep in mind that we are receiving an array of roles
 * that can enter into the URI
 */

export const checkRole = (roles:Array<string>) =>{
    /**
     * In here we are returning a function
     */
    return async (req:Request, res:Response, next:NextFunction) =>{

        const { id } = res.locals.jwtPayLoad;
        let user:User = new User("","");

        /**
         * Search if the user exists
         */
        try{
            const [rows, fields] = await db.query('SELECT * FROM paciente WHERE idPaciente = ?', [id]);
            user  = Object.assign(user , JSON.parse(JSON.stringify(rows))[0]);
        }catch(error){
            return res.status(401).json({message: "Not authorized"});
        }
        /**
         * Take the rol variable from the user
         */
        const { rol } = user;

        /**
         * If the rol is part of the roles list sent it can continue
         */

        if(roles.includes(rol)){
            next();
        }else{
            res.status(401).json({message: "Not authorized"});
        }
    }
}
import { Request, Response, NextFunction } from 'express';
import * as jwt  from 'jsonwebtoken';
import  config  from '../config/config';

/**
 * In order to understand this we gotta keep in mind that the first Token is created on
 * login (auth.controller.ts -> login) in there i sign with the id and with the email 
 */

export  const checkJwt = (req: Request, res:Response, next:NextFunction) => {
    /**
     * this search for 'auth' in the request headers
     */
    const token = <string> req.headers['auth'];
    let jwtPayLoad;
    /**
     * This verify the token sent 
     */
    try{
        jwtPayLoad = <any> jwt.verify(token, config.jwt);
        res.locals.jwtPayLoad = jwtPayLoad;
    }catch(error){
        return res.status(401).send({message: "Not authorized"});
    }
    /**
     * In here i take the values that were sent in the sign method
     */
    const { correo, id } = jwtPayLoad;
    /**
     * I create a new token that expires in 1 hour
     */
    const newToken = jwt.sign({correo, id}, config.jwt, {expiresIn: '1h'});
    /**
     * Update the token value in the header
     */
    res.setHeader('token', newToken);
    //next method
    next()
}
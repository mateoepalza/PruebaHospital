import { Router } from 'express';
import authController from '../controllers/auth.controller';
import { checkJwt } from '../middlewares/jwt';

class Auth{

    public router: Router;

    constructor(){
        this.router = Router();
        this.config();
    }

    config(){
        this.router.post('/login', authController.login);
        this.router.post('/register', authController.register);
        this.router.post('/change-password', [checkJwt], authController.changePassword);
    }
}

const auth = new Auth();
export default auth.router;
import  userControler  from '../controllers/user.controller';
import { Router } from 'express';
import  { checkJwt }  from '../middlewares/jwt';
import { checkRole } from '../middlewares/role';

class User{

    public router: Router;

    constructor(){
        this.router = Router();
        this.config();
    }

    config(){
        //get citas
        this.router.get('/', [checkJwt, checkRole(['admin'])], userControler.getCitas);
        //get cita
        this.router.get('/:id', [checkJwt, checkRole(['admin'])], userControler.getCita);
        //asignar cita
        this.router.post('/', [checkJwt, checkRole(['admin'])], userControler.newCita);
        //update cita
        this.router.put('/:id', [checkJwt, checkRole(['admin'])], userControler.updateCita);
        //delete cita
        this.router.delete('/:id', [checkJwt, checkRole(['admin'])], userControler.deleteCita);
    }

}

const user = new User();
export default user.router;
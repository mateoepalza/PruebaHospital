import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from './config/config';
import auth from './routes/auth';
import user from './routes/user';

class Server{

    public app: Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void{
        this.app.set('port', config.port || 4000);
        this.app.use(morgan("dev"));
        this.app.use(cors());
        this.app.use(express.json());
    }

    routes(): void{
        this.app.use('/auth', auth);
        this.app.use('/citas', user);
    }

    start(){
        this.app.listen(this.app.get('port'), () =>{
            console.log(`Server on port ${this.app.get('port')}`);
        });
    }
}

const server = new Server();
server.start();

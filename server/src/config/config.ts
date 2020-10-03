import dotenv from 'dotenv';

class GlobalEnv{

    public port:any;
    public client:any;
    public jwt:any;

    constructor(){
        dotenv.config();
        this.setVariables();
    }

    setVariables(){
        this.port = process.env.PORT;
        this.client = process.env.CLIENT;
        this.jwt = process.env.SECRET;
    }
}

const envVar = new GlobalEnv();
export default envVar;

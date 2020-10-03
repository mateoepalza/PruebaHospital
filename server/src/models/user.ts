import { MinLength, IsNotEmpty, IsEmail } from 'class-validator';
import * as bcrypt from 'bcryptjs';


export class User{
    idPaciente?:number;
    @MinLength(6)
    @IsNotEmpty()
    nombre?:string;
    @MinLength(6)
    @IsEmail()
    @IsNotEmpty()
    correo:string;
    @MinLength(6)
    @IsNotEmpty()
    clave:string;
    @IsNotEmpty()
    rol:string;

    constructor(correo:string, clave:string){
        this.correo = correo;
        this.clave = clave;
        this.rol="";
    }

    hashClave():void{
        const salt = bcrypt.genSaltSync(10);
        this.clave = bcrypt.hashSync(this.clave, salt);
    }    

    checkClave(clave:string):boolean{
        return bcrypt.compareSync(clave, this.clave);
    }
}
/**
 * I create a new type called 'roles'
 */
export type roles = 'Admin' | 'Paciente';

export interface User{
    correo: string;
    clave: string;
}

export interface UserResponse{
    message: string;
    token: string;
    id: number;
    role: roles;
}

export interface Cita{
    //TODO
}
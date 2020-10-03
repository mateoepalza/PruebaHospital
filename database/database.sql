CREATE DATABASE hospital;
USE hospital;

create table paciente(
    idPaciente INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(80),
    correo VARCHAR(80) NOT NULL UNIQUE,
    clave VARCHAR(80) NOT NULL,
    rol varchar(50) NOT NULL,
    PRIMARY KEY(idPaciente)
);

CREATE TABLE especialidad(
    idEspecialidad INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL,
    PRIMARY KEY(idEspecialidad)
);

CREATE TABLE cita(
    idCita INT NOT NULL AUTO_INCREMENT,
    fecha DATETIME NOT NULL,
    FK_idEspecialidad INT NOT NULL,
    FK_idPaciente INT NOT NULL,
    PRIMARY KEY(idCita),
    FOREIGN KEY (FK_idEspecialidad) REFERENCES especialidad(idEspecialidad),
    FOREIGN KEY (FK_idPaciente) REFERENCES paciente(idPaciente)
);
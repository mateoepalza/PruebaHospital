export interface Cita {
    id?: number;
    fecha: Date;
    paciente?: string;
    FK_idPaciente: number;
    especialidad?: string;
    FK_idEspecialidad?: number;
  }
  
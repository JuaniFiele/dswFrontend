import { ConsultationHours } from "./consultationHours.js";
import { Specialty } from "./specialty";

export interface Medic {
  id?: number;
  dni: string
  firstname: string
  lastname: string
  dniType: string
  username: string
  password: string
  medicalConsultationValue: number
  license: number
  consultationHours?: ConsultationHours[]
  specialty: Specialty
}
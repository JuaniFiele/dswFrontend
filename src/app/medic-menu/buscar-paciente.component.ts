import { Component,  } from '@angular/core'; 
import { Router } from '@angular/router';
import { PatientService } from '../services/patient.service.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Patient } from '../interfaces/patient.js';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MedicMenuComponent } from "./med-menu.component";  // Asegúrate de importar MatSnackBar

@Component({
  selector: 'app-buscar-paciente',
  templateUrl: './buscar-paciente.component.html',
  styleUrls: ['./buscar-paciente.component.css'],
})
export class BuscarPacienteComponent {
  form: FormGroup;
  dniError: boolean = false;

  constructor(
    private router: Router,
    private patientService: PatientService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar  // Inyecta MatSnackBar
  ) {
    this.form = this.fb.group({
      dni: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{7,8}$/), // Valida un DNI de 7-8 dígitos
        ],
      ],
    });
  }

  buscarPaciente(): void {
    this.dniError = false; // Resetea el error al intentar buscar

    if (this.form.valid) {
      const dniValue = this.form.get('dni')?.value;
      this.patientService.getPatientByDni(dniValue).subscribe(
        (patient: Patient) => {
          if (patient) {
            // Paciente encontrado, redirigir a la página del paciente
            this.router.navigate(['/hc-paciente', dniValue]);

            // Mostrar el mensaje "Paciente encontrado" y desaparecer después de 3 segundos
            this.snackBar.open('Paciente encontrado', '', {
              duration: 3000, // Duración del mensaje en milisegundos
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          } else {
            // Paciente no encontrado, muestra el mensaje correspondiente
            this.dniError = true;

            // Mostrar el mensaje "Paciente no encontrado" y desaparecer después de 3 segundos
            this.snackBar.open('Paciente no encontrado', '', {
              duration: 3000, // Duración del mensaje en milisegundos
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
            });
          }
        },
        (error: any) => {
          console.error('Error al verificar el paciente:', error);

          // Si hay un error en la petición, muestra el mensaje de error
          this.snackBar.open('Error al verificar el paciente', '', {
            duration: 3000, // Duración del mensaje en milisegundos
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        }
      );
    }
  }
}

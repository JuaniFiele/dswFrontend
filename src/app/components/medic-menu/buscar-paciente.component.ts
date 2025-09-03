import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PatientService } from '../../services/patient.service.js';

@Component({
  selector: 'app-buscar-paciente',
  templateUrl: './buscar-paciente.component.html',
  styleUrls: ['./buscar-paciente.component.css']
})
export class BuscarPacienteComponent {
  dni: string = '';
  error: boolean = false;
  errorDeDNI: boolean = false;

  constructor(private router: Router, private _PatientService: PatientService)
  {
  }

  buscarPaciente(): void {
    if (this.dni) {
      this.error = false;
      this.errorDeDNI = false;
      this._PatientService.getPatientByDni(this.dni).subscribe({
        next: (response) => {
          if (response) {
            this.router.navigate(['/hc-paciente', response.dni]);
          } else {
            this.errorDeDNI = true;
          }
        },
        error: (err) => {
          this.errorDeDNI = true;
        }
      });
    } else {
      this.error = true;
      this.errorDeDNI = false;
    }
  }

}

import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { Medic } from '../../interfaces/medic.js';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddEditMedicComponent } from '../add-edit-medic/add-edit-medic.component.js';
import { MedicService } from '../../services/medic.service.js';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';


@Component({


  selector: 'app-list-medics',
  templateUrl: './list-medics.component.html',
  styleUrl: './list-medics.component.css',
})
export class ListMedicsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['dnitype', 'dni', 'firstname', 'lastname', 'username', 'password', 'medicalConsultationValue', 'license','specialty', 'acciones'];//falta specialty
  dataSource: MatTableDataSource<Medic>;
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private _medicService: MedicService
    , private _snackBar: MatSnackBar) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.obtenerMedicos();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  obtenerMedicos() {
    this.loading = true;
    this._medicService.getMedics().subscribe(data => {
      this.loading = false;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.data = data;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addEditMedic() {
    const dialogRef = this.dialog.open(AddEditMedicComponent, {
      width: '550px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.obtenerMedicos();
      }
    });
  }

  deleteMedico(id: number) {
    this.loading = true;
    this._medicService.deleteMedico(id).subscribe(data => {
      this.loading = false;
      this.obtenerMedicos();
      this.mensajeExito();
    });
  }

  mensajeExito() {
    this._snackBar.open('El medico fue eliminado con exito', '', {
      duration: 2000
    }
    );
  }

}
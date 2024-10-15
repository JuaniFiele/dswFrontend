import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Specialty } from '../../interfaces/specialty.js';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AgregarEditarHealthInsuranceComponent } from '../agregar-editar-healthInsurance/agregar-editar-healthInsurance.component.js';
import { HealthInsuranceService } from '../../services/healthInsurance.service.js';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HealthInsurance } from '../../interfaces/healthInsurance.js';



@Component({
  selector: 'app-list-healthInsurance',
  templateUrl: './list-healthInsurance.component.html',
  styleUrl: './list-healthInsurance.component.css'
})

export class ListHealthInsuranceComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'acciones'];
  dataSource: MatTableDataSource<HealthInsurance>;
  loading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private _healthInsuranceService: HealthInsuranceService, private _snackBar :MatSnackBar) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
   }

  ngOnInit(): void {
    this.obternerObrasSociales();
  }

  ngAfterViewInit(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator._intl.itemsPerPageLabel = 'Items por página';
      this.dataSource.sort = this.sort;
  }

  obternerObrasSociales() {
    this.loading = true;
    this._healthInsuranceService.getHealthInsurances().subscribe( data =>  {
      this.loading = false;
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addEditHealthInsurance(id?: number) {
    const dialogRef = this.dialog.open(AgregarEditarHealthInsuranceComponent, {
      width: '550px',
      disableClose: true,
      data: {id: id}
    });

      dialogRef.afterClosed().subscribe(result => {

        if(result) {
          this.obternerObrasSociales();
        }
      });
  }

  deleteHealthInsurance(id: number) {

  this._healthInsuranceService.deleteHealthInsurance(id).subscribe(() => {
    this.obternerObrasSociales();
    this.successMessage();
  });
  }


  successMessage(){
    this._snackBar.open('La Obra Social fue eliminada con exito',"" ,{
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

}
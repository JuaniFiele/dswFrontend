import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Attention } from '../../interfaces/attention';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AttentionService } from '../../services/attentions.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-attention',
  templateUrl: './list-attention.component.html',
  styleUrl: './list-attention.component.css',
  providers: [DatePipe] 
})
export class ListAttentionsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['date', 'consultationHours', 'patient','medic', 'dateCancelled','paymentDate', "acciones"];
  dataSource: MatTableDataSource<Attention>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private _attentionService: AttentionService, private _snackBar: MatSnackBar, private datePipe: DatePipe 
  ) {

    this.dataSource = new MatTableDataSource();
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {
    this.obtenerAttentions();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.setupFilterAndSorting(); // <-- ESTA LÍNEA ES NUEVA
  }

  obtenerAttentions() {
    this._attentionService.getAttentions().subscribe(data => {
      console.log('Data recibida del backend:', data );  
      this.dataSource.data = data;
      //console.log('DataSource data:', this.dataSource.data);  Debería mostrar los mismos datos que el log anterior
      this.dataSource.paginator = this.paginator;

      this.dataSource.sort = this.sort;
    }, error => {
      console.error('Error al obtener attentions:', error);

      /*this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.paginator._intl.itemsPerPageLabel = "Items por pagina"
      this.dataSource.sort = this.sort;*/
    });

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addEditAttention(id?: number) {
    console.log('id:', id);
     /*
    console.log('id:', id);
    const dialogRef = this.dialog.open(AgregarEditarAttentionComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.obtenerAttentions();
      }
    });
  */
  }
 

  payAttention(id: number) {
    // Primero obtenemos la atención por su ID
    this._attentionService.getAttention(id).subscribe(attention => {
      // Establecer la fecha de cancelación
      attention.paymentDate = new Date().toISOString();
      console.log('paymentDate:', attention.paymentDate);
      // Ahora actualizamos la atención con la fecha de cancelación
      this._attentionService.updateAttention(id, attention).subscribe(
        () => {
          

          this.obtenerAttentions(); // Recargamos las atenciones para reflejar los cambios
          this.successMessage("El pago fue registrado con exito");; // Mostramos el mensaje de éxito
        
        },
        (updateError) => {
          console.error('Error al actualizar la atención:', updateError);
        }
      );
    }, (error) => {
      console.error('Error al obtener la atención:', error);
    });
  }

  cancelAttention(id: number) {
    // Primero obtenemos la atención por su ID
    this._attentionService.getAttention(id).subscribe(attention => {
      // Obtener la fecha del turno y la fecha actual
      const attentionDate = new Date(attention.date);
      const currentDate = new Date();
      const diffTime = attentionDate.getTime() - currentDate.getTime(); // Diferencia en milisegundos
      const diffHours = diffTime / (1000 * 3600); // Convertimos la diferencia a horas
      // //Ahora eliminamos la atención
      // this._attentionService.deleteAttention(id).subscribe(
      //   () => {
      //     this.obtenerAttentions(); // Recargamos las atenciones para reflejar los cambios
      //   },
      //   (deleteError) => {
      //     console.error('Error al eliminar la atención:', deleteError);
      //   }
      // );
      // //Verificamos si la diferencia es menor a 24 horas
      if (diffHours < 24) {
        // Mostrar un mensaje de advertencia si la fecha está a menos de 24 horas
        this.errorMessage('No se puede cancelar el turno. El mismo está dentro de las 24 horas.');
        return; // Detener el proceso de cancelación
      }
  
      // Si pasa la validación, continuamos con el proceso de cancelación
      attention.dateCancelled = new Date().toISOString();
      console.log('dateCancelled:', attention.dateCancelled);
  
      // Ahora actualizamos la atención con la fecha de cancelación
      this._attentionService.updateAttention(id, attention).subscribe(
        () => {
          this.obtenerAttentions(); // Recargamos las atenciones para reflejar los cambios
          this.successMessage("La atencion fue cancelada con exito"); // Mostramos el mensaje de éxito
        },
        (updateError) => {
          console.error('Error al actualizar la atención:', updateError);
        }
      );
    }, (error) => {
      console.error('Error al obtener la atención:', error);
    });
  }
  
  
  
  successMessage(msj:string) {
    this._snackBar.open(msj, "", {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
  errorMessage(error:string) {
    this._snackBar.open(error, "", {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
      });}
  
  setupFilterAndSorting(): void {
  // Lógica para el filtro personalizado
  this.dataSource.filterPredicate = (data: Attention, filter: string) => {
    const dataStr =
      // Formatear la fecha
      (this.datePipe.transform(data.date, 'dd/MM/yyyy') || '').toLowerCase() +
      // Buscar en la hora
      (data.consultationHours?.startTime || '').toLowerCase() +
      // ¡BUSCAR DENTRO DEL OBJETO PATIENT!
      (data.patient?.dni || '').toLowerCase() +
      // ¡BUSCAR DENTRO DEL OBJETO MEDIC!
      (data.consultationHours?.medic?.firstname || '').toLowerCase() +
      (data.consultationHours?.medic?.lastname || '').toLowerCase() +
      (data.consultationHours?.medic?.specialty?.name || '').toLowerCase();
    
    return dataStr.includes(filter.trim().toLowerCase());
  };

  // Lógica para el ordenamiento de datos anidados (BONUS)
  this.dataSource.sortingDataAccessor = (item, property) => {
    switch (property) {
      case 'patient': return item.patient.dni;
      case 'consultationHours': return item.consultationHours.startTime;
      case 'medic': return `${item.consultationHours.medic.firstname} ${item.consultationHours.medic.lastname}`;
      default: return (item as any)[property];
    }
  };
}
}

import { Component } from '@angular/core';
import { PublicacionService } from '../../../services/publicacion.service';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { CommonModule, DatePipe } from '@angular/common';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-reportepublicacionesenrangodefechas',
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule,CommonModule,ReactiveFormsModule,BaseChartDirective],
  templateUrl: './reportepublicacionesenrangodefechas.component.html',
  styleUrls: ['./reportepublicacionesenrangodefechas.component.css'],
  providers: [DatePipe,provideNativeDateAdapter()],
})
export class ReportepublicacionesenrangodefechasComponent {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(
    private pS: PublicacionService,
    private datePipe: DatePipe
  ) {}

  onFechaSeleccionada(fecha: Date | null) {
    if (!fecha) return;

    // Formatear fecha como yyyy-MM-dd para el backend
    const fechaFormateada = this.datePipe.transform(fecha, 'yyyy-MM-dd');
    if (!fechaFormateada) return;

    this.pS.getPublicacionesFechasIngresadas(fechaFormateada).subscribe((data) => {
      this.barChartLabels = data.map((item) => item.fechaPublicacion.toString());
      this.barChartData = [
        {
          data: data.map((item) => item.cantidadPublicacion),
          label: 'Cantidad de publicaciones',
          backgroundColor: ['#F4B66E', '#E4881D', '#000000', '#FFF9F2', '#FFFFFF'],
          borderColor: '#E4881D',
          borderWidth: 2,
        },
      ];
    });
  }
}

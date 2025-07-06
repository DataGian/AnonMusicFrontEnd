import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { NotificacionService } from '../../../services/notificacion.service';

@Component({
  selector: 'app-reportenotificacionesnovistasportipo',
  imports: [BaseChartDirective],
  templateUrl: './reportenotificacionesnovistasportipo.component.html',
  styleUrl: './reportenotificacionesnovistasportipo.component.css',
})
export class ReportenotificacionesnovistasportipoComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private nS: NotificacionService) {}
  ngOnInit(): void {
    this.nS.getNotificacionesNoVistasPorTipo().subscribe((data) => {
      this.barChartLabels = data.map((item) =>
        item.tipoNotificacion.toString()
      );
      this.barChartData = [
        {
          data: data.map((item) => item.cantidadNotificacionesNoVistas),
          label: 'Notificaciones no vistas por tipo',
          backgroundColor: [
            '#F4B66E', // durazno
            '#E4881D', // naranja fuerte
            '#000000', // negro
            '#FFF9F2', // marfil claro
            '#FFFFFF', // blanco
          ],
          borderColor: '#E4881D',
          borderWidth: 2,
        },
      ];
    });
  }
}

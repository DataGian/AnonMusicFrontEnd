import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { PublicacionService } from '../../../services/publicacion.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-reporte5publicacionesconmascomentarios',
  imports: [BaseChartDirective],
  templateUrl: './reporte5publicacionesconmascomentarios.component.html',
  styleUrl: './reporte5publicacionesconmascomentarios.component.css'
})
export class Reporte5publicacionesconmascomentariosComponent implements OnInit {
barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private pS: PublicacionService) {}
  ngOnInit(): void {
    this.pS.get5PubliconmasComentarios().subscribe((data) => {
      this.barChartLabels =data.map((item) => item.idPublicacion.toString());
      this.barChartData = [
        {
          data: data.map((item) => item.cantidadComentarios),
          label: '5 publicaciones con mas comentarios',
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

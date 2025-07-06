import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-reporteusuariosconmasmusicaanonima',
  imports: [BaseChartDirective],
  templateUrl: './reporteusuariosconmasmusicaanonima.component.html',
  styleUrl: './reporteusuariosconmasmusicaanonima.component.css',
})
export class ReporteusuariosconmasmusicaanonimaComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private uS: UsuarioService) {}
  ngOnInit(): void {
    this.uS.getUsuariosConMusicaAnonima().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.username);
      this.barChartData = [
        {
          data: data.map((item) => item.total_musica_anonima),
          label: '5 usuarios con mas musica anonima',
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

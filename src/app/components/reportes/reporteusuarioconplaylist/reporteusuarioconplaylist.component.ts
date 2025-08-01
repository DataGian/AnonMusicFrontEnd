import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-reporteusuarioconplaylist',
  imports: [BaseChartDirective],
  templateUrl: './reporteusuarioconplaylist.component.html',
  styleUrl: './reporteusuarioconplaylist.component.css'
})
export class ReporteusuarioconplaylistComponent implements OnInit {
barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private uS: UsuarioService) {}
  ngOnInit(): void {
    this.uS.getUsuariosConPlaylist().subscribe((data) => {
      this.barChartLabels = data.map((item) =>
        item.username.toString()
      );
      this.barChartData = [
        {
          data: data.map((item) => item.cantidad_playlist),
          label: 'Usuarios con menos playlist creadas',
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

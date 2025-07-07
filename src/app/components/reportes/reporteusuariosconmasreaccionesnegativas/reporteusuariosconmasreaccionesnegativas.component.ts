import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { UsuarioService } from '../../../services/usuario.service';
@Component({
  selector: 'app-reporteusuariosconmasreaccionesnegativas',
  imports: [BaseChartDirective],
  templateUrl: './reporteusuariosconmasreaccionesnegativas.component.html',
  styleUrl: './reporteusuariosconmasreaccionesnegativas.component.css'
})
export class ReporteusuariosconmasreaccionesnegativasComponent implements OnInit{
barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private uS: UsuarioService) {}
  ngOnInit(): void {
    this.uS.getUsuariosConMasReaccionesNegativas().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.idUsuario.toString());
      this.barChartData = [
        {
          data: data.map((item) => item.cantidadReacciones),
          label: 'usuarios con mas reacciones negativas',
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

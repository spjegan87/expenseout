import { Component,Input, ViewChild } from '@angular/core';
import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
/**
 * Author: Padma Priya CK.
 * Module : chart
 * Powered by : Infiniti software solutions
 */
@Component({
  selector: 'app-donutchart',
  templateUrl: './donutchart.component.html',
  styleUrls: ['./donutchart.component.scss']
})
export class DonutchartComponent {
  @ViewChild("chart",{ static: false }) chart: ChartComponent;
  /**
   * input for chart data
   */
  @Input() public chartOptions :any;
  arr: any =[];
}

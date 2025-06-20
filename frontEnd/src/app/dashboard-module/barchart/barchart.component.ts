import { Component,ViewChild,Input } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  colors: any;
  xaxis: ApexXAxis;
};
/**
 * Author: Padma Priya CK.
 * Module : chart
 * Powered by : Infiniti software solutions
 */
@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent {
  @ViewChild("chart",{ static: false }) chart: ChartComponent;
/**
 * input data for bar chart
 */
@Input() public chartOptions:any;

  constructor() {
    // this.chartOptions = {
    //   series: [
    //     {
    //       name: "basic",
    //       data: [400, 430, 448, 470, 540, 580, 690]
    //     }
    //   ],
    //   chart: {
    //     type: "bar",
    //     height:  350
    //   },
    //   plotOptions: {
    //     bar: {
    //       horizontal: true
    //     }
    //   },
     
    //   dataLabels: {
    //     enabled: true
    //   },
    //   xaxis: {
    //     categories: [
    //       "South Korea",
    //       "Canada",
    //       "United Kingdom",
    //       "Netherlands",
    //       "Italy",
    //       "France",
    //       "Japan"
    //     ]
    //   },
    //   tooltip: {
    //     y: {
    //       formatter: (value) => { 
    //         // console.log({ seriesIndex, dataPointIndex, w});
    //         // tslint:disable-next-line: semicolon
    //         return  value + ' Reports'
    //       }
    //     }       
    //   },
    //   colors: [function() {
    //           var letters = '0123456789ABCDEF'.split('');
    //     var color = '#';
    //     for (var i = 0; i < 6; i++ ) {
    //         color += letters[Math.floor(Math.random() * 16)];
    //     }
    //     return color;
    //       }]
    //   };

}}

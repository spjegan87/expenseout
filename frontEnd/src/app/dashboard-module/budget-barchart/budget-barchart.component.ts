import { Component, Input, ViewChild } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexLegend,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

/**
 * Author: Logesh.
 * Module : chart
 */

 @Component({
  selector: 'app-budget-barchart',
  templateUrl: './budget-barchart.component.html',
  styleUrls: ['./budget-barchart.component.scss']
})
export class BudgetBarchartComponent {

  @ViewChild("chart") chart: ChartComponent;
  @Input() public chartOptions:any;


  constructor() {
    setTimeout(()=>{
      console.log(this.chartOptions);
    },1000)
    // this.chartOptions = {
    //   series: [
    //     {
    //       name: "Net Profit",
    //       data: [44, 55, 57, 56, 61, 58, 63, 60, 66,100]
    //     },
    //     {
    //       name: "Revenue",
    //       data: [76, 85, 101, 98, 87, 105, 91, 114, 94,140]
    //     }
    //   ],
    //   chart: {
    //     type: "bar",
    //     height: 350
    //   },
    //   plotOptions: {
    //     bar: {
    //       horizontal: false,
    //       columnWidth: "70%",
          
    //     }
    //   },
    //   dataLabels: {
    //     enabled: false
    //   },
    //   stroke: {
    //     show: true,
    //     width: 4,
    //     colors: ["transparent"]
    //   },
    //   xaxis: {
    //     categories: [
    //       "Feb",
    //       "Mar",
    //       "Apr",
    //       "May",
    //       "Jun",
    //       "Jul",
    //       "Aug",
    //       "Sep",
    //       "Oct",
    //       "loki"
    //     ]
    //   },
    //   yaxis: {
    //     title: {
    //       text: "$ (thousands)"
    //     }
    //   },
    //   fill: {
    //     opacity: 100
    //   },
    //   tooltip: {
    //     y: {
    //       formatter: function(val) {
    //         return "$ " + val + " thousands";
    //       }
    //     }
    //   }
    // };
  }
}


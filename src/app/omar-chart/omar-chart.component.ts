import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartLegendLabelItem, ChartOptions, ChartType } from 'chart.js';
import { Color, BaseChartDirective, Label, monkeyPatchChartJsLegend } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { Transaction } from '../merchant-transactions/merchant-transactions.component';
import { TooltipComponent } from '@angular/material';

@Component({
  selector: 'omar-chart',
  templateUrl: './omar-chart.component.html',
  styleUrls: ['./omar-chart.component.css']
})

export class OmarChartComponent implements OnInit {
  public static instance: OmarChartComponent;

  private chartVisible: boolean = false;
  public groupingType: number;
  public periodType: number;
  public chartDataType: number;
  public datasource: Array<Transaction>;
  public dateFrom: Date;
  public dateTo: Date;

  public isChartVisible(): boolean {
    return this.chartVisible;
  }

  public showChart(){
    this.chartVisible = true;
  }

  public hideChart(){
    this.chartVisible = false;
  }

  public update(){

    let MILLISECONDS_IN_DAY = 1000 * 60 * 60 * 24;
    
    let numberOfPeriods = 1;
    
    if(this.periodType == 1){
      numberOfPeriods = Math.ceil(( this.dateTo.getTime() - this.dateFrom.getTime() ) / MILLISECONDS_IN_DAY) + 1;
    } else if(this.periodType == 2){
      numberOfPeriods = Math.ceil((( this.dateTo.getTime() - this.dateFrom.getTime() ) / MILLISECONDS_IN_DAY + 1) / 7);
    } else if(this.periodType == 3){
      let date = new Date(this.dateFrom.getTime());
      while(date.getMonth() != this.dateTo.getMonth() || date.getFullYear() != this.dateTo.getFullYear()){
        numberOfPeriods++;
        try {
          date.setMonth(date.getMonth() + 1);
        } catch {
          date.setMonth(0);
          date.setFullYear(date.getFullYear() + 1);
        }
      }
    } else if(this.periodType == 4){
      let date = new Date(this.dateFrom.getTime());
      while(date.getFullYear() != this.dateTo.getFullYear()){
        numberOfPeriods++;
        date.setFullYear(date.getFullYear() + 1);
      }
    }

    let periods = Array<Period>();
    let month: number = this.dateFrom.getMonth();
    let year: number = this.dateFrom.getFullYear();
    Period.cityNames.splice(0, Period.cityNames.length);
    for(let i = 0; i < numberOfPeriods; i++){
      let dateStart = new Date();
      let dateEnd = new Date();
      if(this.periodType == 1){
        dateStart.setTime(this.dateFrom.getTime() + (MILLISECONDS_IN_DAY * i));
        dateStart.setHours(0,0,0,0);
        dateEnd.setTime(dateStart.getTime());
        dateEnd.setHours(23,59,59,999);
      } else if(this.periodType == 2){
        dateStart.setTime(this.dateFrom.getTime() + (MILLISECONDS_IN_DAY * 7 * i));
        dateStart.setHours(0,0,0,0);
        dateEnd.setTime(this.dateFrom.getTime() + (MILLISECONDS_IN_DAY * 7 * (i + 1)));
        dateEnd.setHours(23,59,59,999);
        dateEnd.setTime(dateEnd.getTime()-MILLISECONDS_IN_DAY);
      } else if(this.periodType == 3){
        dateStart = new Date(year, month, 1, 0, 0, 0, 0);
        dateEnd = new Date(year, month, this.getDaysOfMonth(month++, year), 23, 59, 59, 999);
        if(month > 12){
          year++;
          month = 1;
        }
      } else if(this.periodType == 4){
        dateStart = new Date(year, 0, 1, 0, 0, 0, 0);
        dateEnd = new Date(year++, 11, 31, 23, 59, 59, 999);
      } 
      let period = new Period(dateStart, dateEnd);
      for(let t of this.datasource){
        let transactionDate = new Date(Date.parse(t.transaction_date.toString()));
        if(transactionDate.getTime() >= period.getStartDate().getTime() && transactionDate.getTime() <= period.getEndDate().getTime()){
          period.addTransaction(t);
        } else if(transactionDate.getTime() > period.getEndDate().getTime()) {
          break;
        }
        if(!Period.cityNames.includes(t.merchant_city)){
          Period.cityNames.push(t.merchant_city);
        }
      }
      periods.push(period);
    }

    Period.cityNames.sort();

    let amounts1 = Array<number>();
    let amounts2 = new Map<String, number[]>();
    this.chartLabels.length = 0;

    for(let p of periods){
      if(this.groupingType == 1){
        amounts1.push(this.chartDataType == 1 ? p.getTotal() : p.getNOTransactions());
      } else if(this.groupingType == 2){
        let mdpc = this.chartDataType == 1 ? p.getMapTotalPerCity() : p.getMapNOTransactionsPerCity();
        for(let city of Period.cityNames){
          if(amounts2.has(city)){
            amounts2.get(city).push(mdpc.get(city))
          } else {
            amounts2.set(city, [mdpc.get(city)]);
          }
        }
      }
      this.chartLabels.push(p.getLabel(this.periodType));
    }

    this.chartData.length = 0;
    if(this.groupingType == 1){
      this.chartData.push({ data: amounts1, label: 'Total transactions amount' });
    } else if(this.groupingType == 2){
      for(let city of Period.cityNames){
        this.chartData.push({ data: amounts2.get(city), label: city.toString() });
      }
    }
  }
  public chartData: ChartDataSets[] = [];
  public chartLabels: Label[] = [];
  public chartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [{
        ticks: {
          beginAtZero: false
        }
      }]
    },
    annotation: {
      
    }
  };
  public chartColors: Color[] = [];
  public chartLegend = true;
  public chartType: ChartType = 'line';
  public chartPlugins = [pluginAnnotations];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor() {}

  ngOnInit(): void {
    OmarChartComponent.instance = this;
    this.update();
  }

  getDaysOfMonth(month: number, year: number){
    let m31 = [0, 2, 4, 6, 7, 9, 11]
    let m2829 = 1;
    for(let i of m31){
      if(month == i){
        return 31;
      }
    }
    if(month == m2829){
      return year % 4 == 0 ? 29 : 28;
    }
    return 30;
  }

  average(array: Array<number>){
    if(array.length == 0){
      return 0;
    }
    var total = 0;
    for(let n of array){
      total += n;
    }
    return total / array.length;
  }

  onChartClick(){
    this.chartType = this.chartType == 'line' ? 'bar' : 'line';
  }
}

class Period {
    public static cityNames: String[] = new Array<String>();

    private dateStart: Date;
    private dateEnd: Date;
    private transactions: Array<Transaction>;

    constructor(dateStart: Date, dateEnd: Date){
      this.dateEnd = dateEnd;
      this.dateStart = dateStart;
      this.transactions = Array<Transaction>();
    }

    public addTransaction(t: Transaction): number {
      return this.transactions.push(t);
    }

    public getTotal(): number {
      var total = 0;
      for(let t of this.transactions){
        total += Number(t.amount);
      }
      return total;
    }

    public getTotalPerCity(): number[] {
      let totalPerCity = new Array<number>();
      for(let city of Period.cityNames){
        totalPerCity.push(this.getTotalForCity(city));
      }
      return totalPerCity;
    }

    public getMapTotalPerCity(): Map<String, number> {
      let totalPerCity = new Map<String, number>();
      for(let city of Period.cityNames){
        totalPerCity.set(city, this.getTotalForCity(city));
      }
      return totalPerCity;
    }

    private getTotalForCity(city: String): number {
      var total = 0;
      for(let t of this.transactions){
        if(t.merchant_city == city){
          total += Number(t.amount);
        }
      }
      return total;
    }

    public getNOTransactions(): number {
      return this.transactions.length;
    }

    public getNOTransactionsPerCity(): number[] {
      let nOTransactionsPerCity = new Array<number>();
      for(let city of Period.cityNames){
        nOTransactionsPerCity.push(this.getNOTransactionsForCity(city));
      }
      return nOTransactionsPerCity;
    }

    public getMapNOTransactionsPerCity(): Map<String, number> {
      let nOTransactionsPerCity = new Map<String, number>();
      for(let city of Period.cityNames){
        nOTransactionsPerCity.set(city, this.getNOTransactionsForCity(city));
      }
      return nOTransactionsPerCity;
    }

    private getNOTransactionsForCity(city: String): number {
      var nOTransactions = 0;
      for(let t of this.transactions){
        if(t.merchant_city == city){
          nOTransactions++;
        }
      }
      return nOTransactions;
    }

    public getStartDate(): Date {
      return this.dateStart;
    }

    public getEndDate(): Date {
      return this.dateEnd;
    }

    public getLabel(periodType: number): Label {
      if(periodType == 1){
          return this.dateStart.getDate()+"/"+(this.dateStart.getMonth()+1)+"/"+this.dateStart.getFullYear();
      } else if(periodType == 2){
        return [this.dateStart.getDate()+"/"+(this.dateStart.getMonth()+1)+"/"+this.dateStart.getFullYear(), this.dateEnd.getDate()+"/"+(this.dateEnd.getMonth()+1)+"/"+this.dateEnd.getFullYear()];
      } else if(periodType == 3){
        return (this.dateStart.getMonth()+1)+"/"+this.dateStart.getFullYear();
      } else if(periodType == 4){
        return this.dateStart.getFullYear().toString();
      }
    }
}
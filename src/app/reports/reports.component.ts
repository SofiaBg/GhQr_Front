import { Transaction } from './../merchant-transactions/merchant-transactions.component';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { BaseComponent } from './../BaseComponent/BaseComponent';
import { Component, OnInit } from '@angular/core';
import { Merchant } from '../new-merchant/new-merchant.component';
import { Router } from '@angular/router';
import { GipService } from '../services/gip.service';
import jsPDF from 'jspdf';
// import 'jspdf-autotable'

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent extends BaseComponent implements OnInit {

  public merchant: any
  public id: string
  public name: string
  public type: string
  public dateFrom: string
  public dateTo: string
  stringJson: any;
  stringObject: any;
  show: boolean = false;

  fttMsg: boolean = false;
  ftMsg: boolean = false;
  fMsg: boolean = false;
  tMsg: boolean = false;
  typeMsg: boolean = false;
  ttMsg: boolean = false;
  ftypeMsg: boolean = false;

  public formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GHS',
    minimumFractionDigits: 2
  })

  public loading = false;

  private reportTypes: Map<string, Function> = new Map<string, Function>();

  constructor(private service: GipService, router: Router) {
    super(router);
    if (this.router.getCurrentNavigation() == null || this.router.getCurrentNavigation().extras == null || this.router.getCurrentNavigation().extras.state == null) {
      return;
    }
    this.merchant = this.router.getCurrentNavigation().extras.state;
    this.id = this.merchant.id;
    this.name = this.merchant.firstName + " " + this.merchant.lastName;
  }

  merchantPage() {
    this.router.navigateByUrl("/merchant")
  }

  ngOnInit() {
    // this.reportTypes.set('0', this.transactionReport);
    // this.reportTypes.set('1', this.transactionValueReport);
    this.reportTypes.set('0', this.allMerchantsPdf);
    console.log(this.reportTypes)
    this.reportTypes.set('1', this.allActivatedMerchantsPdf);
    this.reportTypes.set('2', this.allSuspendedMerchantsPdf);
  }


  /* SAFIA 08.10.2021 */
  allMerchantsPdf() {
    console.log('Generate Pdf for All Merchants')
    console.log('All merchants', this.dateFrom);
    console.log('All merchants', this.dateTo);

    this.service.allMerchantsPdf(this.dateFrom, this.dateTo).subscribe(data => {
      console.log('All merchants', data);
      // Convert String obect to JSON
      this.stringJson = JSON.stringify(data);
      // console.log("String json object :", this.stringJson);
      // console.log("Type :", typeof this.stringJson);
      // window.open("/assets/ReportsPdf/AllMerchants20211116091251.pdf");

      // ConvertjSON to an object
      this.stringObject = JSON.parse(this.stringJson);
      console.log("JSON object -", this.stringObject);
      console.log(+this.stringObject.pdfLink)
      this.show = true;
      setTimeout(() => {
        window.open("data:application/pdf;base64," + this.stringObject.pdfLink);
      }, 3000);
      this.dateFrom = '';
      this.type = '';
      this.dateTo = '';
    });
  }

  /*SAFIA 17.11.2021 */
  allSuspendedMerchantsPdf() {
    console.log('Generate Pdf for All Merchants')
    console.log('All Suspended merchants', this.dateFrom);
    console.log('All Suspended merchants', this.dateTo);

    this.service.allSuspendedMerchantsPdf(this.dateFrom, this.dateTo).subscribe(data => {
      console.log('All merchants', data);
      // Convert String obect to JSON
      this.stringJson = JSON.stringify(data);
      // console.log("String json object :", this.stringJson);
      // console.log("Type :", typeof this.stringJson);
      // window.open("/assets/ReportsPdf/AllMerchants20211116091251.pdf");

      // ConvertjSON to an object
      this.stringObject = JSON.parse(this.stringJson);
      console.log("JSON object -", this.stringObject);
      console.log(+this.stringObject.pdfLink)
      this.show = true;
      setTimeout(() => {
        window.open("data:application/pdf;base64," + this.stringObject.pdfLink);
      }, 3000);
      this.dateFrom = '';
      this.type = '';
      this.dateTo = '';
    });
  }

  allActivatedMerchantsPdf() {
    console.log('Generate Pdf for All Merchants')
    console.log('Al Activatedl merchants', this.dateFrom);
    console.log('All Activated merchants', this.dateTo);

    this.service.allActivatedMerchantsPdf(this.dateFrom, this.dateTo).subscribe(data => {
      console.log('All Activated merchants', data);
      // Convert String obect to JSON
      this.stringJson = JSON.stringify(data);
      // console.log("String json object :", this.stringJson);
      // console.log("Type :", typeof this.stringJson);
      // window.open("/assets/ReportsPdf/AllMerchants20211116091251.pdf");

      // ConvertjSON to an object
      this.stringObject = JSON.parse(this.stringJson);
      console.log("JSON object -", this.stringObject);
      console.log(+this.stringObject.pdfLink)
      this.show = true;
      setTimeout(() => {
        window.open("data:application/pdf;base64," + this.stringObject.pdfLink);
      }, 3000);
      this.dateFrom = '';
      this.type = '';
      this.dateTo = '';
    });
  }

  clear() {
    this.merchant = null;
    this.id = null;
    this.name = null;
  }

  toDateStr(date: string) {
    let dateObj = new Date(Date.parse(date));
    let month = new Number(dateObj.getMonth() + 1).toString();
    let str = dateObj.getDate() + "-" + (month.length > 1 ? month : "0" + month) + "-" + dateObj.getFullYear();
    return str
  }


  report() {
    if (this.dateFrom == null && this.dateTo == null && (this.type == null || this.type=='') ) {
      console.log('Required')
      this.fttMsg = true;
      this.ftMsg = false;
      this.fMsg = false;
      this.tMsg = false;
      this.typeMsg = false;
      this.ttMsg = false;
      this.ftypeMsg = false;
    }
    else if (this.dateFrom == null && this.dateTo == null) {
      this.fttMsg = false;
      this.ftMsg = true;
      this.fMsg = false;
      this.tMsg = false;
      this.typeMsg = false;
      this.ttMsg = false;
      this.ftypeMsg = false;    }
    else if (this.dateFrom == null) {
      this.fttMsg = true;
      this.ftMsg = false;
      this.fMsg = true;
      this.tMsg = false;
      this.typeMsg = false;
      this.ttMsg = false;
      this.ftypeMsg = false;    }
    else if (this.dateTo == null) {
      this.fttMsg = false;
      this.ftMsg = false;
      this.fMsg = false;
      this.tMsg = true;
      this.typeMsg = false;
      this.ttMsg = false;
      this.ftypeMsg = false;    }
    else if (this.type == null || this.type=='') {
      this.fttMsg = false;
      this.ftMsg = false;
      this.fMsg = false;
      this.tMsg = false;
      this.typeMsg = true;
      this.ttMsg = false;
      this.ftypeMsg = false;
    }
    else if (this.dateTo == null && (this.type == null || this.type=='')) {
      this.fttMsg = false;
      this.ftMsg = false;
      this.fMsg = false;
      this.tMsg = false;
      this.typeMsg = false;
      this.ttMsg = true;
      this.ftypeMsg = false;
    }
    else if (this.dateFrom == null && (this.type == null || this.type=='')) {
      this.fttMsg = false;
      this.ftMsg = false;
      this.fMsg = false;
      this.tMsg = false;
      this.typeMsg = false;
      this.ttMsg = false;
      this.ftypeMsg = true;   
    
    } 
    // else{

      console.log(this.type)
    console.log(this.reportTypes.keys())
    // if(this.reportTypes.has(this.type)){
    //   this.reportTypes.get(this.type)(this);
    // }
    console.log(this.dateFrom)
    console.log(this.dateTo)

    if (this.type == '0') {
      console.log(this.dateFrom)
      console.log(this.dateTo)
      this.allMerchantsPdf();
    }
    if (this.type == '1') {
      console.log(this.dateFrom)
      console.log(this.dateTo)
      this.allActivatedMerchantsPdf();
    }
    if (this.type == '2') {
      console.log(this.dateFrom)
      console.log(this.dateTo)
      this.allSuspendedMerchantsPdf();
    }
    // }

    
  }

  toDateTime(date: string) {
    let dateObj = new Date(Date.parse(date));
    let month = new Number(dateObj.getMonth() + 1).toString();
    return dateObj.getDate() + "-" + (month.length > 1 ? month : "0" + month) + "-" + dateObj.getFullYear() + " " + dateObj.toLocaleTimeString('gh-GH');
  }

  transactionReport(self: ReportsComponent) {
    var transactions: Array<Transaction> = null;
    self.loading = true;
    self.service.transactionSearchList(self.name == undefined ? "" : self.name, self.id == undefined ? "" : self.id, self.dateFrom == undefined || self.dateFrom == null || self.dateFrom == "" ? null : self.toDateStr(self.dateFrom) + " 00:00:00", self.dateTo == undefined || self.dateTo == null || self.dateTo == "" ? null : self.toDateStr(self.dateTo) + " 23:59:59").subscribe(resp => {
      self.loading = false;
      transactions = resp as Array<Transaction>;
      self.generateTransactionsReport(transactions);
    }, err => {
      self.loading = false;
      console.log(err.message.message);
    })
  }

  transactionValueReport(self: ReportsComponent) {
    var transactions: Array<TransactionValue> = null;
    self.loading = true;
    self.service.transactionValueSearch(self.name == undefined ? "" : self.name, self.id == undefined ? "" : self.id, self.dateFrom == undefined || self.dateFrom == null || self.dateFrom == "" ? null : self.toDateStr(self.dateFrom) + " 00:00:00", self.dateTo == undefined || self.dateTo == null || self.dateTo == "" ? null : self.toDateStr(self.dateTo) + " 23:59:59").subscribe(resp => {
      self.loading = false;
      transactions = resp as Array<TransactionValue>;
      self.generateTransactionValueReport(transactions);
    }, err => {
      self.loading = false;
      console.log(err.message.message);
    })
  }

  generateTransactionsReport(transactions: Array<Transaction>) {
    const doc = new jsPDF({ orientation: 'l', unit: 'mm', format: 'a4', compress: true });

    var data = [];

    transactions.forEach((t) => {
      var tempObj = [];
      tempObj.push(t.receipt_code);
      tempObj.push(t.merchant_id);
      tempObj.push(t.merchant_name);
      tempObj.push(this.toDateTime(t.transaction_date.toString()));
      tempObj.push(this.formatter.format(Number.parseFloat(t.amount.toString())));
      tempObj.push(t.terminalId);
      tempObj.push(t.merchant_city);
      //tempObj.push(t.sourceType);
      //tempObj.push(t.paymentMode);
      tempObj.push(t.success);

      data.push(tempObj);
    });

    var totalPagesExp = '{total_pages_count_string}';
    (doc as any).autoTable({
      head: [
        [
          'Receipt Code',
          'Merchant ID',
          'Merchant Name',
          'Transaction Date',
          'Amount',
          'Terminal ID',
          'Merchant City',
          //'Source Type',
          //'Payment Mode',
          'Success',
        ],
      ],
      body: data,
      margin: { top: 40 },
      didDrawPage: function (data) {

        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        var pageWidth = pageSize.width
          ? pageSize.width
          : pageSize.getWidth();

        doc.setFontSize(20);
        doc.setTextColor(40);
        doc.setFontStyle('normal');

        doc.setFontSize(20);
        doc.text('Transactions', pageWidth / 2, 20, { 'align': 'center' });

        var str = 'Page ' + doc.internal.getNumberOfPages();
        if (typeof doc.putTotalPages === 'function') {
          str = str + ' of ' + totalPagesExp;
        }
        doc.setFontSize(10);

        doc.text(str, data.settings.margin.left, pageHeight - 10);
      },
    });

    if (typeof doc.putTotalPages === 'function') {
      doc.putTotalPages(totalPagesExp);
    }

    doc.save('Report.pdf');
  }

  generateTransactionValueReport(tValues: Array<TransactionValue>) {
    const doc = new jsPDF({ orientation: 'l', unit: 'mm', format: 'a4', compress: true });

    var data = [];

    tValues.forEach((t) => {
      var tempObj = [];
      tempObj.push(t[0]);
      tempObj.push(t[1]);
      tempObj.push(t[2]);
      tempObj.push(t[3]);
      tempObj.push(this.formatter.format(t[4]));
      tempObj.push(t[5]);
      tempObj.push(this.formatter.format(t[6]));

      data.push(tempObj);
    });

    var totalPagesExp = '{total_pages_count_string}';
    (doc as any).autoTable({
      head: [
        [
          'Merchant Name',
          'Merchant ID',
          'Terminal ID',
          'Successful Transactions Count',
          'Successful Transactions Value',
          'Failed Transactions Count',
          'Failed Transactions Value'
        ],
      ],
      body: data,
      margin: { top: 40 },
      didDrawPage: function (data) {

        var pageSize = doc.internal.pageSize;
        var pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        var pageWidth = pageSize.width
          ? pageSize.width
          : pageSize.getWidth();

        doc.setFontSize(20);
        doc.setTextColor(40);
        doc.setFontStyle('normal');

        doc.setFontSize(20);
        doc.text('Transactions', pageWidth / 2, 20, { 'align': 'center' });

        var str = 'Page ' + doc.internal.getNumberOfPages();
        if (typeof doc.putTotalPages === 'function') {
          str = str + ' of ' + totalPagesExp;
        }
        doc.setFontSize(10);

        doc.text(str, data.settings.margin.left, pageHeight - 10);
      },
    });

    if (typeof doc.putTotalPages === 'function') {
      doc.putTotalPages(totalPagesExp);
    }

    doc.save('Report.pdf');
  }

}

class TransactionValue {
  merchantId: string;
  merchantName: string;
  terminalId: string;
  sCount: number;
  sValue: number;
  fCount: number;
  fValue: number;
}

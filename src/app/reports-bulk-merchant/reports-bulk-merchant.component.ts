import { Transaction } from './../merchant-transactions/merchant-transactions.component';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { BaseComponent } from './../BaseComponent/BaseComponent';
import { Component, OnInit } from '@angular/core';
import { Merchant } from '../new-merchant/new-merchant.component';
import { Router } from '@angular/router';
import { GipService } from '../services/gip.service';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-reports-bulk-merchant',
  templateUrl: './reports-bulk-merchant.component.html',
  styleUrls: ['./reports-bulk-merchant.component.css']
})
export class ReportsBulkMerchantComponent extends BaseComponent implements OnInit {

 
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
    this.reportTypes.set('0', this.allBulkMerchants);
    console.log(this.reportTypes)
    this.reportTypes.set('1', this.allValidatedBulkMerchantsPdf);
    this.reportTypes.set('2', this.allPendingBulkMerchantsPdf);
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
      this.allBulkMerchants();
    }
    if (this.type == '1') {
      console.log(this.dateFrom)
      console.log(this.dateTo)
      this.allValidatedBulkMerchantsPdf();
    }
    if (this.type == '2') {
      console.log(this.dateFrom)
      console.log(this.dateTo)
      this.allPendingBulkMerchantsPdf();
    }
    if (this.type == '3') {
      console.log(this.dateFrom)
      console.log(this.dateTo)
      this.allRejectedBulkMerchants();
    }
    // }

    
  }


  /* SAFIA 08.10.2021 */
  allBulkMerchants() {
    console.log('Generate Pdf for All Merchants')
    console.log('All bulk merchants', this.dateFrom);
    console.log('All bulk merchants', this.dateTo);

    this.service.allBulkMerchantsPdf(this.dateFrom, this.dateTo).subscribe(data => {
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
  allPendingBulkMerchantsPdf() {
    console.log('Generate Pdf for All Merchants')
    console.log('All pending merchants', this.dateFrom);
    console.log('All pending merchants', this.dateTo);

    this.service.allPendingBulkMerchantsPdf(this.dateFrom, this.dateTo).subscribe(data => {
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

  allValidatedBulkMerchantsPdf() {
    console.log('Generate Pdf for All Merchants')
    console.log('Al validated merchants', this.dateFrom);
    console.log('All validated merchants', this.dateTo);

    this.service.allValidatedBulkMerchantsPdf(this.dateFrom, this.dateTo).subscribe(data => {
      console.log('All validated merchants', data);
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

  
  allRejectedBulkMerchants() {
    console.log('Generate Pdf for All Merchants')
    console.log('All rejected merchants', this.dateFrom);
    console.log('All rejected merchants', this.dateTo);

    this.service.allValidatedBulkMerchantsPdf(this.dateFrom, this.dateTo).subscribe(data => {
      console.log('All rejected merchants', data);
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




}



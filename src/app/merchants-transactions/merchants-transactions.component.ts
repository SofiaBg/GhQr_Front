import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { BaseComponent } from '../BaseComponent/BaseComponent';
import { Transaction } from '../merchant-transactions/merchant-transactions.component';
import { Merchant } from '../new-merchant/new-merchant.component';
import { GipService } from '../services/gip.service';

@Component({
  selector: 'app-merchants-transactions',
  templateUrl: './merchants-transactions.component.html',
  styleUrls: ['./merchants-transactions.component.css']
})
export class MerchantsTransactionsComponent extends BaseComponent implements OnInit {
 /*SAFIA 23.09.2021 */
 showDashboard: boolean = false;
 // datepickerForm: FormGroup;
 loading: boolean = false;
 periodType: number = 1;
 terminals: Array<any>;
 groupingType: number = 1;
 chartDataType: number = 1;
 selectedDate: any;
 pagenumber: number;
 pagesize: number = 5;
 //myDatePickerOptions: any;
 showdetail: boolean = true;
 dateTo: any;
 dateFrom: any;
 err: any;
 shownull: boolean = false;
 showtrx: boolean = false;
 showqrtrx: boolean = false;
 showqrtrxx: boolean = false;
 showqrloc: boolean = false;
 token: boolean = false;
 pass: boolean = false;
 Errtoken: boolean = false;
 Errpass: boolean = false;
 Errpass1: boolean = false;
 Errpass2: boolean = false;
 Errpass3: boolean = false;
 Errpass4: boolean = false;
 paramToke: any;
 //+++
 motCle: string = "";
 mot: string = "";
 from: string = "";
 to: string = "";
 paramPass: any;
 paramPass1: any;
 paramPass2: any;
 transactionParAccountMerch;
 qrtransactionParAccountMerch: any;//++
 currentpageMerch: number = 0;
 firstTrans;
 accountMerch;
 merchant: Merchant;
 myDatepicker: any;
 idAccount: String;
 page: number = 0;
 size: number = 5;
 pages: Array<any>;
 currentpage: number = -1;
 valid: boolean = false;
 valid1: boolean = false;
 valid2: boolean = false;
 showdetail1: boolean;
 qrtoken: boolean;
 qrtoken1: boolean;
 transactions: any;
 alltransactions: Array<Transaction>;
 showntransactions: Array<Transaction>;
 totalPages: number;
 trx: any;
 currentPointer = 1;
 hide: boolean = true;
 hidecsearch: boolean = true;
 hidemain: boolean = false;
 hideAccouts: boolean = true;
 dispInLine: number = -1;
 hidePersonOrTrans: boolean = false;
 a: number = 0;
 showalert: boolean = false;
 msg: string = "";
 pdfTable: any;
 SessionTimeOut: any;
 pagesMerch: Array<any>;
 mer: any;
 timesession: any;

 /* SAFIA 25.11.2021*/
 stringJson: any;
 stringObject: any;
 show: boolean = false;
 showT: boolean = false;
 myDate = new Date();
 showErrorDateFrom : boolean = false
  showErrorDateTo:boolean = false;
  result: any = null;
  showResult :  any[] =  this.result;
  showErrorDate: boolean=false; 
  currentDate=new Date
  pipe = new DatePipe('en-US');
  
  constructor
  (private formBuilder: FormBuilder, 
    public _formBuilder: FormBuilder, 
    private bnIdle: BnNgIdleService,
     private service: GipService, router: Router) {
    /* this.datepickerForm = this._formBuilder.group({
       'startDate': [null, Validators.required]
     });*/
    super(router);
  }

  ngOnInit() {
  }

  homePage(){
    if (localStorage.getItem('role') == 'ADMIN') {

      this.router.navigate(['/adminList']);
      return false;
    } else if (localStorage.getItem('role') == 'USER') {
      this.router.navigate(['/transactions']);
      return false;
    } else if (localStorage.getItem('role') == 'SUB USER') {
      this.router.navigate(['/transactions'])
      return false
    } else if (localStorage.getItem('role') == 'MANAGER') {
      this.router.navigate(['/merchantList'])
      return false;
    } else if (localStorage.getItem('role') == 'BRANCH MANAGER') {
      this.router.navigate(['/getAllBulkMerchantsFoValidation']);
      return false;
    } else if (localStorage.getItem('role') == 'BRANCH OFFICIER') {
      this.router.navigate(['/createSingleBulkMerchant'])
      return false;
    } else if(localStorage.getItem('role') == 'OFFICIER'){
      this.router.navigate(['/merchant'])
    }
  }
  
  onsizechange() {
    this.totalPages = Math.ceil(this.result.length / this.pagesize);
    if (this.currentpage + 1 > this.pagesize) {
      this.currentpage = 0;
    }
    this.showResult = this.result.slice(this.currentpage * this.pagesize, (this.currentpage + 1) * this.pagesize);
  }

  gotoPage(i: number) {
    this.currentpage = i;
    //--this.onGetQrTransMerchant(this.idAccount);
    //+++
    this.a = 1;
    // this.showntransactions = this.alltransactions.slice(this.currentpage * this.pagesize, (this.currentpage + 1) * this.pagesize);
    this.showResult = this.result.slice(this.currentpage * this.pagesize, (this.currentpage + 1) * this.pagesize);
    // this.getTransaction(this.idAccount);
  }
  gotoPageFromInput() {
    // if (this.pagenumber > 0 && this.pagenumber < this.alltransactions.length + 1) {
    //   this.gotoPage(this.pagenumber);
    // }
    if (this.pagenumber > 0 && this.pagenumber < this.showResult.length + 1) {
      this.gotoPage(this.pagenumber);
    }
  }
  onKey(event) {
    this.pagenumber = Number(event.target.value) - 1;
  }

  refresh() {
   
    // this.dateFrom =  this.pipe.transform(Date.now(), 'yyyy-MM-dd');;
    this.dateTo =  this.pipe.transform(Date.now(), 'yyyy-MM-dd');;
 
     let account = localStorage.getItem('idAccount');
 
     console.log(account)
     console.log('Search for QRTransaction')
    
     if(this.dateFrom == null && this.dateTo == null){
       console.log('Choose a date from and a Date to ');
       console.log('All transactions PDF ', this.dateFrom);
       console.log('All transactions PDF ', this.dateTo);
         this.showErrorDate=true
     }else if(this.dateFrom == null ){
       console.log('All transactions PDF ', this.dateFrom);
       console.log('All transactions PDF ', this.dateTo);
         this.showErrorDateFrom=true
     }else if( this.dateTo == null ){
       console.log('All transactions PDF ', this.dateFrom);
       console.log('All transactions PDF ', this.dateTo);
         this.showErrorDateTo=true
     }else {
       console.log('All transactions PDF ', this.dateFrom);
       console.log('All transactions PDF ', this.dateTo);
       console.log(" ACCOUNT ID IS :" + this.idAccount)
 
 
     this.service.allQrTransactionSearch(account, this.dateFrom, this.dateTo).
       subscribe(data => {
 
 
         this.result = data;
         this.totalPages = Math.ceil(this.result.length / this.pagesize);
         if (this.currentpage + 1 > this.totalPages || this.totalPages > 0) {
           this.currentpage = 0;
         }
         this.showResult = this.result.slice(this.currentpage * this.pagesize, (this.currentpage + 1) * this.pagesize);
         
 
         console.log('All transaction PDF', data);
 
         if (data ==null){
           this.showT = true;
 
         }
         // this.dateFrom = '';
         // this.dateTo = '';
       });
     } 
   
   }

     /* SAFIA 08.10.2021 */
     errMessage : string;

  allQrTransactionPdf() {
     
    if(this.dateFrom == null && this.dateTo == null){
      console.log('Choose a date from and a Date to ');
      console.log('All transactions PDF ', this.dateFrom);
      console.log('All transactions PDF ', this.dateTo);
        this.showErrorDate=true
    }else if(this.dateFrom == null ){
      console.log('All transactions PDF ', this.dateFrom);
      console.log('All transactions PDF ', this.dateTo);
        this.showErrorDateFrom=true
    }else if( this.dateTo == null ){
      console.log('All transactions PDF ', this.dateFrom);
      console.log('All transactions PDF ', this.dateTo);
        this.showErrorDateTo=true
    }else {
    console.log('QR Transaction PDF')
    console.log('All transactions PDF ', this.dateFrom);
    console.log('All transactions PDF ', this.dateTo);

    console.log(" ACCOUNT ID IS :" + this.idAccount)
    this.service.allQrTransactionPdf(localStorage.getItem('idAccount'), this.dateFrom, this.dateTo).subscribe(data => {
      console.log('All transaction PDF', data);
      // Convert String obect to JSON
      this.stringJson = JSON.stringify(data);
      // console.log("String json object :", this.stringJson);
      // console.log("Type :", typeof this.stringJson);
      // window.open("/assets/ReportsPdf/AllMerchants20211116091251.pdf");

      // ConvertjSON to an object
      this.stringObject = JSON.parse(this.stringJson);
      console.log("JSON object -", this.stringObject);
      console.log(+this.stringObject.pdfLink)
      if (this.stringObject.pdfLink != null) {
        this.show = true;
        setTimeout(() => {
          // window.open("data:application/pdf;base64," + this.stringObject.pdfLink);
          const linkSource = `data:application/pdf;base64,` + this.stringObject.pdfLink;
          const downloadLink = document.createElement("a");
          const fileName = "MerchantTransactions.pdf";
      
          downloadLink.href = linkSource;
          downloadLink.download = fileName;
          downloadLink.click();

        }, 3000);
        
      } else {
        this.showT = true;
        this.errMessage = data["respDesc"];
      }

      this.dateFrom = '';
      this.dateTo = '';
    });
  }
  }

  allQrTransactionSearch() {
    // Just for test
    // this.dateFrom = '2020-01-20';
    // this.dateTo = '2021-11-20';
  
    let account = localStorage.getItem('idAccount');

    console.log(account)
    console.log('Search for QRTransaction')
   
    if(this.dateFrom == null && this.dateTo == null){
      console.log('Choose a date from and a Date to ');
      console.log('All transactions PDF ', this.dateFrom);
      console.log('All transactions PDF ', this.dateTo);
        this.showErrorDate=true
    }else if(this.dateFrom == null ){
      console.log('All transactions PDF ', this.dateFrom);
      console.log('All transactions PDF ', this.dateTo);
        this.showErrorDateFrom=true
    }else if( this.dateTo == null ){
      console.log('All transactions PDF ', this.dateFrom);
      console.log('All transactions PDF ', this.dateTo);
        this.showErrorDateTo=true
    }else {
      console.log('All transactions PDF ', this.dateFrom);
      console.log('All transactions PDF ', this.dateTo);
      console.log(" ACCOUNT ID IS :" + this.idAccount)


    this.service.allQrTransactionSearch(account, this.dateFrom, this.dateTo).
      subscribe(data => {


        this.result = data;
        this.totalPages = Math.ceil(this.result.length / this.pagesize);
        if (this.currentpage + 1 > this.totalPages || this.totalPages > 0) {
          this.currentpage = 0;
        }
        this.showResult = this.result.slice(this.currentpage * this.pagesize, (this.currentpage + 1) * this.pagesize);
        

        console.log('All transaction PDF', data);

        if (data ==null){
          this.showT = true;

        }
        // this.dateFrom = '';
        // this.dateTo = '';
      });
    } 
  }
}

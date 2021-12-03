import { OmarChartComponent } from './../omar-chart/omar-chart.component';
import { BaseComponent } from './../BaseComponent/BaseComponent';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { GipService } from "../services/gip.service";
import { Observable, interval, Subscription, Subject } from 'rxjs';
import * as jsPDF from 'jspdf';
import * as jspdf from 'jspdf';
import { Router } from "@angular/router";
//import { table } from 'console';
import html2canvas from 'html2canvas';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { BnNgIdleService } from 'bn-ng-idle';
import { ChartsModule } from 'ng2-charts';
import * as i18nIsoCountries from 'i18n-iso-countries';
import { Merchant } from '../new-merchant/new-merchant.component';
@Component({
  selector: 'app-merchant-transactions',
  templateUrl: './merchant-transactions.component.html',
  styleUrls: ['./merchant-transactions.component.css']
})
export class MerchantTransactionsComponent extends BaseComponent implements OnInit {

  //+++
  myOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'dd.mm.yyyy',
  };
  private myForm: FormGroup;
  // Initialized to specific date (09.10.2018)
  model: any = { date: { year: 2018, month: 10, day: 9 } };

  private updateSubscription: Subscription;
  private static instance: MerchantTransactionsComponent

  public static getInstance() {
    return MerchantTransactionsComponent.instance;
  }
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
  pagesize: number = 10;
  //myDatePickerOptions: any;
  showdetail: boolean = true;
  dateTo: string;
  dateFrom: string;
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
  //++++++++++++++++++
  regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
  validcondition: Boolean = true;
  msgarraycondition: Boolean = false;
  errorarraycondtion: any;
  resetFormSubject: Subject<boolean> = new Subject<boolean>();

  

  constructor(private formBuilder: FormBuilder, public _formBuilder: FormBuilder, private bnIdle: BnNgIdleService, private service: GipService, router: Router) {
    /* this.datepickerForm = this._formBuilder.group({
       'startDate': [null, Validators.required]
     });*/
    super(router);
  }

  setDate(): void {
    // Set today date using the patchValue function
    let date = new Date();
    this.myForm.patchValue({
      myDate: {
        date: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        }
      }
    });
  }



  /* SAFIA 08.10.2021 */
  allQrTransactionPdf() {
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
      if (data != null) {
        this.show = true;
        setTimeout(() => {
          window.open("data:application/pdf;base64," + this.stringObject.pdfLink);
        }, 3000);
      } else {
        this.showT = true;
      }

      this.dateFrom = '';
      this.dateTo = '';
    });
  }

  result: any = null;
  showResult :  any[] =  this.result;
  showErrorDate: boolean=false;
  // result: any;
  /* SAFIA 08.10.2021 */
  allQrTransactionSearch() {
    // Just for test
    this.dateFrom = '2020-01-20';
    this.dateTo = '2021-11-20';
  
    let account = localStorage.getItem('idAccount');

    console.log(account)
    console.log('Search for QRTransaction')
   

    if(this.dateFrom == null || this.dateTo == null || (this.dateFrom == null && this.dateTo == null)){
      console.log('Choose a date from and a Date to ');
      console.log('All transactions PDF ', this.dateFrom);
      console.log('All transactions PDF ', this.dateTo);
        this.showErrorDate=true
    }else{
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

        if (data === null)
          this.showT = true;
        // this.dateFrom = '';
        // this.dateTo = '';
      });
    } 
  }

  // title = 'angulardatatables';
  // dtOptions: DataTables.Settings = {};

  ngOnInit() {
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 7,
    //   processing: true
    // };

    //+++
    i18nIsoCountries.registerLocale(require("i18n-iso-countries/langs/en.json"));
    MerchantTransactionsComponent.instance = this;
    this.myForm = this.formBuilder.group({
      // Empty string or null means no initial value. Can be also specific date for
      // example: {date: {year: 2018, month: 10, day: 9}} which sets this date to initial
      // value.

      myDate: [null, Validators.required]
      // other controls are here...
    });
    //-- this.showdetail=true
    //this.shownull=true;
    this.idAccount = this.service.loadIdAccount();
    this.getAccountMerchant(this.idAccount)
    //  this.getTransactionsParAccountsMerch(this.idAccount)
    //--this.onGetTransMerchant(this.idAccount)
    //+++++++++++++ younes
    //this.getQrTransactionsParAccountsMerch(this.idAccount)
    //---this.onGetQrTransMerchant(this.idAccount)
    //this.getTransaction(this.idAccount)
    this.getQrTransactionsAll();
    this.getMParamToekn()
    //+++++
    this.TimeSession()
    // this.getMParamToekn1()
    /*  this.myDatePickerOptions = {
        dateFormat: 'dd-mm-yyyy'
      }*/
    /* this.bnIdle.startWatching(1800).subscribe((isTimedOut: boolean) => {
 //++++
 
       if (isTimedOut) {
         console.log('session expired');
         this.service.logOutMerchant();
         this.router.navigateByUrl("/login")
       }
     });*/


    // this.qrstatic()
    /*  this.updateSubscription = interval(300000).subscribe(
        (val) => {  this.getAccountMerchant(this.idAccount)
          //  this.getTransactionsParAccountsMerch(this.idAccount)
          this.onGetTransMerchant(this.idAccount)
          //+++++++++++++ younes
          this.getQrTransactionsParAccountsMerch(this.idAccount)
        //---  this.onGetQrTransMerchant(this.idAccount)
          this.getTransaction(this.idAccount)
        })*/
  }
  /* showSelectedDate() {
     let date: any = this.datepickerForm.controls['startDate'].value;
     this.selectedDate = date.formatted;
     console.log(this.selectedDate);
   }*/

  //+++++
  TimeSession() {
    this.service.getTimesession().subscribe(data => {
      this.timesession = data;

      this.bnIdle.startWatching(this.timesession).subscribe((isTimedOut: boolean) => {
        //++++

        if (isTimedOut) {
          console.log('session expired');
          this.service.logOutMerchant();
          this.router.navigateByUrl("/login")
        }
      });

    }, err => {
      this.service.logout();
      this.router.navigateByUrl("/login");
    })
  }



  onDateChanged(event) {
    console.log(event);
  }

  getTransactionsParAccountsMerch(idAccount) {
    console.log("id account=" + idAccount)
    this.service.getTransactionsMerchByAccount(idAccount).subscribe(data => {
      this.transactionParAccountMerch = data;
      this.firstTrans = data[0];
      console.log("transactions" + this.transactionParAccountMerch);
    }, err => {
      console.log(err);
      console.log("prblm de recuperation des transaction de l'account")
    })
    //faire appell au service / accounts/idAccount/transactions
    //  transactionParAccount=data
  }

  getAccountMerchant(idAccount) {
    this.service.getAccountMerchant(idAccount).subscribe(data => {
      console.log("-----------------------------------------------------------------");
      this.accountMerch = data;
      localStorage.setItem('merchant', JSON.stringify(data['merchant']));
      console.log(data)
      this.merchant = JSON.parse(localStorage.getItem('merchant'));
      this.terminals = Array<any>();
      for (let site of this.merchant['sites']) {
        for (let terminal of site['acceptorPoints']) {
          terminal['site'] = site['name'] + " (" + site['id'] + ")";
          terminal['creationDate'] = new Date(Date.parse(terminal['creationDate']));
          this.terminals.push(terminal);
        }
      }

    }, err => {
      console.log("prblm de recuperation des compte de merchant")
    })
    //accountsPersonne=data
  }


  MerchantParamToken(paramToke) {

    console.log("Token " + paramToke + " this.idAccount " + this.idAccount + " ")
    console.log("MerchantParamToken " + this.idAccount)
    this.service.MparamToken(paramToke, this.idAccount).subscribe(data => {
      console.log("-----------------------------------------------------------------");
      console.log(data)
      this.paramToke = data;

      this.valid = true;
    }, err => {
      this.Errtoken = true;
      console.log("erreur token ")
    })

  }

  getMParamToekn() {
    this.service.getMPToken(this.idAccount).subscribe(data => {
      console.log("-----------------------------------------------------------------");
      console.log(data)
      this.paramToke = data;

    }, err => {
      this.Errtoken = true;
      console.log("erreur token ")
    })
  }

  initCap(string: String): String {
    let words: string[] = string.split(" ");
    var finalString = "";
    for (let word of words) {
      finalString += " " + word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
    }
    return finalString.substring(1);
  }

  countryName(countryCode: String): String {
    return i18nIsoCountries.getName(countryCode.toString(), "en", { select: "alias" });
  }

  onGetTransMerchant(idAccount) {
    //   this.transactionParAccount=null;
    this.service.getTransactionsofMerchant(idAccount, this.currentpage, this.size).subscribe(resp => {
      this.transactionParAccountMerch = resp;
      this.pages = new Array(this.transactionParAccountMerch.totalPages);

    }, err => {
      console.log(" erreur de recuperation des transactions")
      //    this.router.navigateByUrl("/login");
    })
  }

  logOutMerchant() {
    this.service.logOutMerchant();
    this.router.navigateByUrl("/login");

  }
  // onsizechange() {
  //   // this.totalPages = Math.ceil(this.alltransactions.length / this.pagesize);
  //   this.totalPages = Math.ceil(this.result.length / this.pagesize);
  //   if (this.currentpage + 1 > this.pagesize) {
  //     this.currentpage = 0;
  //   }
  //   // this.showntransactions = this.alltransactions.slice(this.currentpage * this.pagesize, (this.currentpage + 1) * this.pagesize);
  //   this.result = this.result.slice(this.currentpage * this.pagesize, (this.currentpage + 1) * this.pagesize);
  // }

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
    this.showResult=null
    this.dateFrom='';
    this.dateTo='';
  }

  getQrTransactions() {
    let merchantId = localStorage.getItem('idAccount');
    let dateFrom = this.dateFrom == undefined ? "" : this.dateFrom
    let dateTo = this.dateTo == undefined ? "" : this.dateTo
    this.loading = true;
    this.service.QrTransSearch(merchantId, dateFrom, dateTo, this.mot).subscribe(resp => {
      this.transactions = resp;
      this.alltransactions = this.transactions;
      for (let t of this.alltransactions) {
        t.addditional_date = t.addditional_date.substring(0, 10);
        t.transaction_date = t.transaction_date.substring(0, 10);
        t.currency_code = t.currency.iso_currency_alpha;
        t.country_name = this.countryName(t.country_code);
      }
      this.totalPages = Math.ceil(this.alltransactions.length / this.pagesize);
      if (this.currentpage + 1 > this.totalPages || this.totalPages > 0) {
        this.currentpage = 0;
      }
      this.showntransactions = this.alltransactions.slice(this.currentpage * this.pagesize, (this.currentpage + 1) * this.pagesize);
      if (OmarChartComponent.instance.isChartVisible()) {
        this.updateChart();
      }
      this.loading = false;
    }, err => {
      this.loading = false;
      console.log(err.message.message)
      this.currentpage = 0;
      this.showalert = true;
      this.transactions = null;
      this.msg = "No QrTransaction found "
      //this.router.navigateByUrl("/merchantTrans")
    })
  }
  getQrTransactionsAll() {
    let merchantId = localStorage.getItem('idAccount');
    this.loading = true;
    this.service.QrTransSearch(merchantId, "", "", "").subscribe(resp => {
      this.transactions = resp;
      this.alltransactions = this.transactions;
      for (let t of this.alltransactions) {
        t.addditional_date = t.addditional_date.substring(0, 10);
        t.transaction_date = t.transaction_date.substring(0, 10);
        t.currency_code = t.currency.iso_currency_alpha;
        t.country_name = this.countryName(t.country_code);
      }
      this.totalPages = Math.ceil(this.alltransactions.length / this.pagesize);
      if (this.currentpage + 1 > this.totalPages || this.totalPages > 0) {
        this.currentpage = 0;
      }
      this.showntransactions = this.alltransactions.slice(this.currentpage * this.pagesize, (this.currentpage + 1) * this.pagesize);
      this.loading = false;
    }, err => {
      this.loading = false;
      console.log(err.message.message)
      this.showalert = true;
      this.transactions = null;
      this.msg = "No QrTransaction found "
      //this.router.navigateByUrl("/merchantTrans")
    })
  }
  gotoPage1(i: number) {
    this.currentpage = i;
    //--this.onGetQrTransMerchant(this.idAccount);
    //+++
    this.a = 1;
    //this.getQrTransactionsParAccountsMerch(this.idAccount);
    //--  this.getTransaction(this.idAccount);
  }
  getLogin() {
    return JSON.parse(localStorage.getItem('user')).login;
  }

  logOut() {
    this.service.logout();
    //localStorage.removeItem('user');//++
    this.router.navigateByUrl("/login")
  }

  Transaction() {
    this.showtrx = true;
    this.showdetail = false;
    this.token = false;
    this.qrtoken = false;
    this.showqrtrx = false;
    this.pass = false;
    this.showqrtrxx = false;
    this.showqrloc = false;
    this.showDashboard = false;

  }
  detail() {
    this.showdetail = true;
    this.showtrx = false;
    this.token = false
    this.qrtoken = false;
    this.showqrtrx = false;
    this.pass = false;
    this.showqrtrxx = false;
    this.showqrloc = false;
    this.showDashboard = false;

  }
  ShowParam() {
    this.token = true;
    this.showdetail = false;
    this.showtrx = false;
    this.qrtoken = false;
    this.showqrtrx = false;
    this.pass = false;
    this.showqrtrxx = false;
    this.showqrloc = false;
    this.showDashboard = false;

  }
  //+++++
  ShowParam1() {
    this.pass = true
    this.token = false;
    this.showdetail = false;
    this.showtrx = false;
    this.qrtoken = false;
    this.showqrtrx = false;
    this.showqrtrxx = false;
    this.showqrloc = false;
    this.showDashboard = false;
  }

  QrGeneration() {
    this.token = false;
    this.showdetail = false;
    this.showtrx = false;
    this.qrtoken = true;
    this.showqrtrx = false;
    this.pass = false;
    this.showqrtrxx = false;
    this.showqrloc = false;
    this.showDashboard = false;

    //this.router.navigateByUrl("/qr")

  }

  Dashboard() {
    this.token = false;
    this.showdetail = false;
    this.showtrx = false;
    this.qrtoken = true;
    this.showqrtrx = false;
    this.pass = false;
    this.showqrtrxx = false;
    this.showqrloc = false;
    this.showDashboard = true;

  }

  /* qrstatic(){
     this.token=false;
     this.showdetail=false;
     this.showtrx=false;
     this.qrtoken=false;
     this.qrtoken1=true;
  //   this.service.qrstatic();
   //  this.router.navigateByUrl("/qrstatic")
   }*/

  QrTransaction() {
    this.token = false;
    this.showdetail = false;
    this.showtrx = false;
    this.qrtoken = false;
    this.showqrtrx = true;
    this.showqrtrxx = false;
    this.pass = false;
    this.showqrloc = false;
    this.showDashboard = false;

    // this.router.navigateByUrl("/qrtransaction")

  }

  QrTransaction1() {
    this.token = false;
    this.showdetail = false;
    this.showtrx = false;
    this.qrtoken = false;
    this.showqrtrx = false;
    this.pass = false;
    this.showqrtrxx = true;
    this.showqrloc = false;
    this.showDashboard = false;

    // this.router.navigateByUrl("/qrtransaction")

  }

  //+++++++++++
  getQrTransactionsParAccountsMerch(idAccount) {
    //this.showalert=false;
    console.log("id account=" + idAccount)

    //++++
    if (this.a != 1)
      this.currentpage = 0;
    this.currentPointer = 4;
    this.service.getQrTransactionsMerchByAccount(idAccount, this.currentpage, this.size).subscribe(data => {
      this.showalert = false;
      // this.mer = data;
      this.qrtransactionParAccountMerch = data;
      //  this.merchants=resp;
      this.pagesMerch = new Array(this.qrtransactionParAccountMerch.totalPages);
      this.a = 0;
      console.log("costumers" + data)
      console.log("costumers" + this.pagesMerch)

      //--- this.firstTrans=data[0];
      console.log("transactions" + this.qrtransactionParAccountMerch);

    }, err => {
      this.showalert = true;
      console.log(err);
      console.log("prblm de recuperation des qrtransaction de l'account")
      this.qrtransactionParAccountMerch = null;
      this.pagesMerch = new Array(this.qrtransactionParAccountMerch.totalPages);
      this.a = 0;
    })
    //faire appell au service / accounts/idAccount/transactions
    //  transactionParAccount=data
  }

  /* onGetMerchantsBystatus(idAccount){
     console.log("id account="+idAccount)
     //this.hidePersonOrTrans=true;
     //this.st= status;
 
     if(this.a!=1)
       this.currentpage=0;
     this.currentPointer=4;
    /* this.accountsPersonne=null;
     this.hideAccouts=true;
     this.hidecsearch=false;
     this.hidemain=true;*/


  /* this.service.getMerchantByStatus(status,this.currentpage,this.size).subscribe(resp => {
    // this.showalert=false;

     this.mer = resp;
   //  this.merchants=resp;
     this.pagesMerch=new Array(this.mer.totalPages);
     this.a=0;
     console.log("costumers"+resp)
     console.log("costumers"+ this.pagesMerch)

   }, err => {

     console.log(" erreur de recuperation des clients")
   /*  this.showalert=true;
     if (status=='N')
       this.msg="No Merchant found "
     if (status=='S')
       this.msg="No Suspend Merchant found "
     if (status=='C')
       this.msg="No Canceled Merchant found "*/
  /*   this.mer = null;
     this.pagesMerch=new Array(this.mer.totalPages);
     this.a=0;

   })
 }*/

  //++++++++++++++
  /* onGetQrTransMerchant(idAccount){
     //   this.transactionParAccount=null;
     this.service.getQrTransactionsofMerchant(idAccount,this.currentpage,this.size).subscribe(resp => {
       this.qrtransactionParAccountMerch = resp;
       this.pages=new Array(this.qrtransactionParAccountMerch.totalPages);
       
     }, err => {
       console.log(" erreur de recuperation des qrtransactions")
   //    this.router.navigateByUrl("/login");
     })
   }*/

  //+++
  MerchantParamToken1(paramPass, paramPass1, paramPass2) {
    if (paramPass == null || paramPass1 == null || paramPass2 == null) {
      this.Errpass3 = true;
      this.Errpass1 = false;
      this.valid1 = false;
    }
    else {
      console.log("Password " + paramPass + " this.idAccount " + this.idAccount + " this.paramPass1 " + this.paramPass1 + " this.paramPass2 " + this.paramPass2 + " ")
      console.log("MerchantParamToken1 " + this.idAccount)
      ///+++++++++++
      this.service.MparamPass1(paramPass2, this.idAccount).subscribe(data => {
        console.log("-----------------------------------------------------------------");
        console.log(data);
        this.valid2 = true;
        this.valid1 = false;
        this.Errpass4 = false;
        this.Errpass3 = false;
        this.Errpass1 = false;
        /* this.paramPass= '';
         this.paramPass1= '';
         this.paramPass2= '';*/
        /////+++ complexity
        var numbers = new RegExp(/^[0-9]+$/);
        var passwordExp = new RegExp(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[@?!.,:*=$&_])(?=[^A-Z]*[A-Z]).{8,}$/);
        //this.errorarraycondtion = []
        this.errorarraycondtion = false
        this.validcondition = true
        if (!passwordExp.test(paramPass)) {
          //-- this.errorarraycondtion.push("password must be at least 8 characters and contain a number and an uppercase and lowercase letters ")
          this.errorarraycondtion = true;
          this.validcondition = false;
          console.log("mtdozch");
        }

        else {
          this.service.MparamPass(paramPass, paramPass1, paramPass2, this.idAccount).subscribe(data => {
            console.log("-----------------------------------------------------------------");
            console.log(data);
            //this.paramPass1 = data;
            //--this.paramPass = data;
            //  if(paramPass1 == paramPass){

            this.valid1 = true;
            this.Errpass3 = false;
            this.Errpass1 = false;
            this.Errpass4 = false;
            this.errorarraycondtion = false;
            this.validcondition = true;
            /* this.paramPass= '';
             this.paramPass1= '';
             this.paramPass2= '';*/


            //  }


          }, err => {
            this.Errpass1 = true;
            this.Errpass3 = false;
            this.valid1 = false;
            console.log(err)

            console.log("erreur password ")
            console.log("erreur password1 " + paramPass + "" + paramPass1)

          })

          //  }
        }

      }, err => {
        this.Errpass1 = false;
        this.Errpass4 = true;
        this.Errpass3 = false;
        this.valid1 = false;
        this.valid2 = false;
        console.log(err)

        console.log("erreur password ")
        console.log("erreur oldpassword1 " + paramPass + "" + paramPass2)

      })



      /*this.service.MparamPass( paramPass, paramPass1, paramPass2, this.idAccount).subscribe(data=>{
       console.log("-----------------------------------------------------------------");    
       console.log(data);
       //this.paramPass1 = data;
       //--this.paramPass = data;
     //  if(paramPass1 == paramPass){
       
       this.valid1=true;
       this.Errpass3= false;
       this.Errpass1= false;
       this.paramPass= '';
       this.paramPass1= '';
       this.paramPass2= '';
       
       
     //  }
       
       
     },err=>{
       this.Errpass1=true;
       this.Errpass3= false;
       this.valid1= false;
       console.log(err)
       
       console.log("erreur password ")
       console.log("erreur password1 " +paramPass + "" + paramPass1)
  
     }) */
    }
  }

  /* getMParamToekn1(){
     this.service.getMPPass(this.idAccount).subscribe(data=>{
       console.log("-----------------------------------------------------------------");    
       console.log(data)
       this.paramPass = data;
      
     },err=>{
       this.Errpass2=true;
       console.log("erreur password ")
     }) 
   }*/

  //+++
  closealert() {

    this.showalert = false;


  }
  //+++++
  public downloadPDF() {
    console.log(" * start downloadPDF * ");

    // const doc = new jsPDF('landscape', 'pt', 'a4');
    const doc = new jsPDF({ orientation: 'l', unit: 'mm', format: 'a4', compress: true });
    doc.setFont("calibri");
    let header = ["receipt_code", "transaction_date", "user_code", "amount", "currency_code", "merchant_city", "country_code", "mcccode"];
    doc.setFontSize(12);
    doc.text(400, 20, 'QrTransactions History');

    let headerConfig = header.map(key => ({
      'name': key,
      'prompt': key,
      'fontSize': 1,
      'width': 104,
      'align': 'center',
      'padding': 20
    }));

    doc.table(30, 30, this.showntransactions.slice, headerConfig, { fontSize: 10 });

    doc.save('Transactions.pdf');

    console.log(" * end downloadPDF * ");

  }

  public captureScreen() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options  
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });
  }

  public downloadAsPDF() {
    const doc = new jsPDF();
    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };
    const pdfTable = this.pdfTable.nativeElement;
    doc.fromHTML(pdfTable.innerHTML, 15, 15, {
      width: 190,
      'elementHandlers': specialElementHandlers
    });
    doc.save('table.pdf');
  }

  /*
  @ViewChild('content') content: ElementRef;  
  public SavePDF(): void {  
    let content=this.content.nativeElement;  
    let doc = new jsPDF();  
    let _elementHandlers =  
    {  
      '#editor':function(element,renderer){  
        return true;  
      }  
    };  
    doc.fromHTML(content.innerHTML,15,15,{  
  
      'width':190,  
      'elementHandlers':_elementHandlers  
    });  
  
    doc.save('test.pdf');  
  }
  */
  getTransaction(idAccount) {
    this.showalert = false;

    this.hidePersonOrTrans = false;
    /* if(this.a!=1)
       this.currentpage=0;
     // this.currentpage=0;
     this.currentPointer=4;*///+1
    //this.service.transactionByDate(idAccount,this.from,this.to,this.currentpage,this.size).subscribe(resp => {
    this.service.transactionByDate(idAccount, this.from, this.to).subscribe(resp => {
      //---this.trx = resp;
      this.transactions = resp;
      console.log("ffffffffffffffffff" + this.from + this.to);
      /* this.pages=new Array(this.transactions.totalPages);
       this.a=0;*/
      //---this.hidemain=true;
      //-- this.hidecsearch=false;

    }, err => {
      console.log(err.message.message)
      this.showalert = true;
      this.transactions = null;
      /*  this.pages=new Array(this.transactions.totalPages);
        this.a=0;*/
      this.msg = "No QrTransaction found "
      this.router.navigateByUrl("/merchantTrans")

    })
  }
  QrTransaction2() {
    this.token = false;
    this.showdetail = false;
    this.showtrx = false;
    this.qrtoken = false;
    this.showqrtrx = false;
    this.pass = false;
    this.showqrtrxx = false;
    this.showqrloc = true;
    this.showDashboard = false;

    // this.router.navigateByUrl("/qrtransaction")

  }
  getTransactionLocation(idAccount) {
    this.showalert = false;

    this.hidePersonOrTrans = false;
    /* if(this.a!=1)
       this.currentpage=0;
     // this.currentpage=0;
     this.currentPointer=4;*///+1
    //this.service.transactionByDate(idAccount,this.from,this.to,this.currentpage,this.size).subscribe(resp => {
    this.service.qrtransactionByLocation(idAccount, this.mot).subscribe(resp => {
      //---this.trx = resp;
      this.transactions = resp;
      console.log("ffffffffffffffffff" + this.from + this.to);
      /* this.pages=new Array(this.transactions.totalPages);
       this.a=0;*/
      //---this.hidemain=true;
      //-- this.hidecsearch=false;

    }, err => {
      console.log(err.message.message)
      this.showalert = true;
      this.transactions = null;
      /*  this.pages=new Array(this.transactions.totalPages);
        this.a=0;*/
      this.msg = "No QrTransaction found "
      this.router.navigateByUrl("/merchantTrans")

    })
  }
  public downloadPDF1() {
    console.log(" * start downloadPDF * ");

    const doc = new jsPDF('landscape', 'pt', 'a4');
    doc.setFont("calibri");
    let header = [
      "Receipt Code",
      "Transaction Date",
      "User Code",
      "Amount",
      "Currency Code",
      "Merchant City",
      "Country Name",
      "MCC Code"
    ];
    // doc.setFontSize(9);
    doc.setFontSize(20);
    doc.setTextColor(40);
    doc.setFontStyle('normal');
    // doc.text(400, 20, 'QrTransactions');
    var pageSize = doc.internal.pageSize;
    var pageHeight = pageSize.height
      ? pageSize.height
      : pageSize.getHeight(); var pageWidth = pageSize.width
        ? pageSize.width
        : pageSize.getWidth();
    doc.text('QrTransactions', pageWidth / 2, 20, { 'align': 'center' });


    let headerConfig = header.map(key => ({
      'name': key,
      'prompt': key,
      'fontSize': 20,
      'width': 130,
      'height': 36,
      'align': 'center',
      'padding': 20
    }));


    doc.table(30, 30, this.alltransactions.slice(), headerConfig, { fontSize: 13 });

    doc.save('QrTransactions.pdf');

    console.log(" * end downloadPDF * ");

  }

  numberOfTerminals(name: string) {
    let n = 0;
    for (let terminal of this.terminals) {
      if (terminal['site'] == name) {
        n++;
      }
    }
    return n;
  }

  updateChart() {
    let instance = OmarChartComponent.instance;
    instance.datasource = this.alltransactions.slice().reverse();
    if (this.dateFrom != undefined && this.dateTo != undefined) {
      instance.dateFrom = new Date(Date.parse(this.dateFrom.toString()));
      instance.dateTo = new Date(Date.parse(this.dateTo.toString()));
    } else {
      instance.dateFrom = new Date(Date.parse(this.alltransactions[this.alltransactions.length - 1].transaction_date.toString()));
      instance.dateTo = new Date(Date.parse(this.alltransactions[0].transaction_date.toString()));
    }
    instance.periodType = this.periodType;
    instance.groupingType = this.groupingType;
    instance.chartDataType = this.chartDataType;
    instance.update();
    instance.hideChart();
    setTimeout(function () {
      instance.showChart();
    }, 10);
  }

  showChart(periodType: number, groupingType: number, chartDataType: number) {
    let instance = MerchantTransactionsComponent.getInstance();
    this.loading = true;
    setTimeout(function () {
      instance.periodType = periodType;
      instance.groupingType = groupingType;
      instance.chartDataType = chartDataType;
      instance.updateChart();
      OmarChartComponent.instance.hideChart();
      instance.loading = false;
      setTimeout(function () {
        OmarChartComponent.instance.showChart();
      }, 10);
    }, 10);
  }

}

export class Transaction {
  user_code: String;
  receipt_code: String;
  amount: String;
  transaction_date: String;
  merchant_id: String;
  store_id: String;
  merchant_name: String;
  merchant_city: String;
  country_code: String;
  currency: Currency;
  mcccode: String;
  card_number: String;
  addditional_date: String;
  account_number: String;
  location: String;
  currency_code: String;
  country_name: String;
  terminalId: String;
  success: boolean;
  sourceType: String;
  paymentMode: String;
}

export class Currency {
  currency_code: String;
  currency_libelle: String;
  exponent: String;
  iso_currency_alpha: String;
}

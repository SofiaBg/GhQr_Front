import { BaseComponent } from './../BaseComponent/BaseComponent';
import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {GipService} from "../services/gip.service";
import {Router} from "@angular/router";
import * as jsPDF from 'jspdf'; 
import { BnNgIdleService } from 'bn-ng-idle';//++
declare const $;
import * as i18nIsoCountries from 'i18n-iso-countries';
@Component({
  selector: 'app-transaction',
  templateUrl: './qrtransaction.component.html',
  styleUrls: ['./qrtransaction.component.css']
})

export class qrTransactionComponent extends BaseComponent implements OnInit {
  merchantID: string;
  terminalID: string;
  merchantName: string;
  // dateFrom: Date;
  // dateTo: Date;
  dateFrom: string;
  dateTo: string;
  pagenumber: number;
  costumers: any;
  merchants: any;
  from: string = "";
  qrtransactionParAccountMerch;
  transactions:any;
  qrtransaction;
  qrtransaction1:any;
  logo:any
  trx:any;
  err:any;
  accountsPersonne:any;
  transactionParAccountCost:any;
  transactionParAccountMerch;
  firstTrans;
  motCle: string = "";
  mot: string = "";
  page: number = 0;
  size: number = 7;
  pages:Array<any>;
  pagesMerch:Array<any>;
  pagesCost:Array<any>;
  currentpage:number=0;
  currentpageMerch:number=0;
  currentpageCost:number=0;
  currentPointer=1;
  hide:boolean=true;
  hidecsearch:boolean=true;
  hidemain:boolean=false;
  hidemain1:boolean=false;
  hidemain2:boolean=false;
  hideAccouts:boolean=true;
  dispInLine:number=-1;
  idAccount:String;
  hidePersonOrTrans:boolean=false;
  a:number=0;
  showalert:boolean=false;
  msg: string = "";
  timesession : any;
  constructor(private service:GipService,router:Router,private bnIdle: BnNgIdleService) { super(router); }

  ngOnInit() {
   // this.onGetTransaction();
    //this.getQrTransactions();
    i18nIsoCountries.registerLocale(require("i18n-iso-countries/langs/en.json"));
    this.getTransactionSearch();
    this.a=0;
    this.hidemain1=true;
    this.hidemain2=false;
    
   // this.onGetQrTransMerchant(this.idAccount);
  //--  this.getQrTransactionsParAccountsMerch()
   // this.onGetQrTransMerchant2();
    this.TimeSession()
    //++++
   /* this.bnIdle.startWatching(1800).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        console.log('session expired');
        this.service.logOutMerchant();
        this.router.navigateByUrl("/login")
      }
    });*/
    //++++++++++++++++++++++++++++++
    $(function () {
      $('#example').DataTable( {
        dom: 'Bfrtip',
        buttons: [
            'copy', 'csv', 'excel', 'pdf', 'print'
        ]
    } );
    });
  }


  //+++++
TimeSession(){
  this.service.getTimesession().subscribe(data=>{
    this.timesession=data;
  
    this.bnIdle.startWatching(this.timesession).subscribe((isTimedOut: boolean) => {
      //++++
      
            if (isTimedOut) {
              console.log('session expired');
              this.service.logOutMerchant();
              this.router.navigateByUrl("/login")
            }
          });
    
  },err=>{
    this.service.logout();
    this.router.navigateByUrl("/login");
  })
  }



  countryName(countryCode: string): string{
    return i18nIsoCountries.getName(countryCode, "en", {select: "alias"});
  }

  onGetTransaction(){
    this.hidePersonOrTrans=false;
    if(this.a!=1)
      this.currentpage=0;
    // this.currentpage=0;
    this.currentPointer=3;
    this.service.getQrTransactions(this.motCle,this.currentpage,this.size).subscribe(resp => {
      this.transactions = resp;
      this.pages=new Array(this.transactions.totalPages);
      this.a=0;
    }, err => {
      console.log(err)
      //this.router.navigateByUrl("/login");

    })
  }
  //+++++++++++
  /*var getImageFromUrl = function(url, callback) {
  //function(url, callback) {
    var img = new Image, data, ret={data: null, pending: true};
    
    img.onerror = function() {
      throw new Error('Cannot load image: "'+url+'"');
    }
    img.onload = function() {
      var canvas = document.createElement('canvas');
      document.body.appendChild(canvas);
      canvas.width = img.width;
      canvas.height = img.height;
  
      var ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      // Grab the image as a jpeg encoded in base64, but only the data
      data = canvas.toDataURL('image/jpeg').slice('data:image/jpeg;base64,'.length);
      // Convert the data to binary form
      data = atob(data)
      document.body.removeChild(canvas);
  
      ret['data'] = data;
      ret['pending'] = false;
      if (typeof callback === 'function') {
        callback(data);
      }
    }
    img.src = url;
  
    return ret;
  }
  
  // Since images are loaded asyncronously, we must wait to create
  // the pdf until we actually have the image data.
  // If we already had the jpeg image binary data loaded into
  // a string, we create the pdf without delay.
  var createPDF = function(imgData) {
    var doc = new jsPDF();
  
    doc.addImage(imgData, 'JPEG', 10, 10, 50, 50);
    doc.addImage(imgData, 'JPEG', 70, 10, 100, 120);
  
    // Output as Data URI
    doc.output('datauri');
  }
  
  getImageFromUrl('thinking-monkey.jpg', createPDF);*/


//-----------------
//+++++
public loadImage(url) {
  return new Promise((resolve) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.src = url;
  })
}

public downloadPDF(){
/*const doc = new jsPDF('landscape', 'pt', 'a4');
doc.setFont("calibri");
 let header = ["user_code","receipt_code" , "amount" ,"transaction_date","merchant_name","merchant_city", "country_code" ,"currency_code", "mcccode" ,"addditional_date"];
 doc.setFontSize(12);
 doc.text(400, 20, 'QrTransactions History');*/

 this.loadImage('assets/images/ic_logo_cbgmob.png').then((logo) => {
  const doc = new jsPDF('landscape', 'pt', 'a4');
  doc.setFont("calibri");
   let header = ["user_code","receipt_code" , "amount" ,"transaction_date","merchant_name","merchant_city", "country_code" ,"currency_code", "mcccode" ,"addditional_date"];
   doc.setFontSize(12);
   doc.text(400, 20, 'QrTransactions History');
  //const doc = new jsPDF('p', 'mm', 'a4');
  doc.addImage(logo, 'PNG', 1, 1);
  
let headerConfig = header.map(key=>({ 'name': key,
'prompt': key,
'fontSize':1,
'width':104,
'align':'center',
'padding':20}));
doc.table(30, 30, this.qrtransaction, headerConfig, {fontSize:10});
//--doc.table(30, 30, this.transactions, headerConfig, {fontSize:7});
 
  doc.save('Transactions.pdf'); 

  console.log(" * end downloadPDF * ");
 // doc.save('report.pdf');
});
//doc.addImage(this.loadImage, 'PNG', 10, 10);
/* doc.addImage(this.logo, 'PNG', 10, 10);
 //doc.image_compression("assets/images/ic_logo_cbgmob.png");

let headerConfig = header.map(key=>({ 'name': key,
'prompt': key,
'fontSize':1,
'width':104,
'align':'center',
'padding':20}));
doc.table(30, 30, this.qrtransaction, headerConfig, {fontSize:10});
//--doc.table(30, 30, this.transactions, headerConfig, {fontSize:7});
 
  doc.save('Transactions.pdf'); 

  console.log(" * end downloadPDF * ");*/

}


  getTransaction2(){
    this.showalert=false;
  
    this.hidePersonOrTrans=false;
    if(this.a!=1)
      this.currentpage=0;
    // this.currentpage=0;
    this.currentPointer=3;
    this.service.transactionByName(this.from).subscribe(resp => {
     //---this.trx = resp;
      this.transactions = resp;
      console.log( "ffffffffffffffffff"+this.from);
      this.pages=new Array(this.transactions.totalPages);
      this.a=0;
    //--  this.hidemain=true;
    //--  this.hidecsearch=false;
    }, err => {
      console.log(err.message.message)
      this.showalert=true;
      this.msg="No Transaction found "
      this.router.navigateByUrl("/qrtransaction")
  
    })
  }
  
  chercher(){
    if(this.currentPointer==8)
      this.getTransaction1(this.mot);
  }
  getTransaction1(mot: String){
 //   this.showalert=false;
 // this.hidemain1=false;
 // this.hidemain2=true;
 // //--  this.hidePersonOrTrans=false;
 //   if(this.a!=1)
 //  /*   this.currentpage=0;
 //   // this.currentpage=0;
 //   this.currentPointer=8;*/
 //   this.service.qrtransactionBy2(this.mot, 0, 10).subscribe(resp => {
 //     //this.trx = resp;
 //     this.qrtransaction = resp;
 //     console.log( "ffffffffffffffffff"+this.mot);
 //   /*  this.pages=new Array(this.transactions.totalPages);
 //     this.a=0;*/
 //    //-- this.hidemain=true;
 //    //-- this.hidecsearch=false;
 //   }, err => { 
 //     console.log(err.message.message)
 //     this.showalert=true;
 //     this.msg="No Transaction found "
 //     this.router.navigateByUrl("/qrtransaction")
//
 //   })
    this.merchantName = mot.toString();
    this.getTransactionSearch();
  }

  toDateTime(date: string){
    let dateObj = new Date(Date.parse(date));
    let month = new Number(dateObj.getMonth()+1).toString();
    return dateObj.getDate() + "-" + (month.length > 1 ? month : "0"+month) + "-" + dateObj.getFullYear() + " " + dateObj.toLocaleTimeString('gh-GH');
  }

  getTransactionSearch(){
    this.showalert=false;
    if(this.currentpage == -1){
      this.currentpage = 0;
    }
    this.service.transactionSearch(this.merchantName == undefined ? "" : this.merchantName, this.merchantID == undefined ? "" : this.merchantID, this.terminalID == undefined ? "" : this.terminalID, this.dateFrom == undefined ? null : this.dateFrom.toString(), this.dateTo == undefined ? null : this.dateTo.toString(), this.currentpage, this.size).subscribe(resp => {
      this.qrtransaction1=resp;
     this.pagesMerch=new Array(this.qrtransaction1.totalPages);
     if(this.currentpage > this.pagesMerch.length - 1){
       this.currentpage = 0;
     }
      console.log( "ffffffffffffffffff"+this.mot);
    }, err => {
      console.log(err.message.message)
      this.qrtransaction1 = null;
      this.pagesMerch = new Array(0);
      this.currentpage = -1;
      this.showalert=true;
      this.msg="No Transaction found "
      this.router.navigateByUrl("/qrtransaction")

    })
  }

 /* chercher(){

    this.onGetTransaction();


  }*/
  closealert(){

    this.showalert=false;


  }
  gotoPage(i:number){
    this.currentpage=i;
    this.onGetQrTransMerchant(this.idAccount);
    this.onGetQrTransMerchant2();
    
  }
  gotoPage1(i:number){
    this.currentpage=i;
    /*this.a=1;
    this.getQrTransactions();*/
    this.getTransactionSearch();
    //this.getTransaction1(this.mot);
  }
  gotoPageFromInput(){
    this.currentpage=this.pagenumber;
    /*this.a=1;
    this.getQrTransactions();*/
    this.getTransactionSearch();
  }
  onKey(event) {
    this.pagenumber = Number(event.target.value) - 1;
  }

  
 /* gotoPage(i:number){
    this.currentpage=i;
    this.a=1;
    this.chercher();
  }
  gotoPageMerch(i:number){
    this.currentpageMerch=i;
    this.onGetTransMerchant(this.idAccount);
  }
  gotoPageCost(i:number){
    this.currentpageCost=i;
    this.onGetTransCostumer(this.idAccount);
  }*/

  getAccountsParPersonne(idPersonne){
    this.hidePersonOrTrans=true;
    this.hideAccouts=false;
    this.hide=false;
    //  this.hide=true;
    this.dispInLine=idPersonne
    //faire apell au service personnes/idPersonne/accounts
    this.service.getAccountofPersonne(idPersonne).subscribe(data=>{
      this.accountsPersonne=data;
      console.log(data)
    },err=>{
      console.log("prblm de recuperation des compte de personne")
    })
    //accountsPersonne=data
  }
  getTransactionsParAccountsCost(idAccount){
    this.hide=false;

    this.service.getTransactionsCostByAccount(idAccount).subscribe(data=>{
      this.transactionParAccountCost=data;
      console.log("transactions costumer ")
      console.log(data);
    },err=>{
      console.log("prblm de recuperation des transaction de l'account")
    })
    //faire appell au service / accounts/idAccount/transactions
    //  transactionParAccount=data

  }
  /*  getTransactionsParAccountsMerch(idAccount){
      this.hide=false;

      this.service.getTransactionsMerchByAccount(idAccount).subscribe(data=>{
        this.transactionParAccountMerch=data;
        console.log("transactions"+this.transactionParAccountMerch);
      },err=>{
        console.log("prblm de recuperation des transaction de l'account")
      })
      //faire appell au service / accounts/idAccount/transactions
      //  transactionParAccount=data
    }*/
  onGetTransMerchant(idAccount){
    //   this.transactionParAccount=null;
    this.hide=false;
    // this.currentPointer==4
    this.idAccount=idAccount;
    this.service.getTransactionsofMerchant(idAccount,this.currentpageMerch,this.size).subscribe(resp => {
      this.transactionParAccountMerch = resp;
      this.pagesMerch=new Array(this.transactionParAccountMerch.totalPages);
      console.log("pnombre page of transactions -----"+this.pagesMerch)
    }, err => {

      console.log(" erreur de recuperation des transactions")
      //    this.router.navigateByUrl("/login");
    })
  }


  onGetTransCostumer(idAccount){
    //   this.transactionParAccount=null;
    this.hide=false;
    this.idAccount=idAccount;
    this.service.getTransactionsofCost(idAccount,this.currentpageCost,this.size).subscribe(resp => {
      this.transactionParAccountCost = resp;
      this.pagesCost=new Array(this.transactionParAccountCost.totalPages);
      //   console.log("pnombre page of transactions -----"+this.pagesMerch)
    }, err => {

      console.log(" erreur de recuperation des transactions of costumer")
      //    this.router.navigateByUrl("/login");
    })
  }

  hideTransactionsParAccount(){
    // this.hide=true;
    this.transactionParAccountMerch=null;
    this.transactionParAccountCost=null;
  }
  hideAccountsParPersonne(){
    this.hidePersonOrTrans=false;
    this.hide=true;
    this.transactionParAccountMerch=null;
    this.transactionParAccountCost=null;

  }

  logOut(){
    this.service.logout();
    this.router.navigateByUrl("/login")
  }

  transactionsAll(){
    this.hidemain=false;
    this.hidecsearch=true
  }
  //+++
  getQrTransactions(){
    console.log("id account=")
    //+++
    if(this.a!=1)
      this.currentpage=0;
    this.currentPointer=4;
    this.service.getQrTransactionsMerch(this.currentpage,this.size).subscribe(data=>{
    
      this.qrtransaction1=data;
     //-- this.firstTrans=data[0];
     this.pagesMerch=new Array(this.qrtransaction1.totalPages);
      this.a=0;
      this.hidemain1=true;
      this.hidemain2=false;
      console.log("transactions"+this.qrtransaction1);
    },err=>{
      console.log(err);
      console.log("prblm de recuperation des qrtransaction de l'account")
      this.qrtransactionParAccountMerch = null;
      this.pagesMerch=new Array(this.qrtransactionParAccountMerch.totalPages);
      this.a=0;
    })

   
      
      

    //faire appell au service / accounts/idAccount/transactions
    //  transactionParAccount=data
  }

  //++++++++++++++
  onGetQrTransMerchant(idAccount){
    //   this.transactionParAccount=null;
    this.service.getQrTransactionsofMerchant1(this.currentpage,this.size).subscribe(resp => {
      /*this.qrtransaction = resp;
      this.pages=new Array(this.qrtransaction.totalPages);*/
      this.qrtransactionParAccountMerch = resp;
      this.pages=new Array(this.qrtransactionParAccountMerch.totalPages);
    }, err => {
      console.log(" erreur de recuperation des qrtransactions")
  //    this.router.navigateByUrl("/login");
    })
  }

  

  
   //+++++++++++
   getQrTransactionsParAccountsMerch(){
    //console.log("id account="+idAccount)
    this.service.getQrTransactionsMerchByAccount1().subscribe(data=>{
      this.qrtransactionParAccountMerch=data;
      this.firstTrans=data[0];
      console.log("transactions"+this.qrtransactionParAccountMerch);
    },err=>{
      console.log(err);
      console.log("prblm de recuperation des qrtransaction de l'account")
    })
    //faire appell au service / accounts/idAccount/transactions
    //  transactionParAccount=data
  }

  //++++++++++++++
  onGetQrTransMerchant2(){
    //   this.transactionParAccount=null;
    this.service.getQrTransactionsofMerchant2(this.currentpage,this.size).subscribe(resp => {
      this.qrtransaction = resp;
      this.pages=new Array(this.qrtransaction.totalPages);
      console.log(" younes");
    }, err => {
      console.log(" erreur de recuperation des qrtransactions")
  //    this.router.navigateByUrl("/login");
    })
  }
//+++
getLogin() {
  return JSON.parse(localStorage.getItem('user')).login;
}
}

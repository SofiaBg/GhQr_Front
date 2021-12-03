import { Component, OnInit } from '@angular/core';
import {GipService} from "../services/gip.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {
  costumers: any;
  merchants: any;
  transactions:any;
  accountsPersonne:any;
  transactionParAccountCost:any;
  transactionParAccountMerch;
  motCle: string = "";
  page: number = 0;
  size: number = 1;
  pages:Array<any>;
  pagesMerch:Array<any>;
  pagesCost:Array<any>;
  currentpage:number=0;
  currentpageMerch:number=0;
  currentpageCost:number=0;
  currentPointer=1;
  hide:boolean=true;
  hideAccouts:boolean=true;
  dispInLine:number=-1;
  idAccount:String;
  hidePersonOrTrans:boolean=false;
  a:number=0;
  constructor(private service:GipService,private router:Router) { }

  ngOnInit() {
    this.onGetCostumers();
  }


  onGetCostumers(){
    this.hidePersonOrTrans=false;
    if(this.a!=1)
      this.currentpage=0;
    this.currentPointer=1;
      this.accountsPersonne=null;
    this.hideAccouts=true;
    //   this.transactionParAccount=null;
    this.service.getCostumers(this.motCle,this.currentpage,this.size).subscribe(resp => {
      this.costumers = resp;
      this.pages=new Array(this.costumers.totalPages);
      this.a=0;
      console.log("costumers"+resp)
    }, err => {

      console.log(" erreur de recuperation des clients")
      this.router.navigateByUrl("/login");
    })
  }
  onGetMerchants(){
    this.hidePersonOrTrans=false;
    if(this.a!=1)
      this.currentpage=0;
    this.currentPointer=2;
      this.accountsPersonne=null;
      this.transactionParAccountMerch=null;
    this.transactionParAccountCost=null;
    this.hideAccouts=true;
    this.service.getMerchants(this.motCle,this.currentpage,this.size).subscribe(resp => {
      this.merchants = resp;
      this.pages=new Array(this.merchants.totalPages);
      this.a=0;

    }, err => {
      console.log(err)
    })

  }
  onGetTransaction(){
    this.hidePersonOrTrans=false;
    if(this.a!=1)
      this.currentpage=0;
   // this.currentpage=0;
    this.currentPointer=3;
    this.service.getTransactions(this.motCle,this.currentpage,this.size).subscribe(resp => {
      this.transactions = resp;
      this.pages=new Array(this.transactions.totalPages);
      this.a=0;
    }, err => {
      console.log(err)
    })
  }
  onGetNSTransaction(){
    this.hidePersonOrTrans=false;
    if(this.a!=1)
      this.currentpage=0;
   // this.currentpage=0;
    this.currentPointer=3;
    this.service.getNSTransactions('NS',this.currentpage,this.size).subscribe(resp => {
      this.transactions = resp;
      this.pages=new Array(this.transactions.totalPages);
      this.a=0;
    }, err => {
      console.log(err)
    })
  }

  chercher(){
    if(this.currentPointer==1)
      this.onGetCostumers();
    else if (this.currentPointer==2)
      this.onGetMerchants();
    else
      this.onGetTransaction();


  }

  gotoPage(i:number){
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
  }

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

  sendCiv(idAccount){
    this.service.sendCiv(idAccount).subscribe(
      date=>{
        console.log("email sent ")
        this.sentCivsuccessfull()
      },err=>{
        console.log("erroro email not sent ")
        this.sentCivFailed()}
    )
  }

  sentCivFailed() {
    Swal.fire({

      //  html: "<div style='font-size:1.6rem !important '> title </div>",
      type: 'error',
      title: ' <p> Error, not sending email !</p>',
      //  text: 'payment Transaction failed!',
      // width:900,
      // customClass: 'swal-wide',
      position: 'center',
      footer: '<a href>Why do I have this issue?</a>',
      width:500
    })
  }

  sentCivsuccessfull(){

    Swal.fire({
      //position: 'top-end',
      type: 'success',
      title:  'The email was sent successfully',
      position:"center",
      width:500
      // timer: 1500
    })
  }


}

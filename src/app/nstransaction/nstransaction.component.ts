import { Component, OnInit } from '@angular/core';
import {GipService} from "../services/gip.service";
import {Router} from "@angular/router";
import { ModalComponent } from '../modal/modal.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { Observable, interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-nstransaction',
  templateUrl: './nstransaction.component.html',
  styleUrls: ['./nstransaction.component.css']
})
export class NStransactionComponent implements OnInit {
  private updateSubscription: Subscription;

  show:boolean=false;
  costumers: any;
  err:any;
  merchants: any;
  transactions:any;
  trx:any;
  accountsPersonne:any;
  transactionParAccountCost:any;
  transactionParAccountMerch;
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
  hideAccouts:boolean=true;
  dispInLine:number=-1;
  idAccount:String;
  hidePersonOrTrans:boolean=false;
  a:number=0;
  showalert:boolean=false;
  msg: string = "";
  name : string;

  constructor(private service:GipService,private router:Router,private dialog: MatDialog) { }

  ngOnInit() {
    this.updateSubscription = interval(300000).subscribe(
      (val) => { this.onGetNSTransaction()
      }
    )
  }

  openDialog(credit_acc,debit_acc,amount,idcredit){
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: {credit_acc:credit_acc,debit_acc:debit_acc,amount:amount,idcredit:idcredit}
    });
  }

  changeStatus(idPersonne,status) {
    this.hidePersonOrTrans=false;
    if(this.a!=1)
      this.currentpage=0;
    this.currentPointer=17;
    this.accountsPersonne=null;
    this.hideAccouts=true;

    this.service.updateStatus(idPersonne,status).subscribe(resp => {
      this.show=true;
      this.ngOnInit()

    }, err => {

      console.log(" erreur status ")
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
      this.msg="No credit found";
      this.showalert=true
      //this.router.navigateByUrl("/login");

    })
  }

  getTransaction(){
    this.showalert=false;

    this.hidePersonOrTrans=false;
    if(this.a!=1)
      this.currentpage=0;
    // this.currentpage=0;
    this.currentPointer=3;
    this.service.transactionBy(this.mot).subscribe(resp => {
      this.trx = resp;
      console.log( "ffffffffffffffffff"+this.mot);
      this.pages=new Array(this.transactions.totalPages);
      this.a=0;
      this.hidemain=true;
      this.hidecsearch=false;
    }, err => {
      console.log(err.message.message)
      this.showalert=true;
      this.msg="No Transaction found "
      this.router.navigateByUrl("/nstransaction")

    })
  }

  chercher(){

    this.onGetNSTransaction();


  }
  closealert(){

    this.showalert=false;


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

  transactionsAll(){
    this.hidemain=false;
    this.hidecsearch=true
  }

}


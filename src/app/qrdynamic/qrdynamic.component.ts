import { Component, OnInit } from '@angular/core';
import {GipService} from "../services/gip.service";
import {Router, ActivatedRoute} from "@angular/router";
import Swal from "sweetalert2";
import { BnNgIdleService } from 'bn-ng-idle';//++
@Component({
  selector: 'app-qrdynamic',
  templateUrl: './qrdynamic.component.html',
  styleUrls: ['./qrdynamic.component.css']
})
export class qrdynamicComponent implements OnInit {
  costumers: any;
  ctmr: any;
  transactions:any;
  accountsPersonne:any;
  transactionParAccountCost:any;
  motCle: string = "";
  code: string = "";
  id: string = "";
  st: string = "N";
  showalert:boolean=false;
  msg: string = "";
  show:boolean=false;
  hidecsearch:boolean=true;
  hidemain:boolean=false;
  page: number = 0;
  size: number = 5;
  pages:Array<any>;
  pagesMerch:Array<any>;
  pagesCost:Array<any>;
  currentpage:number=0;
  currentpageMerch:number=0;
  currentpageCost:number=0;
  pagesctmr:Array<any>;
  currentPointer=1;
  hide:boolean=true;
  hideAccouts:boolean=true;

  dispInLine:number=-1;
  idAccount:String;
  hidePersonOrTrans:boolean=false;
  a:number=0;
  imageToShow: any;
  blobimage:Blob;
  route: any;
  timesession : any;

  constructor(private service:GipService,private router:Router, private bnIdle: BnNgIdleService) {
    if (typeof (router.getCurrentNavigation().extras.state) !== 'undefined'  ){
      this.createImageFromBlob(router.getCurrentNavigation().extras.state.qrdynamic);
     }
   }


  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imageToShow = reader.result;
       console.log('imageToShow'+this.imageToShow);
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
    console.log('image'+image);
 }

  ngOnInit() {
   // this.st= "N";
    //this.onGetCostumersBystatus(this.st);
    this.TimeSession()
   /* //+++++++
    this.bnIdle.startWatching(1800).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        console.log('session expired');
        this.service.logOutMerchant();
        this.router.navigateByUrl("/login")
      }
    });*/
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


  onGetCostumers(){
    this.hidePersonOrTrans=false;
    if(this.a!=1)
      this.currentpage=0;
    this.currentPointer=1;
    this.accountsPersonne=null;
    this.hideAccouts=true;
    this.service.getCostumers(this.motCle,this.currentpage,this.size).subscribe(resp => {

      this.costumers = resp;
      this.pages=new Array(this.costumers.totalPages);
      this.a=0;
      console.log("costumers"+resp)
    }, err => {

      console.log(" erreur de recuperation des clients")
      //this.router.navigateByUrl("/login");
    })
  }



  onGetCostumersByid(id){
    console.log(id)
    this.hidePersonOrTrans=false;
    //if(this.a!=1)
    this.currentpage=0;
    this.currentPointer=3;
    this.accountsPersonne=null;
    this.hideAccouts=true;
    this.hidecsearch=true;
    this.hidemain=false;
    this.showalert=false;

    this.service.getCostumer(id).subscribe(resp => {

      this.costumers = resp;
      console.log("costumers"+resp)


    }, err => {
      this.showalert=true;
      this.msg="No Customer found "
      console.log(" erreur de recuperation des clients")
     // this.router.navigateByUrl("/qr")

    })
  }


  onGetCostumersBycb(code){
    // this.hidePersonOrTrans=true;
    if(this.a!=1)
      this.currentpage=0;
    this.currentPointer=2;
    this.accountsPersonne=null;
    this.hideAccouts=true;
    this.hidecsearch=false;
    this.hidemain=true;
    this.showalert=false;

    this.service.getCostumerCb(code,this.currentpage,this.size).subscribe(resp => {

      this.ctmr = resp;
      this.pagesctmr=new Array(this.ctmr.totalPages);
      this.a=0;
      console.log("costumers"+resp)
      console.log("costumers"+ this.pagesctmr)

    }, err => {

      console.log(" erreur de recuperation des clients")
      this.showalert=true;
      this.msg="No Customer found "
      //this.router.navigateByUrl("/qr")
    })
  }
/*
  onGetCostumersBystatus(status){
    //this.hidePersonOrTrans=true;
    this.st= status;

    if(this.a!=1)
      this.currentpage=0;
    this.currentPointer=4;
    this.accountsPersonne=null;
    this.hideAccouts=true;
    this.hidecsearch=false;
    this.hidemain=true;


    this.service.getCostumerByStatus(status,this.currentpage,this.size).subscribe(resp => {
      this.showalert=false;

      this.ctmr = resp;
      this.pagesctmr=new Array(this.ctmr.totalPages);
      this.a=0;
      console.log("costumers"+resp)
      console.log("costumers"+ this.pagesctmr)

    }, err => {

      console.log(" erreur de recuperation des clients")
      this.showalert=true;
      if (status=='N')
        this.msg="No Customer found "
      if (status=='S')
        this.msg="No Suspend Customer found "
      if (status=='C')
        this.msg="No Canceled Customer found "

      this.ctmr = null;
      this.pagesctmr=new Array(this.ctmr.totalPages);
      this.a=0;

    })
  }*/

  closealert(){

    this.showalert=false;
    this.show=false;

  }



  onGetTransaction(){
    this.hidePersonOrTrans=false;
    if(this.a!=1)
      this.currentpage=0;
    // this.currentpage=0;
    this.currentPointer=6;
    this.service.getTransactions(this.motCle,this.currentpage,this.size).subscribe(resp => {
      this.transactions = resp;
      this.pages=new Array(this.transactions.totalPages);
      this.a=0;
    }, err => {
      console.log(err)
    })
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

  chercher(){
    if(this.currentPointer==4){
      //this.onGetCostumersBystatus(this.st);



      }else{
      if(this.currentPointer==2){
        this.onGetCostumersBycb(this.code);

      }

      }




  }

  gotoPage(i:number){
    this.currentpage=i;
    this.a=1;
    this.onGetCostumers();
  }
  goPage(i:number){
    this.currentpage=i;
    this.a=1;

    this.chercher()
  }


  gotoPageCost(i:number){
    this.currentpageCost=i;
    this.onGetTransCostumer(this.idAccount);
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
    this.transactionParAccountCost=null;
  }
  hideAccountsParPersonne(){
    this.hidePersonOrTrans=false;
    this.hide=true;
    this.transactionParAccountCost=null;

  }

  logOut(){
    this.service.logout();
    //this.router.navigateByUrl("/login")
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

  customerAll(){

    this.hidemain=false;
    this.hidecsearch=true

  }

  changeStatus(idPersonne,status) {
    this.hidePersonOrTrans=false;
    if(this.a!=1)
      this.currentpage=0;
    this.currentPointer=1;
    this.accountsPersonne=null;
    this.hideAccouts=true;

    this.service.updateStatus(idPersonne,status).subscribe(resp => {
      this.show=true;
      this.ngOnInit()
      //this.router.navigateByUrl("/login")

    }, err => {

      console.log(" erreur status ")


    })
  }
  //+++
  getLogin() {
    return JSON.parse(localStorage.getItem('user')).login;
  }
}

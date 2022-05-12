import { Component, HostListener, Inject, Input, OnInit, Pipe, PipeTransform, Renderer2 } from '@angular/core';
import {GipService} from "../services/gip.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import { BnNgIdleService } from 'bn-ng-idle';//++
import { NGB_DATEPICKER_18N_FACTORY } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-i18n';
import { BaseComponent } from '../BaseComponent/BaseComponent';
import { Merchant } from '../new-merchant/new-merchant.component';
import M from 'minimatch';
import { Script } from 'vm';
import { DOCUMENT, ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.css']
})

export class MerchantListComponent extends BaseComponent implements OnInit {
  
/*SAFIA 28.09.2021 */
 keyword : string = null;

  pagenumber: number;

  costumers: any;
  merchants: any;
  mer: any;
  show:boolean=false;
  transactions:any;
  accountsPersonne:any;
  transactionParAccountCost:any;
  transactionParAccountMerch;
  motCle: string = "";
  id: string = "";
  code: string = "";
  name: string;

  page: number = 0;
  size: number = 5;
  pages:Array<any>;
  pagesMerch:Array<any>;
  pagesCost:Array<any>;
  currentpage:number=0;
  currentpageMerch:number=0;
  currentpageCost:number=0;
  currentPointer=1;
  hide:boolean=true;
  hideAccouts:boolean=true;
  hidecsearch:boolean=true;
  hidemain:boolean=true;
  dispInLine:number=-1;
  idAccount:String;
  hidePersonOrTrans:boolean=false;
  timesession: any;
  status:boolean
  a:number=0;
  qrtransactionParAccountMerch:any;//++
  public isSuperAdmin: boolean

  totalPages: number;
  pagesize: number = 5;

  result: any = null;
  showResult :  any[] =  this.result;

  pageYoffset = 0;

  public isAdmin: boolean
  public isBranchManager : boolean
  public isManager : boolean
  public isBranchOfficier : boolean 
  public isOfficier : boolean = true;


  @HostListener('window:scroll', ['$event']) onScroll(event){
    this.pageYoffset = window.pageYOffset;
  }

  adminList(){
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

  scrollToTop(){
    this.scroll.scrollToPosition([0,0]);
  }

  // getAllReports() {
  //   console.log("ALL REPORTS : ");
  //   this.service.getAllReports().subscribe((data) => {
  //     console.log("ALL REPORTS : ", data);
  //   });
  // }

  onsizechange() {
    this.totalPages = Math.ceil(this.result.length / this.pagesize);
    if (this.currentpage + 1 > this.pagesize) {
      this.currentpage = 0;
    }
    this.showResult = this.result.slice(this.currentpage * this.pagesize, (this.currentpage + 1) * this.pagesize);
  }

  constructor(private scroll : ViewportScroller ,private service:GipService,router:Router,private bnIdle: BnNgIdleService,
    private _renderer2: Renderer2, 
    @Inject(DOCUMENT) private _document: Document) {
    super(router);
    this.name = "";
  } 
  transform(value: any, ...args: any[]) {
    throw new Error('Method not implemented.');
  }

    // dtOptions: DataTables.Settings = {};


    merchantList(){
      this.router.navigateByUrl("/merchantList")
      this.isSuperAdmin = true
    }

  ngOnInit() {
    this.isSuperAdmin = (localStorage.getItem('role') == 'SUPERADMIN');

    this.st= "";
    // this.getAllReports();
    this.onGetMerchantsBystatus(this.st, this.name);
    this.TimeSession()
     // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 5,
    //   processing: true
    // };
    
    //++++++
   /* this.bnIdle.startWatching(1800).subscribe((isTimedOut: boolean) => {
      if (isTimedOut) {
        console.log('session expired');
        this.service.logOutMerchant();
        this.router.navigateByUrl("/login")
      // }
    });*/

  }
//+++++

refresh(){
  this.onGetMerchantsBystatus(this.st, this.name);
}

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
      console.log(resp)
      this.pages=new Array(this.merchants.totalPages);
      this.a=0;

    }, err => {
      console.log(err)
      this.router.navigateByUrl("/login");

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

  c

  getAccountsParPersonne(idPersonne){
    this.hidePersonOrTrans=true;
    this.hideAccouts=false;
    this.hide=false;
    //  this.hide=true;
    this.dispInLine=idPersonne

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
//++++
 //+++++++++++
 getQrTransactionsParAccountsMerch(idAccount){
  console.log("id account="+idAccount)
  //++++
  if(this.a!=1)
    this.currentpage=0;
  this.currentPointer=4;
  this.service.getQrTransactionsMerchByAccount(idAccount,this.currentpage,this.size).subscribe(data=>{
    
   // this.mer = data;
    this.qrtransactionParAccountMerch=data;
  //  this.merchants=resp;
    this.pagesMerch=new Array(this.qrtransactionParAccountMerch.totalPages);
    this.a=0;
    console.log("costumers"+data)
    console.log("costumers"+ this.pagesMerch)

   //--- this.firstTrans=data[0];
    console.log("transactions"+this.qrtransactionParAccountMerch);
    
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
setStatus(status: string){
  this.st = status;
  this.onGetMerchantsBystatus(this.st, this.name);
}
setName(){
  this.name = $('#qrMerchantName').val().toString();
  this.onGetMerchantsBystatus(this.st, this.name);
}
setPage(index: number){
  this.currentpage = index;
  this.onGetMerchantsBystatus(this.st, this.name);
}
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
  chercher(){
    if(this.currentPointer==6)

      this.onGetMerchantsBycb();
    else
      if(this.currentPointer==17)

      this.onGetMerchantsBystatus(this.st, name);


  }

  gotoPage(i:number, name){
    this.currentpage=i;
    this.a=1;
    this.onGetMerchantsBystatus(this.st, name);
    //this.chercher();
  }
  gotoPageMerch(i:number){
    this.currentpage=i;
    this.a=1;
    this.onGetMerchantsBystatus(this.st, this.name);
    //this.onGetTransMerchant(this.idAccount);
  }
  gotoPageFromInput(){
    this.a=1;
    this.gotoPageMerch(this.pagenumber);
  }
  onKey(event) {
    this.pagenumber = Number(event.target.value) - 1;
  }

 /* onGetMerchantsByid(){
    this.hidePersonOrTrans=true;
    if(this.a!=1)
      this.currentpage=0;
    this.currentPointer=1;
    this.accountsPersonne=null;
    this.hideAccouts=true;
    this.hidecsearch=false;
    this.hidemain=false;
    this.hidecsearch=true;


    this.service.getMerchant(this.id).subscribe(resp => {
      this.hidemain=false;

      this.merchants = resp;


      console.log("merchants"+resp)
    }, err => {

      console.log(" erreur de recuperation des clients")
      //this.router.navigateByUrl("/login");
      this.showalert=true;
      this.msg="No Merchant found "
      this.router.navigateByUrl("/merchant")
    })
  }*/
///+++++++++++++++++++
onGetMerchantsByid(){
  this.hidePersonOrTrans=true;
  if(this.a!=1)
    this.currentpage=0;
  this.currentPointer=1;
  this.accountsPersonne=null;
  this.hideAccouts=true;
  this.hidecsearch=false;
  this.hidemain=false;
  this.hidecsearch=true;


  this.service.getMerchantMn(this.id).subscribe(resp => {
    this.hidemain=false;

    this.merchants = resp;


    console.log("merchants"+resp)
  }, err => {

    console.log(" erreur de recuperation des clients")
    //this.router.navigateByUrl("/login");
    this.showalert=true;
    this.msg="No Merchant found "
    this.router.navigateByUrl("/merchantList")
  })
}


  /*--onGetMerchantsBycb(){
    this.hidePersonOrTrans=true;
    if(this.a!=1)
      this.currentpage=0;
    this.currentPointer=6;
    this.accountsPersonne=null;
    this.hideAccouts=true;
    this.hidecsearch=false;
    this.hidemain=true;


    this.service.getMerchantCb(this.code).subscribe(resp => {

      this.mer = resp;
      this.merchants=resp;

      console.log("costumers"+resp)
    }, err => {

      console.log(" erreur de recuperation des clients")
      //this.router.navigateByUrl("/login");
      this.showalert=true;
      this.msg="No Merchants found "
      this.router.navigateByUrl("/merchant")
    })
  }*/
  onGetMerchantsBycb(){
    this.hidePersonOrTrans=true;
    if(this.a!=1)
      this.currentpage=0;
    this.currentPointer=6;
    this.accountsPersonne=null;
    this.hideAccouts=true;
    this.hidecsearch=false;
    this.hidemain=true;


   // this.service.getMerchantCb(this.code).subscribe(resp => {
      this.service.getMerchantAn(this.code).subscribe(resp => {

      this.mer = resp;
      this.merchants=resp;

      console.log("costumers"+resp)
    }, err => {

      console.log(" erreur de recuperation des clients")
      //this.router.navigateByUrl("/login");
      this.showalert=true;
      this.msg="No Merchants found "
      this.router.navigateByUrl("/merchantList")
    })
  }

  goToReport(merchant: any){
    console.log("mer"+ merchant);
    console.log("ter"+ merchant as Merchant)
    this.router.navigateByUrl('/reports', {state: merchant})
  }

  unblockMerchant(id){
    this.service.unblockMerchant(id).subscribe(resp => {
      try {
        if(resp['respCode'] == '000'){
          this.show=true;
          this.msg = "Customer unblocked successfully."
          this.ngOnInit()
        } else {
          this.showalert = true;
          this.msg = "Error unblocking customer.";
        }
      } catch {
        this.showalert = true;
        this.msg = "Error unblocking customer.";
      }

    }, err => {
      this.showalert = true;
      this.msg = "Error unblocking customer.";
      console.log(" erreur unblocking ")
    })
  }

  changeStatus(id,status) {
    this.service.updateMerchantStatus(id,status).subscribe(resp => {
      try {
        if(resp['respCode'] == '000'){
          this.show=true;
          this.msg = "Customer status updated successfully."
          this.ngOnInit()
        } else {
          this.showalert = true;
          this.msg = "Error updating customer status.";
        }
      } catch {
        this.showalert = true;
        this.msg = "Error updating customer status.";
      }

    }, err => {
      this.showalert = true;
      this.msg = "Error updating customer status.";
      console.log(" erreur status ")
    })
  }
  st: string = "N";
  showalert:boolean=false;
  msg: string = "";

  onGetMerchantsBystatus(status, name){
    //this.hidePersonOrTrans=true;
    this.st= status;

    if(this.a!=1)
      this.currentpage=0;
    this.currentPointer=4;
    this.accountsPersonne=null;
    this.hideAccouts=true;
    this.hidecsearch=false;
    this.hidemain=true;


    this.service.getMerchantByStatus('N',this.currentpage,name).subscribe(resp => {
      this.showalert=false;

      this.mer = resp;
      this.merchants=this.mer.content;
      this.pagesMerch=new Array(this.mer.totalPages);
      this.a=0;
      console.log("costumers"+resp)
      console.log("costumers"+ this.pagesMerch)

      this.result= this.merchants;
      this.showResult = this.result.slice(this.currentpage * this.pagesize, (this.currentpage + 1) * this.pagesize);


    }, err => {

      console.log(" erreur de recuperation des clients")
      this.showalert=true;
      if (status=='N')
        this.msg="No Merchant found "
      // if (status=='S')
      //   this.msg="No Suspend Merchant found "
      // if (status=='C')
      //   this.msg="No Canceled Merchant found "
      this.mer = null;
      this.pagesMerch=new Array(this.mer.totalPages);
      this.a=0;

    })
  }
  closealert(){

    this.showalert=false;
    this.show=false;

  }
  //++
  getLogin() {
    return JSON.parse(localStorage.getItem('user')).login;
  }

  details(index: number){
    this.router.navigateByUrl('/merchantDetail', { state: this.merchants[index]})
  }

  

}


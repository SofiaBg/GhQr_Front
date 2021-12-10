import { Component, OnInit } from '@angular/core';
import {GipService} from "../services/gip.service";
import {Router} from "@angular/router";
import { MerchantTransactionsComponent } from '../merchant-transactions/merchant-transactions.component';
@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.css']
})
export class AppmenuComponent implements OnInit {

  public isAdmin: boolean
  public isSuperAdmin: boolean

  constructor(private service:GipService,private router:Router ) { }

  ngOnInit() {
    this.isAdmin = (localStorage.getItem('role') == 'ADMIN');
    this.isSuperAdmin = (localStorage.getItem('role') == 'SUPERADMIN');
  }

  merchantManagementList(){
    this.router.navigateByUrl("/merchantManagementList")
  }

  bulkMerchants(){
    this.router.navigateByUrl("/bulkMerchantsValidation")
  }

  customer(){
    this.router.navigateByUrl("/customer")
  }

  gestion(){

    this.router.navigateByUrl("/transaction")

  }

  gestionNStr(){

    this.router.navigateByUrl("/nstransaction")

  }

  merchant(){

    this.router.navigateByUrl("/merchant")

  }

  adminList(){

    this.router.navigateByUrl("/adminList")

  }

  AdminParamSession(){

    this.router.navigateByUrl("/param/session")

  }
  AdminParamToken(){

    this.router.navigateByUrl("/param/token")

  }
  AdminResetPassword(){
    this.router.navigateByUrl("/passreset");
  }
 /* 
  QrGeneration(){

    this.router.navigateByUrl("/qr")

  }
*/
  gestion1(){

    this.router.navigateByUrl("/qrtransaction")

  }
  QrGeneration(){

    this.router.navigateByUrl("/qr")

  }

  report(){
    this.router.navigateByUrl("/reports")
  }

  dashboard(){
    let inst = MerchantTransactionsComponent.getInstance();
    inst.showdetail=false;
    inst.showtrx=false;
    inst.token=false
    inst.qrtoken=false;
    inst.showqrtrx=false;
    inst.pass=false;
    inst.showqrtrxx=false;
    inst.showqrloc=false;
    inst.showDashboard=true;
  }

  detail(){
    let inst = MerchantTransactionsComponent.getInstance();
    inst.showdetail=true;
    inst.showtrx=false;
    inst.token=false
    inst.qrtoken=false;
    inst.showqrtrx=false;
    inst.pass=false;
    inst.showqrtrxx=false;
    inst.showqrloc=false;
    inst.showDashboard=false;
  }
  //+++++
  ShowParam1(){
    let inst = MerchantTransactionsComponent.getInstance();
    inst.pass=true
    inst.token=false;
    inst.showdetail=false;
    inst.showtrx=false;
    inst.qrtoken=false;
    inst.showqrtrx=false;
    inst.showqrtrxx=false;
    inst.showqrloc=false;
    inst.showDashboard=false;
  }

  QrTransaction2(){
    let inst = MerchantTransactionsComponent.getInstance();
    inst.token=false;
    inst.showdetail=false;
    inst.showtrx=false;
    inst.qrtoken=false;
    inst.showqrtrx=false;
    inst.pass=false;
    inst.showqrtrxx=false;
    inst.showqrloc=true;
    inst.showDashboard=false;

   // this.router.navigateByUrl("/qrtransaction")
  
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

  QrTransaction(){
    let inst = MerchantTransactionsComponent.getInstance();
    inst.token=false;
    inst.showdetail=false;
    inst.showtrx=false;
    inst.qrtoken=false;
    inst.showqrtrx=true;
    inst.showqrtrxx=false;
    inst.pass=false;
    inst.showqrloc=false;
    inst.showDashboard=false;

   // this.router.navigateByUrl("/qrtransaction")

  }

  // dashboard(){
  //   let inst = MerchantTransactionsComponent.getInstance();
  //      this.router.navigateByUrl("/qrtransaction")
  // }

  QrTransaction1(){
    let inst = MerchantTransactionsComponent.getInstance();
    inst.token=false;
    inst.showdetail=false;
    inst.showtrx=false;
    inst.qrtoken=false;
    inst.showqrtrx=false;
    inst.pass=false;
    inst.showqrtrxx=true;
    inst.showqrloc=false;
    inst.showDashboard=false;
   // this.router.navigateByUrl("/qrtransaction")

  }
}

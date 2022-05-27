import { Component, OnInit } from '@angular/core';
import { GipService } from "../services/gip.service";
import { Router } from "@angular/router";
import { BnNgIdleService } from 'bn-ng-idle';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MerchantTransactionsComponent } from '../merchant-transactions/merchant-transactions.component';
import { BaseComponent } from '../BaseComponent/BaseComponent';
import { Report } from '../classes/Report';
@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.css']
})
export class AppmenuComponent extends BaseComponent implements OnInit {

  public isAdmin: boolean;
  // public isSuperAdmin: boolean
  public isBranchManager: boolean;
  public isManager: boolean;
  public isBranchOfficier: boolean;
  public isOfficier: boolean;
  public isUser: boolean;
  public isSubUser: boolean;
  currentRole: string = localStorage.getItem("role");
  reportsAssigned: any[];
  stringJson: any;
  stringObject: any;
  companyName: any;

  constructor(private service: GipService, router: Router, private bnIdle: BnNgIdleService) {
    super(router);
  }
  destroy = new Subject();
  showDialog = false;
  timer: number;
  sessionTime: any;
  dialog = 'stay logged in?';
  notice = 'session expired';
  showNotice = false;

  rxjsTimer = timer(1000, 1000);
  ngOnInit() {

    this.getAllReportsByCurrentRole();

    this.isAdmin = (localStorage.getItem('role') == 'ADMIN');
    // this.isSuperAdmin = (localStorage.getItem('role') == 'SUPERADMIN');    
    this.isOfficier = (localStorage.getItem('role') == 'OFFICIER');
    this.isBranchOfficier = (localStorage.getItem('role') == 'BRANCH OFFICIER');
    this.isManager = (localStorage.getItem('role') == 'MANAGER');
    this.isBranchManager = (localStorage.getItem('role') == 'BRANCH MANAGER');
    this.isUser = (localStorage.getItem('role') == 'USER');
    this.isSubUser = (localStorage.getItem('role') == 'SUB USER');

    this.service.getAparamSession(localStorage.getItem('forgotpass')).subscribe(data=>{
      console.log('SAFIAAAAAAAAAAAAAAAAAAAAA SESSION' + data)
    this.sessionTime=data;
    localStorage.setItem('sessionTime',this.sessionTime)

    },err=>{   
      console.log("erreur token ")
    })

    // if(localStorage.getItem('token') !== null || localStorage.getItem('token') !== undefined || localStorage.getItem('token') !== ''){
      
    //   console.log(" TOKEN IS NOT NULL TO KILL SESSION ")

    //   this.bnIdle.startWatching(500).subscribe((res) => {
    //     if(res) {
    //         console.log("session expired");
    //     }
    //   console.log('-- SESSION TIME OUT --')
    //   this.rxjsTimer.pipe(takeUntil(this.destroy)).subscribe(val => {
    //     this.timer = val;

    //     // if (this.timer ===  this.sessionTime) {
    //     //   console.log(this.dialog)
    //     // }

    //   // if (this.timer ===  this.sessionTime) {
    //   //   this.destroy.next(); 
    //   //   this.destroy.complete();
    //   //   this.service.logout();
    //   //   localStorage.clear();
    //   //   this.router.navigateByUrl("/login")
    //   //   this.showNotice==true;
    //   //   console.log(this.notice) ;
    //   // }
    // })
    // })
    // }

  }


  transactions() {
    this.router.navigateByUrl('transactions')
  }


  detailsMerchant() {
    this.router.navigateByUrl('detailsMerchant')
  }

  reportManagement() {
    this.router.navigateByUrl('gestionReports')
  }

  ReportsBulkMerchant() {
    this.router.navigateByUrl('reportsBulkMerchant');
  }

  SubUsersManagement() {
    this.router.navigateByUrl('subUserManagement');
  }
  getAparamSession(id) {

  }
  bulkMerchantsValidationAtBranch() {
    this.router.navigateByUrl("/getAllBulkMerchantsFoValidation")
  }
  createSingleBulkMerchant() {
    this.router.navigateByUrl("/createSingleBulkMerchant")
  }
  generateQr() {
    this.router.navigateByUrl("/generateQr")
  }
  merchantList() {
    this.router.navigateByUrl("/merchantList")
  }
  merchantManagementList() {
    this.router.navigateByUrl("/merchantManagementList")
  }

  bulkMerchants() {
    this.router.navigateByUrl("/bulkMerchantsValidation")
  }

  customer() {
    this.router.navigateByUrl("/customer")
  }

  gestion() {

    this.router.navigateByUrl("/transaction")

  }

  gestionNStr() {

    this.router.navigateByUrl("/nstransaction")

  }

  merchant() {

    this.router.navigateByUrl("/merchant")

  }

  adminList() {

    this.router.navigateByUrl("/adminList")

  }

  AdminParamSession() {

    this.router.navigateByUrl("/param/session")

  }
  AdminParamToken() {

    this.router.navigateByUrl("/param/token")

  }
  AdminResetPassword() {
    this.router.navigateByUrl("/passreset");
  }
  /* 
   QrGeneration(){
 
     this.router.navigateByUrl("/qr")
 
   }
 */
  gestion1() {

    this.router.navigateByUrl("/qrtransaction")

  }
  QrGeneration() {

    this.router.navigateByUrl("/qr")

  }

  report() {
    this.router.navigateByUrl("/reports")
  }

  dashboard() {
    let inst = MerchantTransactionsComponent.getInstance();
    inst.showdetail = false;
    inst.showtrx = false;
    inst.token = false
    inst.qrtoken = false;
    inst.showqrtrx = false;
    inst.pass = false;
    inst.showqrtrxx = false;
    inst.showqrloc = false;
    inst.showDashboard = true;
  }

  detail() {
    let inst = MerchantTransactionsComponent.getInstance();
    inst.showdetail = true;
    inst.showtrx = false;
    inst.token = false
    inst.qrtoken = false;
    inst.showqrtrx = true;
    inst.pass = false;
    inst.showqrtrxx = false;
    inst.showqrloc = false;
    inst.showDashboard = false;
  }
  //+++++
  ShowParam1() {
    let inst = MerchantTransactionsComponent.getInstance();
    inst.pass = true
    inst.token = false;
    inst.showdetail = false;
    inst.showtrx = false;
    inst.qrtoken = false;
    inst.showqrtrx = false;
    inst.showqrtrxx = false;
    inst.showqrloc = false;
    inst.showDashboard = false;
  }

  QrTransaction2() {
    let inst = MerchantTransactionsComponent.getInstance();
    inst.token = false;
    inst.showdetail = false;
    inst.showtrx = true;
    inst.qrtoken = false;
    inst.showqrtrx = false;
    inst.pass = false;
    inst.showqrtrxx = false;
    inst.showqrloc = true;
    inst.showDashboard = false;

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

  QrTransaction() {
    let inst = MerchantTransactionsComponent.getInstance();
    inst.showtrx = false;
    inst.token = false;
    inst.showdetail = false;
    inst.showtrx = true;
    inst.qrtoken = false;
    inst.showqrtrx = true;
    inst.showqrtrxx = false;
    inst.pass = false;
    inst.showqrloc = false;
    inst.showDashboard = false;

    // this.router.navigateByUrl("/qrtransaction")

  }

  // dashboard(){
  //   let inst = MerchantTransactionsComponent.getInstance();
  //      this.router.navigateByUrl("/qrtransaction")
  // }

  QrTransaction1() {
    let inst = MerchantTransactionsComponent.getInstance();
    inst.token = false;
    inst.showdetail = false;
    inst.showtrx = false;
    inst.qrtoken = false;
    inst.showqrtrx = false;
    inst.pass = false;
    inst.showqrtrxx = true;
    inst.showqrloc = false;
    inst.showDashboard = false;
    // this.router.navigateByUrl("/qrtransaction")

  }

  show: boolean = false
  show1: boolean = false
  show2: boolean = false
  show3: boolean = false
  show4: boolean = false
  show5: boolean = false
  show6: boolean = false
  show7: boolean = false
  show8: boolean = false
  show9: boolean = false
  show10: boolean = false
  show11: boolean = false

  repo = new Report;

  contains(arr, key, val) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i][key] === val) return true;
    }
    return false;
  }

  getAllReportsByCurrentRole() {
    console.log(this.currentRole)
    this.service.getAllReportsByRole(this.currentRole).subscribe((data) => {
      console.log("ALL REPORTS ASSIGNED : ", data);
      this.reportsAssigned = data;
      if (this.reportsAssigned != null) {
        this.show = true
        const foo = this.reportsAssigned;

        if (this.contains(this.reportsAssigned, "reports", "All Merchants")) {
          this.show1 = true;
        }
        if (this.contains(this.reportsAssigned, "reports", "All Activated Merchants")) {
          this.show2 = true;
        }
        if (this.contains(this.reportsAssigned, "reports", "All Suspended Merchants")) {
          this.show3 = true;
        }
        if (this.contains(this.reportsAssigned, "reports", "All Bulk Merchants")) {
          this.show4 = true;
        }
        if (this.contains(this.reportsAssigned, "reports", "All Rejected Bulk Merchants")) {
          this.show5 = true;
        }
        if (this.contains(this.reportsAssigned, "reports", "All Validated Bulk Merchants")) {
          this.show6 = true;
        }

        // if (this.contains(this.reportsAssigned, "reports", "All Validated Bulk Merchants By Branch")) {
        //   this.show7 = true;
        // }

        // if (this.contains(this.reportsAssigned, "reports", "All Rejected Bulk Merchants By Branch")) {
        //   this.show8 = true;
        // }
        if (this.contains(this.reportsAssigned, "reports", "All Validated Bulk Merchants - Branch")) {
          this.show9 = true;
        }
        if (this.contains(this.reportsAssigned, "reports", "All Rejected Bulk Merchants - Branch")) {
          this.show10 = true;
        }
        if (this.contains(this.reportsAssigned, "reports", "All transactions")) {
          this.show11 = true;
        }
      }


    });
  }
  allMerchants() {
    this.router.navigateByUrl('/allMerchantsReports')

  }
  allActivatedMerchants() {
    this.router.navigateByUrl('/allActivatedMerchant')

  }
  allSuspendedMerchants() {
    this.router.navigateByUrl('/allSuspendedMerchant')

  }
  allBulkMerchants() {
    this.router.navigateByUrl('/allBulkMerchantsReport')

  }
  allRejectedBulkMerchant() {
    this.router.navigateByUrl('/allRejectedBulkMerchant')

  }

  rejectedBulkMerchant() {
    this.router.navigateByUrl('/rejectedBulkMerchant')

  }

  allValidatedBulkMerchant() {
    this.router.navigateByUrl('/allValidatedBulkMerchant')

  }
  allValidatedBulkMerchantByBranch() {
    this.router.navigateByUrl('/allValidatedBulkMerchantByBranch')
  }

  allRejectedBulkMerchantByBranch() {
    this.router.navigateByUrl('/allRejectedBulkMerchantByBranch')
  }

  allValidatedBulkMerchantByBranchRep() {
    this.router.navigateByUrl('/allValidatedBulkMerchantByBranchReport')
  }

  allRejectedBulkMerchantByBranchRep() {
    this.router.navigateByUrl('/allRejectedBulkMerchantByBranchReport')
  }
}

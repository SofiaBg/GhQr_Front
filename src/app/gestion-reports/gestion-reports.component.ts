import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../BaseComponent/BaseComponent';
import { Report } from '../classes/Report';
import { AppRole } from '../classes/Roles';
import { GipService } from '../services/gip.service';

@Component({
  selector: 'app-gestion-reports',
  templateUrl: './gestion-reports.component.html',
  styleUrls: ['./gestion-reports.component.css']
})
export class GestionReportsComponent extends BaseComponent implements OnInit {

  keyword: string = null;
  keySearch: string = null;
  roles: any[];
  rolesR = new Set<string>()
  reports: any[];
  repts: any[];
  // reportsAssigned: any[];
  reportsAssigned: any[];
  roleInput: any;
  currentRole: string = localStorage.getItem("role");

  role = new AppRole();
  report = new Report();
  showMessage: boolean = false;
  public errorArray: any[] = [];
  public errMessage = "";
  showMessageR: boolean;
  show: boolean;
  showD : boolean ;

  constructor(private service: GipService, router: Router) {
    super(router);
  }

  ngOnInit() {
    this.getAllRoles();
    this.getAllReports();
  }

  cancel() {
    this.router.navigateByUrl("/adminList")
  }

  public toggleSelection(item, list) {
    item.selected = !item.selected;
  }

  getAllRoles() {
    this.service.getAllRolesReport().subscribe((data) => {
      console.log("ALL ROLES : ", data);
      this.roles = data;
    });
  }

  getAllReports() {
    this.service.getAllReports().subscribe((data) => {
      console.log("ALL REPORTS : ", data);
      this.reports = data;
    });
  }

  getAllReportsByRole() {
    console.log(this.roleInput)
    this.service.getAllReportsByRole(this.roleInput).subscribe((data) => {
      console.log("ALL REPORTS ASSIGNED : ", data);
      this.reportsAssigned = data;
      if (this.reportsAssigned.length === 0 || this.reportsAssigned === undefined) {
        this.showMessageR = true;
      }
      setTimeout(() => {
        this.showMessageR = false;
      }, 4000)
    });
  }

  getAllReportsByCurrentRole() {
    console.log(this.currentRole)
    this.service.getAllReportsByRole(this.currentRole).subscribe((data) => {
      console.log("ALL REPORTS ASSIGNED : ", data);
      this.reportsAssigned = data;
    });
  }

  reportsToRemove:any[];

  public moveSelected(direction) {
    if (this.roleInput === undefined || this.roleInput === null || this.roleInput === '') {
      this.showMessage = true;
    }

    if (direction === 'left') {
      this.reportsAssigned.forEach(item => {
        if (item.selected) {
          this.reports.push(item);
          this.report.action = "REMOVE"
          this.reportsToRemove=this.reports.filter(i => i.selected);
          console.log('REPORTS TO REMOVE     [   ', this.reportsToRemove, '   ]')
          console.log('ALL REPORTS [   ', this.reports, '   ]')
        }
      });
      this.reportsAssigned = this.reportsAssigned.filter(i => !i.selected);
      this.reports = this.reports.filter(i => !i.selected);

      console.log('this.report',this.report)
    } else if (direction === 'right') {
      this.reports.forEach(item => {
        if (item.selected) {
          this.reportsAssigned.push(item);
          this.report.action = "ADD"
          console.log('ALL REPORTS ASSIGNED [   ', this.reportsAssigned, '   ]')
        }
      });
      this.reports = this.reports.filter(i => !i.selected);
      console.log('ALL REPORTS [   ', this.report, '   ]')
    }
  }

  allAssignedReports: any[];
  allToRemoveReports: any[];



  public moveAll(direction) {
    if (this.roleInput === undefined || this.roleInput === null || this.roleInput === '') {
      this.showMessage = true;
    }
    if (direction === 'left') {
      this.report.action = "REMOVEALL";
      this.allToRemoveReports = this.reportsAssigned;
      this.reportsAssigned = [];
      this.reports=this.allToRemoveReports;
      console.log('ALL TO REMOVE   ' , this.reports)
    } else {

      this.report.action = "ADDALL";
      this.allAssignedReports = this.reports;
      console.log("allAssignedReports   ", this.allAssignedReports)
      this.reports = [];
      this.reportsAssigned=this.allAssignedReports
      // this.reportsAssigned.push(this.report.selected); 
      // this.reportsAssigned.push(this.report.role)
      console.log("allAssignedReports   ", this.allAssignedReports)

      console.log("reportsAssigned   ", this.reportsAssigned)

      // this.reportsAssigned.push(this.reportsAssigned);
      console.log('ALL TO SAVE   ' , this.reportsAssigned )
    }
  }


  showMessageRs: boolean = false;
  showMessageRl: boolean = false;

  save() {
    if (this.report.action === 'ADD') {

      console.log("MOVE ALL   ",this.reportsAssigned)
      this.report.report = this.reportsAssigned;
      console.log(this.report.report)
      this.report.role = this.roleInput;

      console.log("REPORTS TO REMOVE TO SAVE    ", this.reportsAssigned);

      if (this.report.report === undefined || this.report.report === null || this.report.report === '') {
        this.showMessageRs = true;
      }
      if (this.report.role === undefined || this.report.role === null || this.report.role.length <= 0) {
        this.showMessageRl = true;
      }

      setTimeout(() => {
        this.showMessageRs = false;
        this.showMessageRl = false;
      }, 4000)
      // for test  var jString = JSON.stringify(this.report);


      this.service.addReportsToRole(this.report).subscribe(data => {
        console.log('DATA   ', data);
        if (data["respCode"] == "000") {
          console.log("Saved :)")
          this.show = true;
        } else {
          this.errMessage = data["respDesc"];
          console.log("ERROR MESSAGE ", data["respDesc"])
          this.errorArray.push(this.errMessage);
          this.showMessage = true;
          setTimeout(() => {
            this.showMessageR = false;
          }, 4000)
        }
      })
    } else if (this.report.action === 'REMOVE') {

      
      this.report.report = this.reportsToRemove;
      this.report.role = this.roleInput;

      console.log("REMOVE THIS REPORTS :)   ", this.reportsToRemove);
      if (this.report.report === undefined || this.report.report === null || this.report.report === '') {
        this.showMessageRs = true;
      }
      if (this.report.role === undefined || this.report.role === null || this.report.role.length <= 0) {
        this.showMessageRl = true;
      }
      console.log('REPORT TO REMOVE IT :', this.report)
      this.service.addReportsToRole(this.report).subscribe(data => {
        console.log('DATA   ', data);
        if (data["respCode"] == "000") {
          console.log("Saved :)")
          this.showD = true;
        } else {
          this.errMessage = data["respDesc"];
          console.log("ERROR MESSAGE ", data["respDesc"])
          this.errorArray.push(this.errMessage);
          this.showMessage = true;
          setTimeout(() => {
            this.showMessage = true;
          }, 4000)
        }
      })
    }
    
    if (this.report.action === 'ADDALL') {

      console.log("MOVE ALL   ",this.reportsAssigned)
      console.log(this.report.report)

      this.report.report = this.reportsAssigned;
      this.report.role = this.roleInput;
      

      console.log("ALL REPORTS TO SAVE    ", this.report);

      if (this.report.report === undefined || this.report.report === null || this.report.report === '') {
        this.showMessageRs = true;
        setTimeout(() => {
          this.showMessageRs = false;
        }, 4000)
      }
      if (this.report.role === undefined || this.report.role === null || this.report.role.length <= 0) {
        this.showMessageRl = true;
        setTimeout(() => {
          this.showMessageRl=false;
        }, 4000)
      }

      // for test  var jString = JSON.stringify(this.report);


      this.service.addAllReportsToRole(this.report).subscribe(data => {
        console.log('DATA   ', data);
        if (data["respCode"] == "000") {
          console.log("Saved :)")
          this.show = true;
        } else {
          this.errMessage = data["respDesc"];
          console.log("ERROR MESSAGE ", data["respDesc"])
          this.errorArray.push(this.errMessage);
          this.showMessage = true;
          setTimeout(() => {
            this.showMessage=false;
          }, 4000)
        }
      })
    } else if (this.report.action === 'REMOVEALL') {

      
      this.report.report = this.reports;
      this.report.role = this.roleInput;

      console.log("REMOVE THIS REPORTS :)   ", this.reports);
      if (this.report.report === undefined || this.report.report === null || this.report.report === '') {
        this.showMessageRs = true;
      }
      if (this.report.role === undefined || this.report.role === null || this.report.role.length <= 0) {
        this.showMessageRl = true;
      }
      console.log('REPORT TO REMOVE IT :', this.report)
      this.service.addAllReportsToRole(this.report).subscribe(data => {
        console.log('DATA   ', data);
        if (data["respCode"] == "000") {
          console.log("Saved :)")
          this.showD = true;
        } else {
          this.errMessage = data["respDesc"];
          console.log("ERROR MESSAGE ", data["respDesc"])
          this.errorArray.push(this.errMessage);
          this.showMessage = true;
          setTimeout(() => {
            this.showMessage = false;
            this.errMessage = data["respDesc"];

          }, 4000)
        }
      })
    }
  }
}

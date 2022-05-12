import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Person } from "../classes/Person";
import { AppRole } from "../classes/Roles";
import { SubUser } from "../classes/sub-user";
import { SubUsers } from "../classes/SubUser";
import { GipService } from "../services/gip.service";

const FILTER_PAG_REGEX = /[^0-9]/g;
@Component({
  selector: "app-sub-user-management",
  templateUrl: "./sub-user-management.component.html",
  styleUrls: ["./sub-user-management.component.css"],
})
export class SubUserManagementComponent implements OnInit {
 
  subUsers: any;
  keyword: string = null;

  currentpage: number = -1;

  result: any = null;
  showResult :  any[] =  this.result;

  totalPages: number;
  pages: Array<any>;
  pagesize: number = 5;
  pagenumber: number;

  constructor(private gipService : GipService, private router : Router) { }

  ngOnInit() {
    this.getAllSubUsersByUser();
  }

  newSubUser() {
    console.log("Going to user creation.");
    this.router.navigateByUrl("/subUserManagementCreation");
  }

  getAllSubUsersByUser(){
    console.log('------ MERCHANT MANAGEMENT  ------')
   this.gipService.getAllSubUsersByUser().subscribe(data => {
     this.subUsers = data;

      this.result = this.subUsers;
        this.totalPages = Math.ceil(this.result.length / this.pagesize);
        if (this.currentpage + 1 > this.totalPages || this.totalPages > 0) {
          this.currentpage = 0;
        }
        this.showResult = this.result.slice(this.currentpage * this.pagesize, (this.currentpage + 1) * this.pagesize);
        

     console.log(data);
     console.log(this.subUsers);
   });
 }

subUserManagementDetail(merchant: SubUsers) {
  console.log("Going to user details. ID: " + merchant.idPerson);
  console.log("Going to user details. Phone: " + merchant.phone);
  this.router.navigateByUrl("/subUserManagementDetails", {
    state: {
      merchant: merchant
    }
  });
}

homePage(){
  this.router.navigateByUrl("/transactions")
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
  this.showResult = this.result.slice(this.currentpage * this.pagesize, (this.currentpage + 1) * this.pagesize);
}

gotoPageFromInput() {
  if (this.pagenumber > 0 && this.pagenumber < this.result.length + 1) {
    this.gotoPage(this.pagenumber);
  }
}

onKey(event) {
  this.pagenumber = Number(event.target.value) - 1;
}

}
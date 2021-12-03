import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { GipService } from '../services/gip.service';

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {

  page = 4;

  // getPageSymbol(current: number) {
  //   return ['A', 'B', 'C', 'D', 'E', 'F', 'G'][current - 1];
  // }

  // selectPage(page: string) {
  //   this.page = parseInt(page, 10) || 1;
  // }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }


  /* SAFIA 10.06.2021 */
  keyword: string = null;

  currentpage: number = -1;
  allAdmin: Array<Admin>;
  shownAdmin: Array<Admin>;
  totalPages: number;
  pages: Array<any>;
  pagesize: number = 5;
  pagenumber: number;

  constructor(private service: GipService, private router: Router) { }

  ngOnInit() {
    this.getAllAdmin();
  }

  adminDetails(admin: Admin) {
    console.log("Going to user details. Username: " + admin.user.username);
    this.router.navigateByUrl("/adminDetails", {
      state: {
        admin: admin
      }
    });
  }

  newAdmin() {
    console.log("Going to user admin creation.");
    this.router.navigateByUrl("/newAdmin");
  }

  onsizechange() {
    this.totalPages = Math.ceil(this.allAdmin.length / this.pagesize);
    if (this.currentpage + 1 > this.pagesize) {
      this.currentpage = 0;
    }
    this.shownAdmin = this.allAdmin.slice(this.currentpage * this.pagesize, (this.currentpage + 1) * this.pagesize);
  }

  gotoPage(i: number) {
    this.currentpage = i;
    this.shownAdmin = this.allAdmin.slice(this.currentpage * this.pagesize, (this.currentpage + 1) * this.pagesize);
  }

  gotoPageFromInput() {
    if (this.pagenumber > 0 && this.pagenumber < this.allAdmin.length + 1) {
      this.gotoPage(this.pagenumber);
    }
  }

  onKey(event) {
    this.pagenumber = Number(event.target.value) - 1;
  }

  getAllAdmin() {
    this.service.getAllAdmin().subscribe(resp => {
      this.allAdmin = resp as Admin[];
      this.totalPages = Math.ceil(this.allAdmin.length / this.pagesize);
      if (this.currentpage + 1 > this.totalPages || this.totalPages > 0) {
        this.currentpage = 0;
      }
      this.shownAdmin = this.allAdmin.slice(this.currentpage * this.pagesize, (this.currentpage + 1) * this.pagesize);
    }, err => {
      console.log(err.message.message)
      this.currentpage = 0;
    })
  }
}

export class Admin {
  public idPerson: number;
  public firstName: string;
  public lastName: string;
  public email: string;
  public phone: string;
  public user: User;
}

export class User {
  public id: number;
  public username: string;
  public blocked: boolean;
}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Merchant } from '../classes/Merchant';
import { GipService } from '../services/gip.service';

@Component({
  selector: 'app-merchants-management-list',
  templateUrl: './merchants-management-list.component.html',
  styleUrls: ['./merchants-management-list.component.css']
})
export class BulkMerchantsManagementListComponent implements OnInit {

  merchants: any;
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
    this.getAllMerchantPerson();
  }

  getAllMerchantPerson(){
    console.log('------ MERCHANT MANAGEMENT  ------')
   this.gipService.getAllMerchantPerson().subscribe(data => {
     this.merchants = data;

      this.result = this.merchants;
        this.totalPages = Math.ceil(this.result.length / this.pagesize);
        if (this.currentpage + 1 > this.totalPages || this.totalPages > 0) {
          this.currentpage = 0;
        }
        this.showResult = this.result.slice(this.currentpage * this.pagesize, (this.currentpage + 1) * this.pagesize);
        

     console.log(data);
     console.log(this.merchants);
   });
 }

 merchantManagementDetail(merchant: Merchant) {
  console.log("Going to user details. Phone: " + merchant.phone);
  this.router.navigateByUrl("/merchantManagementDetail", {
    state: {
      person: merchant
    }
  });
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

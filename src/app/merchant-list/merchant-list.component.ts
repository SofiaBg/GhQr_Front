import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Merchant } from '../new-merchant/new-merchant.component';
import { GipService } from '../services/gip.service';

const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-merchant-list',
  templateUrl: './merchant-list.component.html',
  styleUrls: ['./merchant-list.component.css']
})
export class MerchantListComponent implements OnInit {

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }


  /* SAFIA 10.06.2021 */
  keyword: string = null;

  currentpage: number = -1;
  allMerchant: Array<Merchant>;
  shownMerchant: Array<Merchant>;
  totalPages: number;
  pages: Array<any>;
  pagesize: number = 5;
  pagenumber: number;

  constructor(private service: GipService, private router: Router) { }

  ngOnInit() {
    this.allMerchant
  }

  onsizechange() {
    this.totalPages = Math.ceil(this.allMerchant.length / this.pagesize);
    if (this.currentpage + 1 > this.pagesize) {
      this.currentpage = 0;
    }
    this.shownMerchant = this.allMerchant.slice(this.currentpage * this.pagesize, (this.currentpage + 1) * this.pagesize);
  }

  gotoPage(i: number) {
    this.currentpage = i;
    this.shownMerchant = this.allMerchant.slice(this.currentpage * this.pagesize, (this.currentpage + 1) * this.pagesize);
  }

  gotoPageFromInput() {
    if (this.pagenumber > 0 && this.pagenumber < this.allMerchant.length + 1) {
      this.gotoPage(this.pagenumber);
    }
  }

  onKey(event) {
    this.pagenumber = Number(event.target.value) - 1;
  }

  merchantDetails(merchant: Merchant) {
    this.router.navigateByUrl("/adminDetails", {
      state: {
        merchant: merchant
      }
    });
  }

  getAllMerchant() {
    this.service.getAllUser().subscribe(resp => {
      this.allMerchant = resp as Merchant[];
      this.totalPages = Math.ceil(this.allMerchant.length / this.pagesize);
      if (this.currentpage + 1 > this.totalPages || this.totalPages > 0) {
        this.currentpage = 0;
      }
      this.shownMerchant = this.allMerchant.slice(this.currentpage * this.pagesize, (this.currentpage + 1) * this.pagesize);
    }, err => {
      console.log(err.message.message)
      this.currentpage = 0;
    })
  }
 
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/BaseComponent/BaseComponent';
import { BranchLocator } from 'src/app/classes/branch-locator';
import { GipService } from 'src/app/services/gip.service';

@Component({
  selector: 'app-all-validated-bulk-merchants-by-branch-a',
  templateUrl: './all-validated-bulk-merchants-by-branch-a.component.html',
  styleUrls: ['./all-validated-bulk-merchants-by-branch-a.component.css']
})
export class AllValidatedBulkMerchantsByBranchAComponent extends BaseComponent implements OnInit {

  public merchant: any
  public id: string
  public name: string
  public type: string
  public dateFrom: string
  public dateTo: string
  stringJson: any;
  stringObject: any;
  show: boolean = false;

  fttMsg: boolean = false;
  ftMsg: boolean = false;
  fMsg: boolean = false;
  tMsg: boolean = false;
  typeMsg: boolean = false;
  ttMsg: boolean = false;
  ftypeMsg: boolean = false;
  public branchInput: string;

  public formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GHS',
    minimumFractionDigits: 2
  })

  public loading = false;

  private reportTypes: Map<string, Function> = new Map<string, Function>();

  constructor(private service: GipService, router: Router) {
    super(router);
    if (this.router.getCurrentNavigation() == null || this.router.getCurrentNavigation().extras == null || this.router.getCurrentNavigation().extras.state == null) {
      return;
    }
    this.merchant = this.router.getCurrentNavigation().extras.state;
    this.id = this.merchant.id;
    this.name = this.merchant.firstName + " " + this.merchant.lastName;
  }

  merchantPage() {
    this.router.navigateByUrl("/merchant")
  }

  ngOnInit() {
    this.getMerchantBranchLocator();
  }
  branchLocator : BranchLocator[];

  getMerchantBranchLocator(){
    console.log("get branch locator");
    this.service.getMerchantBranchLocator().subscribe((data) => {
      console.log("get branch");
      this.branchLocator = data;
      console.log(data);
    });
  }

  /* SAFIA 08.10.2021 */
  allValidatedBulkMerchantsByBranch() {
    console.log('Generate Pdf for All Merchants')
    console.log('All merchants', this.dateFrom);
    console.log('All merchants', this.dateTo);

    this.service.getAllValidatedBulkMerchantReportsByBranch(this.dateFrom, this.dateTo,this.branchInput).subscribe(data => {
      console.log('All merchants', data);
      // Convert String obect to JSON
      this.stringJson = JSON.stringify(data);
      this.stringObject = JSON.parse(this.stringJson);
      console.log("JSON object -", this.stringObject);
      console.log(+this.stringObject.pdfLink)
      this.show = true;
      setTimeout(() => {
        window.open("data:application/pdf;base64," + this.stringObject.pdfLink);
      }, 3000);
      this.dateFrom = '';
      this.type = '';
      this.dateTo = '';
    });
  }




  clear() {
    this.merchant = null;
    this.id = null;
    this.name = null;
  }

  toDateStr(date: string) {
    let dateObj = new Date(Date.parse(date));
    let month = new Number(dateObj.getMonth() + 1).toString();
    let str = dateObj.getDate() + "-" + (month.length > 1 ? month : "0" + month) + "-" + dateObj.getFullYear();
    return str
  }

  checkFields(){
  if (this.dateFrom == null && this.dateTo == null) {
      this.fttMsg = false;
      this.ftMsg = true;
      this.fMsg = false;
      this.tMsg = false;
      this.typeMsg = false;
      this.ttMsg = false;
      this.ftypeMsg = false;    }
    else if (this.dateFrom == null) {
      this.fttMsg = true;
      this.ftMsg = false;
      this.fMsg = true;
      this.tMsg = false;
      this.typeMsg = false;
      this.ttMsg = false;
      this.ftypeMsg = false;    }
    else if (this.dateTo == null) {
      this.fttMsg = false;
      this.ftMsg = false;
      this.fMsg = false;
      this.tMsg = true;
      this.typeMsg = false;
      this.ttMsg = false;
      this.ftypeMsg = false;    }
  }

  report() {
    
    this.checkFields()

      console.log(this.type)
    console.log(this.reportTypes.keys())
    console.log(this.dateFrom)
    console.log(this.dateTo)

      console.log(this.dateFrom)
      console.log(this.dateTo)
      // this.allMerchantsPdf();    
  }

  result: any = null;
  showResult :  any[] =  this.result;
  showErrorDate: boolean=false; 
  currentDate=new Date
  page: number = 0;
  size: number = 5;
  pages: Array<any>;
  currentpage: number = -1;
  pagenumber: number;
  pagesize: number = 5;
  totalPages: number;
  a: number = 0;

  toDateTime(date: string) {
    let dateObj = new Date(Date.parse(date));
    let month = new Number(dateObj.getMonth() + 1).toString();
    return dateObj.getDate() + "-" + (month.length > 1 ? month : "0" + month) + "-" + dateObj.getFullYear() + " " + dateObj.toLocaleTimeString('gh-GH');
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
    this.a = 1;
    this.showResult = this.result.slice(this.currentpage * this.pagesize, (this.currentpage + 1) * this.pagesize);
  }
  gotoPageFromInput() {
    if (this.pagenumber > 0 && this.pagenumber < this.showResult.length + 1) {
      this.gotoPage(this.pagenumber);
    }
  }
  onKey(event) {
    this.pagenumber = Number(event.target.value) - 1;
  }

  getAllValidatedBulkMerchantReportsByBranch(){

    this.checkFields();
    this.service.getAllValidatedBulkMerchantReportsByBranch(this.dateFrom,this.dateTo,this.branchInput).subscribe(resp => {
      console.log('REPONSE   ',resp)

      
      this.result = resp;
      this.totalPages = Math.ceil(this.result.length / this.pagesize);
      if (this.currentpage + 1 > this.totalPages || this.totalPages > 0) {
        this.currentpage = 0;
      }
      this.showResult = this.result.slice(this.currentpage * this.pagesize, (this.currentpage + 1) * this.pagesize);
      

    })
  }

}


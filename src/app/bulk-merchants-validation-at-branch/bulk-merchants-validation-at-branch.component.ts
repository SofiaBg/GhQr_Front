import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CSVRecord } from '../classes/CSVRecord';
import { GipService } from '../services/gip.service';

@Component({
  selector: 'app-bulk-merchants-validation-at-branch',
  templateUrl: './bulk-merchants-validation-at-branch.component.html',
  styleUrls: ['./bulk-merchants-validation-at-branch.component.css']
})
export class BulkMerchantsValidationAtBranchComponent implements OnInit {

  bulkMerchants: CSVRecord[];

  result: any = null;
  showResult: any[] = this.result;

  selectedRecord: CSVRecord;
  success: boolean = false;
  error: boolean = false;
  errMessage: boolean = false;
  successMessage: string;

  currentpage: number = -1;
  totalPages: number;
  pages: Array<any>;
  pagesize: number = 5;
  pagenumber: number;

  keyword: string = null;

  merchantPage() {
    this.router.navigateByUrl("/merchantList");
  }

  constructor(private gipService: GipService, private router: Router) {}

  ngOnInit() {
    this.getAllBulkMerchants();
  }

  onsizechange() {
    this.totalPages = Math.ceil(this.bulkMerchants.length / this.pagesize);
    if (this.currentpage + 1 > this.pagesize) {
      this.currentpage = 0;
    }
    this.showResult = this.bulkMerchants.slice(
      this.currentpage * this.pagesize,
      (this.currentpage + 1) * this.pagesize
    );
  }

  gotoPage(i: number) {
    this.currentpage = i;
    this.showResult = this.result.slice(
      this.currentpage * this.pagesize,
      (this.currentpage + 1) * this.pagesize
    );
  }

  gotoPageFromInput() {
    if (this.pagenumber > 0 && this.pagenumber < this.result.length + 1) {
      this.gotoPage(this.pagenumber);
    }
  }

  onKey(event) {
    this.pagenumber = Number(event.target.value) - 1;
  }

  getAllBulkMerchants() {
    console.log("------ BULK MERCHANTS ------");
    this.gipService.getAllBulkMerchantsForValidation().subscribe((data) => {
      this.bulkMerchants = data;

      this.result = this.bulkMerchants;
      this.totalPages = Math.ceil(this.result.length / this.pagesize);
      if (this.currentpage + 1 > this.totalPages || this.totalPages > 0) {
        this.currentpage = 0;
      }
      this.showResult = this.result.slice(
        this.currentpage * this.pagesize,
        (this.currentpage + 1) * this.pagesize
      );

      console.log(data);
      console.log(this.bulkMerchants);
    });
  }

  onSelect(csvRecord: CSVRecord): void {
    this.selectedRecord = csvRecord;
  }

  validateBulkMerchantCreation(csvRecord: CSVRecord) {
    console.log("-- START SAVE RECORD -- ", csvRecord);

    this.gipService.validateBulkMerchantCreationAtBranch(csvRecord).subscribe(
      (data) => {
        console.log("DATA ", data);
        if (data["respCode"] == "000") {
          this.success = true;
          this.error = false;
          this.successMessage = "Merchant validated successfully.";
          this.getAllBulkMerchants();
          // window.location.reload();
          setTimeout(() => {
            this.router.navigateByUrl("/getAllBulkMerchantsFoValidation");
          }, 3000);
        } else {
          this.success = false;
          this.error = true;
          this.errMessage = data["respDesc"];
        }
      },
      (err) => {
        this.success = false;
        this.error = true;
      }
    );
  }

  deleteRows(d) {
    const index = this.bulkMerchants.indexOf(d);
    this.bulkMerchants.splice(index, 1);
  }

  rejectBulkMerchantCreation(csvRecord: CSVRecord) {
    console.log("-- START SAVE RECORD -- ", csvRecord);

    this.gipService.rejectBulkMerchantCreation(csvRecord).subscribe(
      (data) => {
        console.log("DATA ", data);
        if (data["respCode"] == "000") {
          this.success = true;
          this.error = false;
          this.successMessage = "Merchant rejected successfully.";
          this.getAllBulkMerchants();
          // window.location.reload();
          setTimeout(() => {
            this.router.navigateByUrl("/getAllBulkMerchantsFoValidation");
          }, 3000);
        } else {
          this.success = false;
          this.error = true;
          this.errMessage = data["respDesc"];
        }
      },
      (err) => {
        this.success = false;
        this.error = true;
      }
    );
  }

}

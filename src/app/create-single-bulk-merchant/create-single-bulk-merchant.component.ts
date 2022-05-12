import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-single-bulk-merchant',
  templateUrl: './create-single-bulk-merchant.component.html',
  styleUrls: ['./create-single-bulk-merchant.component.css']
})
export class CreateSingleBulkMerchantComponent implements OnInit {

  constructor(private router: Router) { }
  adminList(){
    this.router.navigateByUrl("/createSingleBulkMerchant")
  }
  ngOnInit() {
  }

}

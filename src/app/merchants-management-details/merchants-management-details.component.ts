import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../BaseComponent/BaseComponent';
import { Merchant, User } from '../classes/Merchant';
import { GipService } from '../services/gip.service';

@Component({
  selector: 'app-merchants-management-details',
  templateUrl: './merchants-management-details.component.html',
  styleUrls: ['./merchants-management-details.component.css']
})
export class BulkMerchantsManagementDetailsComponent extends BaseComponent implements OnInit {

  public firstNameInput: string;
  public lastNameInput: string;
  public emailInput: string;
  public mobileNumberInput: string;
  public blocked: string;
  public notBlocked: string;
  public blockStatus: boolean;
  public registrationNumberInput: string;
  public tinInput: string;
  public guaranteeInput: string;
  public APIUrlInput: string;
  public companyNameInput: string;

  public error = false;
  public success = false;
  public errMessage = "";
  public errTitle = "Error";
  public successMessage = "";
  public successTitle = "Success";


  constructor(private service: GipService, router: Router) {
    super(router);
    if (this.router.getCurrentNavigation() == null || this.router.getCurrentNavigation().extras == null || this.router.getCurrentNavigation().extras.state == null) {
      this.router.navigateByUrl("/merchantManagementList");
    }
    let merchant = this.router.getCurrentNavigation().extras.state['merchant'] as Merchant;
    this.firstNameInput = merchant.firstName;
    this.lastNameInput = merchant.lastName;
    this.emailInput = merchant.email;
    this.mobileNumberInput = merchant.phone;
    this.registrationNumberInput = merchant.registrationNumber;
    this.tinInput = merchant.tin
    this.APIUrlInput = merchant.APIUrl;
    this.companyNameInput = merchant.companyName;
    this.blockStatus = merchant.user.blocked;
    if (this.blockStatus) {
      this.blocked = "checked";
    } else {
      this.notBlocked = "checked";
    }
  }
  ngOnInit() {
  }

  cancel() {
    this.router.navigateByUrl("/merchantManagementList")
  }

  updateMerchant() {
    let merchant = new Merchant();
    merchant.email = this.emailInput;
    merchant.firstName = this.firstNameInput;
    merchant.lastName = this.lastNameInput;
    merchant.phone = this.mobileNumberInput;
    merchant.registrationNumber = this.registrationNumberInput;
    merchant.tin = this.tinInput;
    merchant.guarantee = this.guaranteeInput;
    merchant.APIUrl = this.APIUrlInput;
    merchant.companyName = this.companyNameInput;

    let user = new User();
    user.mobileNumber = this.mobileNumberInput;
    user.blocked = this.blockStatus;
    console.log('BLOCKED !' + this.blockStatus)
    merchant.user = user;
    console.log(merchant, ' || ', user)
    this.service.updateMerchant(merchant).subscribe(data => {
      if (data['respCode'] == "000") {
        this.success = true;
        this.error = false;
        this.successMessage = "Merchant updated successfully. Redirecting..."
        setTimeout(() => {
          this.router.navigateByUrl('/merchantManagementList');
        }, 3000);
      } else {
        this.success = false;
        this.error = true;
        this.errMessage = data['respDesc'];
      }
    }
      , err => {
        this.success = false;
        this.error = true;
      });
  }


  changeBlocked(event) {
    if (event.target.value == 1) {
      this.blockStatus = true;
    } else {
      this.blockStatus = false;
    }
  }


  deleteMerchant() {
    let merchant = new Merchant();
    let user = new User();
    user.mobileNumber = this.mobileNumberInput;
    merchant.user = user;
    this.service.deleteMerchantP(merchant).subscribe(data => {
      if (data['respCode'] == "000") {
        this.success = true;
        this.error = false;
        this.successMessage = "Merchant deleted successfully. Redirecting..."
        setTimeout(() => {
          this.router.navigateByUrl('/merchantManagementList');
        }, 3000);
      } else {
        this.success = false;
        this.error = true;
        this.errMessage = data['respDesc'];
      }
    }
      , err => {
        this.success = false;
        this.error = true;
      });
  }


}

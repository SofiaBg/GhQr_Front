
import { BaseComponent } from "./../BaseComponent/BaseComponent";
import { Router } from "@angular/router";

import { Component, OnInit } from "@angular/core";
import { User } from "../admin-list/admin-list.component";
import { GipService } from "../services/gip.service";
import { AdminDto } from "../classes/AdminDto";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MerchantBranch } from "../classes/MerchantBranch";
import { SubUser } from "../classes/sub-user";

@Component({
  selector: 'app-sub-user-management-creation',
  templateUrl: './sub-user-management-creation.component.html',
  styleUrls: ['./sub-user-management-creation.component.css']
})
export class SubUserManagementCreationComponent extends BaseComponent implements OnInit {
  public usernameInput: string;
  public firstNameInput: string;
  public lastNameInput: string;
  public emailInput: string;
  public mobileNumberInput: string;
  public roleInput: string;
  public branchInput: string;
  roles: any[];

  public error = false;
  public success = false;
  public erroArrays: any;
  public errMessage = "";
  public errMessage1 = "";
  public errMessage2 = "";
  public errMessage3 = "";
  public errMessage4 = "";
  public errMessage5 = "";
  public errMessage6 = "";
  public errTitle = "Error";
  public successMessage = "";
  public successTitle = "Success";
  public errMessageMail = "";
  public errMessagePhone = "";

  public step1 :boolean= false;

  constructor(private service: GipService, router: Router) {
    super(router);
  }

  adminForm = new FormGroup({
    paymentMethod: new FormControl("", Validators.required),
    testInput: new FormControl({ value: "", disabled: true }, [
      Validators.required,
    ]),
  });

  onChangeofOptions(newGov) {
    console.log(newGov);
    console.log("OPTION");
  }

  ngOnInit() {
  }

  


  merchantPage() {
    if (localStorage.getItem('role') == 'ADMIN') {

      this.router.navigate(['/adminList']);
      return false;
    } else if (localStorage.getItem('role') == 'USER') {
      this.router.navigate(['/transactions']);
      return false;
    } else if (localStorage.getItem('role') == 'SUB USER') {
      this.router.navigate(['/transactions'])
      return false
    } else if (localStorage.getItem('role') == 'MANAGER') {
      this.router.navigate(['/merchantList'])
      return false;
    } else if (localStorage.getItem('role') == 'BRANCH MANAGER') {
      this.router.navigate(['/getAllBulkMerchantsFoValidation']);
      return false;
    } else if (localStorage.getItem('role') == 'BRANCH OFFICIER') {
      this.router.navigate(['/createSingleBulkMerchant'])
      return false;
    } else if(localStorage.getItem('role') == 'OFFICIER'){
      this.router.navigate(['/merchant'])
    }  }

  showBranchErr: boolean = false;
  errorForm: boolean = false;
  showMessageSave: boolean = false;
  showMessage: boolean = false;
  mode: boolean = false;
  show: boolean = false;
  stepOtp: boolean = false;
  stepSave: boolean = false;
  saveUser: boolean = false;
  dataOtp: any;
  showInput: boolean = false;
  showInput2: boolean = true;
  otpInput : any;

  validate(mobileNumber, otp) {

    mobileNumber =this.mobileNumberInput;
    otp = this.otpInput;

    console.log("Phone Number = ", mobileNumber, "OTP", otp);
    this.service.checkOtpCode(mobileNumber, otp).subscribe((data) => {

      console.log(data);

      if (data["respCode"] == "000") {
        this.mode = true;
        this.show = true;
        this.stepOtp = true;
        setTimeout(() => {
          console.log("Informations checked successfully");
        }, 3000);
        this.showInput2 = false;
        this.showInput = true;
        this.createSubUser();
      } else {
        this.success = false;
        this.error = true;
        this.errMessage = data["respDesc"];
      }
    });

    this.stepSave = true;
    this.showInput = true;
    this.showInput2 = false;
  }

  checkByMobileNumberToSaveSub(phone) {
    
    let subUser = new SubUser();
    subUser.userName = this.usernameInput;
    subUser.phoneNumber = this.mobileNumberInput;
    
    this.erroArrays = [];
    var numbers = new RegExp(/^[0-9]+$/);

    phone = subUser.phoneNumber;

    console.log('PHONE   ', phone)
    if (
      subUser.userName == null && subUser.phoneNumber == null 
    ) {
      this.erroArrays.push(
        "All fields marked with an asterisk (*) are required."
      );
      this.erroArrays.push("Username is required ");
      this.erroArrays.push("Phone is required");
      this.errorForm = true;
      this.showBranchErr = false;
      this.success = false;
    } else if (subUser.userName == null) {
      this.errorForm = false;
      this.showBranchErr = false;
      this.success = false;
      this.erroArrays.push("Username is required ");
    } else if (subUser.phoneNumber == null) {
      this.errorForm = true;
      this.showBranchErr = false;
      this.success = false;
      this.erroArrays.push("Phone is required");
    } else if (subUser.phoneNumber.length < 10 || !numbers.test(subUser.phoneNumber)) {
      this.errorForm = true;
      this.erroArrays.push("Please Enter a valid Phone Number");
      console.log("phone_number not valid");
    } 
    else {
      this.service.checkByMobileNumberToSaveSub(phone).subscribe((data) => {
        console.log(data);

        if (data["respCode"] == "001") {
          console.log("Failed to save, Please check your informations");
          this.showMessage = true;
        }
        if (data["respCode"] == "000") {
          this.mode = true;
          this.show = true;
          this.stepOtp = true;
          this.step1=true;
          setTimeout(() => {
            console.log("Informations checked successfully");
          }, 3000);
          this.showInput2 = false;
          this.showInput = true;
          this.sendOTP(phone);
        }
      });
    }
  }

  sendOTP(mobileNumber) {
    console.log("***** SNED OTP *****");
    mobileNumber = this.mobileNumberInput;
    this.dataOtp = this.service
      .sendOtpCode(mobileNumber)
      .subscribe((data) => {
        console.log("***** OTP *****", data);
      });
  }


  createSubUser() {
    let subUser = new SubUser();
    subUser.userName = this.usernameInput;
    subUser.phoneNumber = this.mobileNumberInput;

      console.log("subUser   : ", subUser);
      this.service.createSubUser(subUser).subscribe(
        (data) => {
          if (data["respCode"] == "000") {
            this.success = true;
            this.error = false;
            this.successMessage = "User created successfully. Redirecting...";
            setTimeout(() => {
              this.router.navigateByUrl("/subUserManagement");
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



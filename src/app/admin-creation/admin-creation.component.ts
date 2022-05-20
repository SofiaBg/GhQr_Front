import { BaseComponent } from "./../BaseComponent/BaseComponent";
import { Router } from "@angular/router";

import { Component, OnInit } from "@angular/core";
import { User } from "../admin-list/admin-list.component";
import { GipService } from "../services/gip.service";
import { AdminDto } from "../classes/AdminDto";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MerchantBranch } from "../classes/MerchantBranch";
import { BranchLocator } from "../classes/branch-locator";

@Component({
  selector: "app-admin-creation",
  templateUrl: "./admin-creation.component.html",
  styleUrls: ["./admin-creation.component.css"],
})
export class AdminCreationComponent extends BaseComponent implements OnInit {
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
  merchantBranch: MerchantBranch[];
  constructor(private service: GipService, router: Router) {
    super(router);
  }

  adminForm = new FormGroup({
    paymentMethod: new FormControl("", Validators.required),
    testInput: new FormControl({ value: "", disabled: true }, [
      Validators.required,
    ]),
  });

  cancel(){
    this.router.navigateByUrl("/adminList")
  }

  onChangeofOptions(newGov) {
    console.log(newGov);
    console.log("OPTION");
  }

  branchLocator : BranchLocator[];

  ngOnInit() {
    // this.service.getMerchantBranchS().subscribe((data) => {
    //   console.log("get branch" + data);
    //   this.merchantBranch = data;
    //   console.log(data);
    // });

    // console.log("get branch");
    // this.service.getMerchantBranches().subscribe((data) => {
    //   console.log("get branch", data);
    //   this.merchantBranch = data;
    //   console.log(data);
    // });
    this.getAllRoles();

    console.log("get branch locator");
    this.service.getMerchantBranchLocators().subscribe((data) => {
      console.log("get branch");
      this.branchLocator = data;
      console.log(data);
    });
  }

  getMerchantBranchLocator(){
    console.log("get branch locator");
    this.service.getMerchantBranchLocator().subscribe((data) => {
      console.log("get branch");
      this.branchLocator = data;
      console.log(data);
    });
  }
  
  getAllBranches() {
    console.log("get branch");
    this.service.getMerchantBranches().subscribe((data) => {
      console.log("get branch", data);
      this.merchantBranch = data;
      console.log(data);
    });
  }

  getAllRoles() {
    this.service.getAllRoles().subscribe((data) => {
      console.log("ALL ROLES : ", data);
      this.roles = data;
    });
  }

  merchantPage() {
    this.router.navigateByUrl("/adminList");
  }

  showBranchErr: boolean = false;
  errorForm: boolean = false;
  createAdmin() {
    this.erroArrays = [];
    // console.log(this.mobileNumberInput)

    let admin = new AdminDto();
    admin.userName = this.usernameInput;
    admin.email = this.emailInput;
    admin.firstName = this.firstNameInput;
    admin.lastName = this.lastNameInput;
    admin.phone = this.mobileNumberInput;
    admin.role = this.roleInput;
    admin.branch = this.branchInput;

    // let user = new User();
    // user.username = this.usernameInput;
    // admin.user = user;

    var regexp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    var numbers = new RegExp(/^[0-9]+$/);

    if (
      admin.userName == null &&
      admin.email == null &&
      admin.firstName == null &&
      admin.lastName == null &&
      // admin.phone == null &&
      admin.role == null
    ) {
      this.erroArrays.push(
        "All fields marked with an asterisk (*) are required."
      );
      this.erroArrays.push("Username is required ");
      this.erroArrays.push("User role is required");
      this.erroArrays.push("FirstName is required");
      this.erroArrays.push("LastName is required");
      this.erroArrays.push("Email is required");
      this.erroArrays.push("Phone is required");
      this.errorForm = true;
      this.showBranchErr = false;
      this.success = false;
    } else if (admin.userName == null) {
      this.errorForm = false;
      this.showBranchErr = false;
      this.success = false;
      this.erroArrays.push("Username is required ");
    } else if (admin.email == null) {
      this.errorForm = true;
      this.showBranchErr = false;
      this.success = false;
      this.erroArrays.push("Email is required");
    } else if (admin.firstName == null) {
      this.errorForm = true;
      this.showBranchErr = false;
      this.success = false;
      this.error = true;
      this.erroArrays.push("FirstName is required");
    } else if (admin.lastName == null) {
      this.errorForm = true;
      this.showBranchErr = false;
      this.success = false;
      this.erroArrays.push("LastName is required");
    }
    //  else if (admin.phone == null) {
    //   this.errorForm = true;
    //   this.showBranchErr = false;
    //   this.success = false;
    //   this.erroArrays.push("Phone is required");
    // } 
    else if (admin.role == null) {
      this.errorForm = true;
      this.showBranchErr = false;
      this.success = false;
      this.erroArrays.push("User role is required");
    } else if (
      (admin.role == "BRANCH OFFICIER" || admin.role == "BRANCH MANAGER") &&
      admin.branch == null
    ) {
      this.erroArrays.push("Branch is required");
      this.errorForm = true;
      this.showBranchErr = false;
      this.success = false;
    } else if (!regexp.test(admin.email)) {
      this.errorForm = true;
      this.erroArrays.push("Please Enter A valid Email");
      console.log("email not valid");
    }else if(admin.phone !== undefined){
         if (admin.phone.length < 10 || !numbers.test(admin.phone)) {
          this.errorForm = true;
          this.erroArrays.push("Please Enter a valid Phone Number");
          console.log("phone_number not valid");
       }

    } else {
      console.log("admin   : ", admin);
      console.log("BEFORE CHECKING USERNAME")
    //  this.checkValidUserName();
      console.log(" USERNAME CHECKED ")
      this.service.createAdmin(admin).subscribe(
        (data) => {
          if (data["respCode"] == "000") {
            this.success = true;
            this.error = false;
            this.successMessage = "User created successfully. Redirecting...";
            setTimeout(() => {
              this.router.navigateByUrl("/adminList");
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

  isValid: boolean = false;

  // checkValidUserName(){
  //   this.service.checkValidUserName(this.usernameInput).subscribe(response =>{
  //     console.log('CBG API RESPONSE     ', response)
  //     if (response["respCode"] == "000") {
  //       this.isValid=true;
  //         }
  //         else{
  //           this.isValid=false;
  //         }     
  //        })
  // }


}

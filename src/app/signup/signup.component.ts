import { Component, OnInit } from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  NumberValueAccessor,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { BranchLocator } from "../classes/branch-locator";
import { MerchantBranch } from "../classes/MerchantBranch";
import { RegisterUser } from "../classes/register-user";
import { SubUser } from "../classes/sub-user";
import { SubUsers } from "../classes/SubUser";
import { GipService } from "../services/gip.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  errorMessage: string;
  errorMessage1: string;
  successMessage: string;
  successMessage1: string;
  showMessage: boolean = false;
  mode: boolean = false;
  show: boolean = false;
  stepOtp: boolean = false;
  stepSave: boolean = false;
  saveUser: boolean = false;

  stringJson: any;
  registerUser = new RegisterUser();
  subU = new SubUser();
  stringObject: any;
  dataOtp: any;
  userpassword: any;
  confirmPassword: any;
  validresetP: boolean = false;
  errorarrayresetP: any;
  pwdPattern: any;
  errorarraycondtion: boolean;
  validcondition: boolean;
  errorarraystep1: any;

  myform: FormGroup;
  matchshow: boolean;
  invalidShow: true;
  showInput: boolean = false;
  showInput2: boolean = true;
  showEye: boolean = false;
  showEye2: boolean = false;
  password;
  merchantBranch: MerchantBranch[];
  branchLocator: BranchLocator[];
  listOfOptions = [];
  subUser: any;
  subUsers: SubUser[];
  // ws : WsUserManagement = new WsUserManagement;
  constructor(
    private gipService: GipService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.myform = fb.group({
      userName: [this.registerUser.userName, Validators.required],
      phoneNumber: [this.registerUser.phoneNumber, Validators.required],
      accountNumber: [this.registerUser.accountNumber, Validators.required],
      businessCertNumber: [
        this.registerUser.businessCertNumber,
        Validators.required,
      ],
      branch: [this.registerUser.branch, Validators.required],
      dateOf: [this.registerUser.dateOf, Validators.required],
      userPassword: [this.registerUser.userPassword, Validators.required],
      userConfirmPassword: [this.registerUser.userCofirmPassword, Validators.required],
    });
    // this.subUser = new FormArray([]);
  }
  phone = $("#phoneNumber").val();
  accountNumber = $("#accountNumber").val();
  branch = $("#domicilBranch").val();
  dateOf = $("#dateOf").val();
  businessCertNumber = $("#buisnessCerNo").val();
  userPassword = $("#userPassword").val();
  userConfirmPassword = $("#confirmPassword").val();

  get t() {
    return this.subUser as FormArray;
  }
  subUserToCreate: boolean = false;
  c: number = 0;
  createSubUser() {
    this.subUserToCreate == true;
    let sub = new SubUser();
    sub.id_item = this.c.valueOf();
    this.registerUser.subUsers.push(sub);

    this.myform.addControl(
      "userName" + sub.id_item,
      new FormControl(sub.userName)
    );
    this.myform.addControl(
      "phoneNumber" + sub.id_item,
      new FormControl(sub.phoneNumber)
    );
    this.myform.addControl(
      "userPassword" + sub.id_item,
      new FormControl(sub.userPassword)
    );
    this.myform.addControl(
      "confirmPassword" + sub.id_item,
      new FormControl(sub.confirmPassword)
    );
    this.c++;
    /*  this.t.push(this.fb.group({
      userNameSubUser : ['',Validators.required],
      phoneSubUser : ['',Validators.required],
      passwordSubUser : ['',Validators.required],
      confirmPasswordSubUser : ['',Validators.required]
    }) */
  }

  ngOnInit() {
    console.log("get branch locator");
    this.gipService.getMerchantBranchLocator().subscribe((data) => {
      console.log("get branch");
      this.branchLocator = data;
      console.log(data);
    });

    console.log("get branch");
    this.gipService.getMerchantBranchS().subscribe((data) => {
      console.log("get branch");
      this.merchantBranch = data;
      console.log(data);
    });
    this.password = "password";
  }

  getMerchantBranchLocator(){
    console.log("get branch locator");
    this.gipService.getMerchantBranchLocator().subscribe((data) => {
      console.log("get branch");
      this.branchLocator = data;
      console.log(data);
    });
  }

  fieldTextTypeUserPassword: boolean;

  toggleUserPasswordTextType() {
    this.fieldTextTypeUserPassword = !this.fieldTextTypeUserPassword;
  }

  fieldTextTypeUserConfirmPassword: boolean;

  toggleUserConfirmPasswordTextType() {
    this.fieldTextTypeUserConfirmPassword = !this.fieldTextTypeUserConfirmPassword;
  }

  fieldTextTypeSubUserPassword: boolean;

  toggleSubUserPasswordTextType() {
    this.fieldTextTypeSubUserPassword = !this.fieldTextTypeSubUserPassword;
  }

  fieldTextTypeSubUserConfirmPassword: boolean;

  toggleSubUserConfirmPasswordTextType() {
    this.fieldTextTypeSubUserConfirmPassword = !this.fieldTextTypeSubUserConfirmPassword;
  }
  

  onClick() {
    if (this.password === "password") {
      this.password = "text";
      this.showEye = true;
    } else {
      this.password = "password";
      this.showEye = false;
    } 
  }

  public errorArray: any[] = [];
  public errMessage = "";
  checkInfosUser(){

    console.log("USER ", this.registerUser)
    var numbers = new RegExp(/^[0-9]+$/);
    var passwordExp = new RegExp(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[@?!.,:*=$&_])(?=[^A-Z]*[A-Z]).{8,}$/);

    console.log(this.c)

  

    if(this.registerUser.phoneNumber === undefined || this.registerUser.phoneNumber === null || this.registerUser.phoneNumber.length===0){
      this.errorArray.push('Phone number is required')
      this.showMessage=true;
      setTimeout(() => {
        this.showMessage=false;
        this.errorArray = [];
      }, 4000)
    }
    if(this.registerUser.userName === undefined || this.registerUser.userName === null || this.registerUser.userName.length===0){
      this.errorArray.push('UserName is required')
      this.showMessage=true;
      setTimeout(() => {
        this.showMessage=false;
        this.errorArray = [];
      }, 4000)
    }
    if(this.registerUser.accountNumber === undefined || this.registerUser.accountNumber === null || this.registerUser.accountNumber.length===0){
      this.errorArray.push('Account number is required')
      this.showMessage=true;
      setTimeout(() => {
        this.showMessage=false;
        this.errorArray = [];
      }, 4000)
    }
    if(this.registerUser.branch === undefined || this.registerUser.branch === null || this.registerUser.branch.length===0){
      this.errorArray.push('Branch is required')
      this.showMessage=true;
      setTimeout(() => {
        this.showMessage=false;
        this.errorArray = [];
      }, 4000)
    }
    if(this.registerUser.businessCertNumber === undefined || this.registerUser.businessCertNumber === null || this.registerUser.businessCertNumber.length===0){
      this.errorArray.push('Business Cert.No is required')
      this.showMessage=true;
      setTimeout(() => {
        this.showMessage=false;
        this.errorArray = [];
      }, 4000)
    }
    if(this.registerUser.dateOf === undefined || this.registerUser.dateOf === null || this.registerUser.dateOf.length===0){
      this.errorArray.push('Date of incorrporation is required')
      this.showMessage=true;
      setTimeout(() => {
        this.showMessage=false;
        this.errorArray = [];
      }, 4000)
    }
    if(this.registerUser.userPassword === undefined || this.registerUser.userPassword === null || this.registerUser.userPassword.length===0){
      this.errorArray.push('User password is required')
      this.showMessage=true;
      setTimeout(() => {
        this.showMessage=false;
        this.errorArray = [];
      }, 4000)
    }
    if(this.registerUser.userCofirmPassword === undefined || this.registerUser.userCofirmPassword === null || this.registerUser.userCofirmPassword.length===0){
      this.errorArray.push('User password Confirmation is required')
      this.showMessage=true;
      setTimeout(() => {
        this.showMessage=false;
        this.errorArray = [];
      }, 4000)
    }
    if (this.registerUser.phoneNumber.length < 10 || !numbers.test(this.registerUser.phoneNumber)) {
      this.errorArray.push("Please Enter a valid Phone Number")
      this.showMessage=true;
      setTimeout(() => {
        this.showMessage=false;
        this.errorArray = [];
      }, 4000)
    }
    if(!passwordExp.test(this.registerUser.userPassword) || !passwordExp.test(this.registerUser.userCofirmPassword)){
      this.errorArray.push('Password must be at least 8 characters and contain a number and an uppercase and lowercase letters and special character')
       this.showMessage=true;
      setTimeout(() => {
        this.showMessage=false;
        this.errorArray = [];
      }, 4000)
     } 
  //    if(this.c != 0){
  //     if(this.subU.phoneNumber === undefined || this.subU.phoneNumber === null || this.subU.phoneNumber.length===0){
  //       this.errorArray.push('Sub User Phone number is required')
  //       this.showMessage=true;
  //     }
  //     if(this.subU.userName === undefined || this.subU.userName === null || this.subU.userName.length===0){
  //       this.errorArray.push('Sub User UserName is required')
  //       this.showMessage=true;
  //     }
  //     if(this.subU.userPassword === undefined || this.subU.userPassword === null || this.subU.userPassword.length===0){
  //       this.errorArray.push('Sub User Password is required')
  //       this.showMessage=true;
  //     }
   
  //   if(this.subU.confirmPassword === undefined || this.subU.confirmPassword === null || this.subU.confirmPassword.length===0){
  //     this.errorArray.push('Sub User confirmation password is required')
  //     this.showMessage=true;
  //   }
  //   if (this.subU.phoneNumber.length < 10 || !numbers.test(this.subU.phoneNumber)) {
  //     this.errorArray.push("Please Enter a valid Sub user Phone Number")
  //     this.showMessage=true;
  //   }
  //   if(!passwordExp.test(this.subU.userPassword) || !passwordExp.test(this.subU.confirmPassword)){
  //     this.errorArray.push('Sub User Password must be at least 8 characters and contain a number and an uppercase and lowercase letters and special character')
  //      this.showMessage=true;
  //    }
  // }
   
   this.gipService.checkUserInfos(this.registerUser).subscribe((data) => {
       console.log("DATA ", data);

       if (data["respCode"] == "000") {
         console.log("infos checked")
        this.stepOtp = true;
        this.showInput2 = false;
        this.showInput = true;
        this.sendOTP(this.registerUser.phoneNumber);
      } else{
        this.errMessage = data["respDesc"];
        console.log("ERROR MESSAGE ", data["respDesc"])
        this.errorArray.push(this.errMessage);
        this.showMessage=true;
        setTimeout(() => {
          this.showMessage=false;
          this.errorArray = [];
        }, 4000)
      }

     })
  }

  saveUsers() {
    console.log(this.registerUser);
    console.log("***** START SAVE USER *****");

    console.log(this.registerUser, "user");
    this.gipService.saveUsers(this.registerUser).subscribe((data) => {
      console.log("data", data);
      if (data["respCode"] == "000") {
        console.log("User added successfully");
        this.showMessageSave = true;
        setTimeout(() => {
          this.router.navigateByUrl("/login");
        }, 4000);
        // this.router.navigateByUrl('/login');
      } else if (data["respCode"] == "001") {
        this.errorMessage = "Failed to save User.";
        console.log("Failed to save User");
        this.saveUser = true;
      }
    });
    }
  

  checkByMobileNumberToSave(phone) {
    // console.log(this.myform.value);
    console.log(this.registerUser);
    // phone = this.registerUser.phoneNumber;
    
     phone = this.registerUser.phoneNumber;
   
      this.gipService.checkByMobileNumberToSave(phone).subscribe((data) => {
        console.log(data);

        if (data["respCode"] == "001") {
          console.log("Failed to save, Please check your informations");
          this.showMessage = true;
        }
        if (data["respCode"] == "000") {
          this.mode = true;
          this.show = true;
          this.stepOtp = true;
          setTimeout(() => {
            console.log("Informations checked successfully");
          }, 4000);
          this.showInput2 = false;
          this.showInput = true;
          this.sendOTP(phone);
        }
      });
    
  }

  validate(mobileNumber, otp) {
    console.log(this.userpassword);
    console.log(this.confirmPassword);

    mobileNumber = this.registerUser.phoneNumber;
    otp = $("#otp").val();

    console.log("Phone Number = ", mobileNumber, "OTP", otp);
    this.gipService.checkOtpCode(mobileNumber, otp).subscribe((data) => {
      console.log(data);

      if (data["respCode"] == "000") {
        console.log("infos checked")
      
       this.saveUsers();
     } else{
       this.errMessage = data["respDesc"];
       console.log("ERROR MESSAGE ", data["respDesc"])
       this.errorArray.push(this.errMessage);
       this.showMessage=true;
     }

    });

    this.stepSave = true;
    this.showInput = true;
    this.showInput2 = false;
  }

  // remove(d) {
  //   const index = this.registerUser.subUsers.indexOf(d);
  //   this.registerUser.subUsers.splice(index, 1);
    
  // }
  remove(x) {
    this.registerUser.subUsers.splice(x, 1);
  }
 
  removeItem(i: number): void {
    this.registerUser.subUsers.splice(i, 1);
  }
  rec =this.registerUser.subUsers;

  selectedRecord :any;

  onSelect( csvRecord : SubUser) : void{
    this.selectedRecord = this.registerUser.subUsers;
    this.selectedRecord =  csvRecord;
    console.log('record ',this.selectedRecord)
  }

  deleteRows(d){
    const index = this.registerUser.subUsers.indexOf(d);
    this.registerUser.subUsers.splice(index, 1);
}
  deleteRow(x) {
    this.subUsers.splice(x, 1);
  }

  showMessageSave: boolean = false;
  // user =  new RegisterUser();
  save() {
    console.log(this.registerUser);
    console.log("***** START SAVE USER *****");
    console.log(this.confirmPassword);

    // this.user = new RegisterUser();
    // this.user.accountNumber=$('#phoneNumber').val();
    //   this.user.accountNumber = $('#accountNumber').val();
    //   this.user.branch = $('#domicilBranch').val();
    //   this.user.dateOf = $('#dateOf').val();
    //   this.user.businessCertNumber = $('#buisnessCerNo').val();
    //   this.user.userPassword = $('#userPassword').val();

    // let user = {
    //   phoneNumber: $("#phoneNumber").val(),
    //   accountNumber: $("#accountNumber").val(),
    //   branch: $("#domicilBranch").val(),
    //   dateOf: $("#dateOf").val(),
    //   businessCertNumber: $("#buisnessCerNo").val(),
    //   userPassword: $("#userPassword").val(),
    // };

    let phone =this.registerUser.phoneNumber
    let accountNumber = this.registerUser.accountNumber;
    let branch = this.registerUser.branch;
    let dateOf = this.registerUser.dateOf;
    let businessCertNumber =this.registerUser.businessCertNumber;
    let userPassword = this.registerUser.userPassword;
    let userConfirmPassword = this.registerUser.userCofirmPassword;

    // phone = $("#phoneNumber").val();
    // let accountNumber = $("#accountNumber").val();
    // let branch = $("#domicilBranch").val();
    // let dateOf = $("#dateOf").val();
    // let businessCertNumber = $("#buisnessCerNo").val();
    // let userPassword = $("#userPassword").val();
    // let userConfirmPassword = $("#confirmPassword").val();

    // console.log('PHONE ', this.registerUser.phoneNumber)
    // var passwordExp = new RegExp(
    //   /^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[@?!.,:*=$&_])(?=[^A-Z]*[A-Z]).{8,}$/
    // );
    // this.errorarrayresetP = [];

    // if (this.validresetP) {
    //   if (!passwordExp.test(userPassword)) {
    //     this.errorarrayresetP = [];
    //     this.validresetP = false;
    //     this.invalidShow = true;
    //     console.log(
    //       "password must be at least 8 characters and contain a number and an uppercase and lowercase letters "
    //     );
    //     this.validresetP = false;
    //   }
    // }

    // if (userPassword !== userConfirmPassword) {
    //   console.log("Password confirmation must match Password");
    //   this.validresetP = false;
    //   this.matchshow = true;
    // }
    // if (
    //   userPassword == null ||
    //   userPassword == "" ||
    //   userConfirmPassword == null ||
    //   userConfirmPassword == "" ||
    //   phone == "" ||
    //   accountNumber == "" ||
    //   branch == "" ||
    //   dateOf == "" ||
    //   businessCertNumber == "" ||
    //   userPassword == "" ||
    //   userConfirmPassword == " "
    // ) {
    //   console.log("All field are required");
    //   this.validresetP = true;
    // } else
     {

    console.log(this.registerUser, "user");
    this.gipService.saveUser(this.registerUser).subscribe((data) => {
      console.log("data", data);
      if (data["respCode"] == "000") {
        console.log("User added successfully");
        this.showMessageSave = true;
        setTimeout(() => {
          this.router.navigateByUrl("/login");
        }, 4000);
        // this.router.navigateByUrl('/login');
      } else if (data["respCode"] == "001") {
        this.errorMessage = "Failed to add User.";
        console.log("Failed to add User");
        this.saveUser = true;
      }
    });
    }
  }

  sendOTP(mobileNumber) {
    console.log("***** SNED OTP *****");
    mobileNumber = this.registerUser.phoneNumber;
    this.dataOtp = this.gipService
      .sendOtpCode(mobileNumber)
      .subscribe((data) => {
        console.log("***** OTP *****", data);
      });
  }

  cancel() {
    this.router.navigateByUrl("/login");
  }

  // /*SAFIA 28.09.2021 */
  // checkUserInfo(accountNumber) {
  //   accountNumber = $('#accountNumber').val();
  //   console.log('Account Number = ', accountNumber)
  //   this.gipService.checkUserInfo(accountNumber).subscribe(data => {
  //     console.log(data);

  //     // Convert String obect to JSON
  //     this.stringJson = JSON.stringify(data);
  //     // console.log("String json object :", this.stringJson);
  //     // console.log("Type :", typeof this.stringJson);

  //     // ConvertjSON to an object
  //     this.stringObject = JSON.parse(this.stringJson);
  //     console.log("JSON object -", this.stringObject);
  //     console.log(this.stringObject.businessRegNo)

  //     if (data['respCode'] == '001') {
  //       console.log('User Not found, Please try again')
  //     } else {
  //       console.log('User checked Successfully')

  //       console.log('STRING OBJECT - businessCertNo ', this.stringObject.businessRegNo)

  //       if (this.stringObject.businessCertNo) {
  //         console.log('true')
  //       }
  //     }
  //   });
  // }
}

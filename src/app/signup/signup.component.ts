import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GipService } from '../services/gip.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

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

  myform: FormGroup
  // ws : WsUserManagement = new WsUserManagement;
  constructor(private gipService: GipService, private router: Router, private fb: FormBuilder) {

  }
  ngOnInit() {
  }

  accountNumber = $('#accountNumber').val();
  branch = $('#domicilBranch').val();
  dateOf = $('#dateOf').val();
  businessCertNumber = $('#buisnessCerNo').val();
  userPassword = $('#userPassword').val();
  userConfirmPassword = $('#confirmPassword').val()

  matchshow: boolean;
  invalidShow: true;
  checkByMobileNumberToSave(phone) {

    phone = $('#phoneNumber').val();
    let accountNumber = $('#accountNumber').val();
    let branch = $('#domicilBranch').val();
    let dateOf = $('#dateOf').val();
    let businessCertNumber = $('#buisnessCerNo').val();
    let userPassword = $('#userPassword').val();
    let userConfirmPassword = $('#confirmPassword').val()


    var passwordExp = new RegExp(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[@?!.,:*=$&_])(?=[^A-Z]*[A-Z]).{8,}$/);
    this.errorarrayresetP = []

    console.log('Phone Number = ', phone)
    console.log('Phone Number = ', accountNumber)
    console.log('Phone Number = ', branch)
    console.log('Phone Number = ', businessCertNumber)
    console.log('Phone Number = ', dateOf)
    console.log('Phone Number = ', userPassword)
    console.log('Phone Number = ', userConfirmPassword)

    if (this.validresetP) {
      if (!passwordExp.test(phone.userPassword)) {
        this.errorarrayresetP = []
        this.validresetP = false
        this.invalidShow = true;
        console.log("password must be at least 8 characters and contain a number and an uppercase and lowercase letters ")
        this.validresetP = false
      } else if (phone.userPassword !== phone.userConfirmPassword) {
        console.log("Password confirmation must match Password")
        this.validresetP = false
        this.matchshow = true
      }
    }else{
      
    }
  

    if (userPassword == null || userPassword == '' ||
      userConfirmPassword == null || userConfirmPassword == ''
      || phone == '' || accountNumber == '' || branch == ''
      || dateOf == '' || businessCertNumber == ''
      || userPassword == '' || userConfirmPassword == ' ') {

      console.log("All field are required")
      this.validresetP = true;
    } else {

      this.gipService.checkByMobileNumberToSave(phone).subscribe(data => {
        console.log(data);

        if (data['respCode'] == "001") {
          console.log('Failed to save, Please check your informations');
          this.showMessage = true;
          // this.errorMessage = "Phone Number already used."
        }
        if (data['respCode'] == "000") {
          this.mode = true;
          this.show = true;
          this.stepOtp = true;
          // this.successMessage='Phone number checked'
          // this.showMessage = true;      
          setTimeout(() => {
            console.log('Informations checked successfully')
          }, 3000)
          this.sendOTP(phone)
          // this.router.navigateByUrl('/otp')
        }
      });

    }

  }

  validate(mobileNumber, otp) {
    console.log(this.userpassword);
    console.log(this.confirmPassword);

    mobileNumber = $('#phoneNumber').val();
    otp = $('#otp').val();

    console.log('Phone Number = ', mobileNumber, 'OTP', otp)
    this.gipService.checkOtpCode(mobileNumber, otp).subscribe(data => {
      console.log(data);
    });

    this.stepSave = true;
  }


  save() {

    console.log('***** START SAVE USER *****')
    console.log(this.confirmPassword)

    let user = {
      "phoneNumber": $('#phoneNumber').val(),
      "accountNumber": $('#accountNumber').val(),
      "branch": $('#domicilBranch').val(),
      "dateOf": $('#dateOf').val(),
      "businessCertNumber": $('#buisnessCerNo').val(),
      "userPassword": $('#userPassword').val(),
    };

    console.log(user, 'user')
    this.gipService.saveUser(user).subscribe(data => {
      console.log('data', data)
      if (data['respCode'] == "000") {
        console.log('User added successfully')
        this.show = true;
        setTimeout(() => {
          this.router.navigateByUrl('/login');
        }, 3000);
        this.router.navigateByUrl('/login');

      } else if (data['respCode'] == "001") {
        this.errorMessage = "Failed to add User."
        console.log('Failed to add User')
        this.saveUser=true;
      }
    })
    // }  
  }

  sendOTP(mobileNumber) {
    console.log('***** SNED OTP *****')
    mobileNumber = $('#phoneNumber').val();
    this.dataOtp = this.gipService.sendOtpCode(mobileNumber).subscribe(data => {
      console.log("***** OTP *****", data)
    })
  }



  cancel() {
    this.router.navigateByUrl('/login')
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

import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { GipService } from "../services/gip.service";
import { CommonUserService } from "../services/CommonUserService";
///forgot pass
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
//---import { Constant } from "../services/Constant";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ResetPasswordRequest } from '../classes/ResetPasswordRequest';
//+++
export class NgbdModalConfirmAutofocus {
  usernameForegetPass: any;
  passwordForegetPass: any;
  constructor(public modal: NgbActiveModal) {
    this.usernameForegetPass = localStorage.getItem("forgotpass");
    //-- this.passwordForegetPass = localStorage.getItem("resettpass");
  }
}

const MODALS: { [name: string]: Type<any> } = {
  autofocus: NgbdModalConfirmAutofocus
};

@Component({
  selector: 'app-login',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css']
})
export class ResetPassComponent implements OnInit {
  mod: number = 0
  username: String;
  msg: String;
  msg1: String;
  hide: boolean = true;
  model: any = {};//+++

  idAccount: string;
  Errpass: boolean = false;//+++
  Errpass1: boolean = false;//+++
  valid: boolean = false;
  //+++forgot pass

  //phone_Number
  phone_number: String;
  //Login operation
  //--msg: String;
  user: any;
  showmsg: boolean = false;


  //Steps management 
  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;
  step4: boolean = false;
  step5: boolean = false;
  iscouting: boolean = false;
  ispass: boolean = false;

  // Step1 Vars For Forget Password => After send Request
  showmsgforgetpass: boolean = false;
  msgforgetpass: String;
  usernameForegetPass: any;
  passwordForegetPass: any;

  // Step1 Vars For Forget Password => Before send request
  validstep1: Boolean = true;
  showmsgstep1: Boolean = false;
  errorarraystep1: any;

  // Step2 Vars For Verify SMS
  showmsgforgetpass2: boolean = false;
  msgforgetpass2: String;


  // Step3 Vars For Verify SMS
  validresetP: Boolean = true;
  msgarrayresetP: Boolean = false;
  errorarrayresetP: any[] = [];
  showmsgstep3: Boolean = false;
  msgstep4: any;

  //Var To send Requests
  role: any;
  //username: any;
  id: any;
  token: string;
  AdminUsername: string;
  response: any;

  //Test If Field empty
  valid1: Boolean = true;//---changer flcode valid1
  msgarray: Boolean = false;
  errorarray: any;




  constructor(private service: GipService, private router: Router, private _modalService: NgbModal, config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.usernameForegetPass = localStorage.getItem("forgotpass");
  }

  numberPhone: string;
  stringJson: any;
  stringObject: any;
  companyName: any;
  password: any;
  showEye: boolean = false;

  onClick() {
    if (this.password === "password") {
      this.password = "text";
      this.showEye = true;
    } else {
      this.password = "password";
      this.showEye = false;
    }
  }

  passwordField1 : boolean ;
  togglePassword1TextType() {
    this.passwordField1 = !this.passwordField1;
  }

  passwordField2 : boolean ;
  togglePassword2TextType() {
    this.passwordField2 = !this.passwordField2;
  }
  getMobileNumber() {
    this.service.getMobileNumber(localStorage.getItem('forgotpass')).subscribe(resp => {
      console.log(resp);

      this.stringJson = JSON.stringify(resp);
      this.stringObject = JSON.parse(this.stringJson);
      console.log("JSON object -", this.stringObject);
      console.log(this.stringObject.phone)
      this.numberPhone = this.stringObject.phone;
      console.log("PHONE :", this.numberPhone)

    })
  }

  ngOnInit() {
    // this.showInput2=true
    this.getMobileNumber();
  }
  showInput: boolean = false;
  showInput2: boolean = true;

  sendOTP(mobileNumber) {
    console.log('PHONE ', this.usernameForegetPass)
    mobileNumber = this.usernameForegetPass
    let password1 = $("#password1").val();
    let password2 = $("#password2").val();
    console.log("PASSWORDS ", password1, ' ', password2)
    console.log("PHONE ", mobileNumber)

    if (password1 === undefined || password1 === null || password1 === '') {
      this.errorarrayresetP.push("Password is required")
      this.msgarrayresetP = true
      this.showInput2 = true;
    } else if (password2 === undefined || password2 === null || password2 === '') {
      this.errorarrayresetP.push("Password confirmation is required")
      this.showInput2 = true;
      this.msgarrayresetP = true
    } else if (this.usernameForegetPass == null) {
      // this.errorarraystep1.push("Phone number is Required")
      this.phone = true;
      console.log("requ")
      this.validresetP = false
    } else {
      console.log('***** SNED OTP *****')
      console.log('***** Phone *****' + mobileNumber)
      mobileNumber = this.usernameForegetPass;
      console.log('***** SNED OTP *****')
      this.dataOtp = this.service.SendOtpForgotPass(mobileNumber).subscribe(data => {
        console.log("***** OTP *****", data)
      })
      this.stepOtp = true;

      this.showInput == true
      this.showInput2 = false;
    }
  }

  //++++++
  GETID1(e) {
    console.log("pass" + e);
    this.passwordForegetPass = e.trim();
    localStorage.setItem("resetpass", this.passwordForegetPass);

  }


  onLogin(f) {
    console.log(f)
    if (!f.username.trim() || !f.password.trim()) {
      // if(!f.username.isEmpty() || !f.password.isEmpty()){
      console.log("gfds" + f.username)
      this.Errpass = true;
      //--this.Errpass1=false;
      /* this.showmsg = true;
     this.msgarray = false;
     this.msg1 = "Username is mandatory";*/
      // this.valid= false;
      //this.hide=true;
    }
    else {
      this.service.login(f).subscribe(resp => {

        let jwt = resp.headers.get("authorization")

        console.log("jwt **  " + jwt)

        this.username = this.service.saveToken(jwt);
        console.log("username that we send to get id account " + this.username)
        if (this.service.isAdmin()) {
          // this.router.navigateByUrl("/customer");
          // Vérifier que login/mdp sont correctes, par exemple par une requête à un service REST
          localStorage.setItem('user', JSON.stringify({ login: this.model.username }));//++
          console.log("ussssssserrrrr", localStorage.getItem)
          this.router.navigateByUrl("/merchant");
        /* this.Errpass= false;
       this.valid= true;*/}
        else {
          console.log("he is in " + this.username)

          this.service.getIdAccount(this.username).subscribe(

            resp => {
              console.log("return id account sucsess and here is response bellow")
              console.log(resp);
              //   this.secure= data['secure']

              this.idAccount = resp['idAccount'];
              console.log(" this.idAccount " + this.idAccount);

              this.service.saveIdAccount(this.idAccount)
              console.log("this.idAccount" + this.idAccount)
              localStorage.setItem('user', JSON.stringify({ login: this.model.username }));
              console.log("ussssssserrrrr", localStorage.getItem)
              this.router.navigateByUrl("/merchantTrans");
              // this.Errpass= false;
              // this.valid= true;
            }
            , error => {
              console.log("not return id account !!!")
              this.router.navigateByUrl("/login")
            }
          )
        }

        //if(this.service.isAdmin()==false){
        //  console.log("+++++++++++++++"+this.username)
        //   console.log(jwt)
      },
        err => {
          console.log("ereur login ")
          this.msg = "Wrong username or password ";
          this.hide = false;
          // this.Errpass= false;


          this.mod = 1;

          setTimeout(() => {    //<<<---    using ()=> syntax      
            this.hide = true;
          }, 9000);
        }

      )
      //  console.log("kaydooooozzz executer hadci")
      this.Errpass = false;
    }
  }





  onRegister() {

    this.router.navigateByUrl("/addMerchant")

  }
  //+++++++++++++++++++++++Forgot pass
  openf(contentf) {
    console.log("test");

    if (this.usernameForegetPass.trim()) {
      console.log(this.usernameForegetPass.trim());

      this.router.navigateByUrl("/forgotPass");
      this.modalService.open(contentf,
        {
          ariaLabelledBy: 'modal-basic-title',
          size: 'lg',
          windowClass: 'custom-class'
        });
      console.log("test123");
    } else {
      this.showmsg = true
      this.msgarray = false;
      this.msg1 = "Username is mandatory"
    }

  }
  openff() {
    console.log("test");

    // if (this.step2 == true) {
    console.log(this.usernameForegetPass.trim());

    this.router.navigateByUrl("/successPass");
    /*  this.modalService.open(contentf,
        {
          ariaLabelledBy: 'modal-basic-title',
          size: 'lg',
          windowClass: 'custom-class'
        });*/
    console.log("test123");
    /* }/* else {
       this.showmsg = true
       this.msgarray = false;
       this.msg1 = "Username is mandatory"
     }*/

  }
  //++++++++++++++++++++++++
  forgertPassword(f) {
    this.errorarraystep1 = []
    this.validstep1 = true
    this.validresetP = true

    //Check Fields If Empty
    if (!f.email.trim()) {
      this.errorarraystep1.push("Email is Required")
      this.validresetP = false
    }
    if (!f.phone_number.trim()) {
      this.errorarraystep1.push("Phone number is Required")
      this.validresetP = false
    }
    if (!f.customer_id.trim()) {
      this.errorarraystep1.push("Customer id is Required")
      this.validresetP = false
    }
    if (this.validresetP) {
      var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      var numbers = new RegExp(/^[0-9]+$/);
      this.errorarraystep1 = []
      this.validstep1 = true

      if (!regexp.test(f.email)) {
        this.errorarraystep1.push("Please Enter A valid Email")
        this.validstep1 = false
        console.log("email not valid");

      }
      if (f.phone_number.length < 10 || !numbers.test(f.phone_number)) {
        this.errorarraystep1.push("Please Enter a valid Phone Number")
        this.validstep1 = false
        console.log("phone_number not valid");

      }
      console.log("this.errorarraystep1" + this.errorarraystep1);
      console.log("this.validstep1" + this.validstep1);

      if (this.validstep1) {
        console.log("good");

        f.usercode = this.usernameForegetPass
        console.log(this.usernameForegetPass);

        console.log(f);
        this.service.forgotpassword(f).subscribe(resp => {
          console.log('######## Response Forgot Password ######' + resp);
          if (resp == "111") {
            console.log("good");
            this.step1 = false;
            this.step2 = true;
            this.step3 = false;
            this.step4 = false;
            this.step5 = false;
            this.phone_number = f.phone_number
            setTimeout(() => {
              if (!this.ispass) {
                this.step1 = false;
                this.step2 = false;
                this.step3 = false;
                this.step4 = false;
                this.step5 = true;
              }
              // Setting TimeOut 2 Min => Redirect To error Page
            }, 120000);

          }
          else if (resp == "222") {
            this.showmsgforgetpass = true;
            this.showmsgstep1 = false;
            this.msgforgetpass = "Inavalid Informations";

          } else if (resp == "333") {
            this.showmsgforgetpass = true;
            this.msgforgetpass = "Inavalid Informations ";
          }
        })

      } else {
        this.showmsgstep1 = true;
        this.showmsgforgetpass = false;

      }

    } else {
      this.showmsgstep1 = true;
      this.showmsgforgetpass = false;

      setTimeout(() => {
        this.showmsgstep1 = false;
      }, 3000);
    }
  }
  //+++++++++++++
  cancelbutton() {
    this.router.navigateByUrl("/login");
    this.modalService.dismissAll()
    this.ispass = false
    this.step1 = true;
    this.step2 = false;
    this.step3 = false;
    this.step4 = false;
    this.step5 = false;
    this.showmsgforgetpass = false;
    this.validstep1 = true;
    this.showmsgstep1 = false;
    this.showmsgforgetpass2 = false;
    this.validresetP = true;
    this.valid = false;
    this.msgarray = false;
    this.errorarrayresetP = []
    this.errorarray = []
    this.errorarraystep1 = []
    this.showmsg = false;
    this.showmsgforgetpass = false;
    this.showmsgstep1 = false;
    this.showmsgforgetpass2 = false;
    this.msgarray = false;
  }

  showMessage: boolean = false;
  mode: boolean = false;
  show: boolean = false;
  phoneForegetPass: any;
  phone: boolean = false;

  stepOtp: boolean = false;
  dataOtp: any;

  public errorArray: any[] = [];
  public errMessage = "";
  otp: string;

  validate(f:any) {
    this.numberPhone

    console.log('Phone Number = ', this.numberPhone, 'OTP', this.otp)
    this.service.checkOtpCode(this.numberPhone, this.otp).subscribe(data => {
      console.log(data);

      if (data["respCode"] == "000") {
        console.log("infos checked")

        this.resetpassword(f);
      } else {
        this.errMessage = data["respDesc"];
        console.log("ERROR MESSAGE ", data["respDesc"])
        this.errorArray.push(this.errMessage);
        this.showMessage = true;
      }

    });

  }
  //+++
  GETID(e) {
    console.log("username" + e);
    this.usernameForegetPass = e.trim();

  }
  //+++
  open(name: string) {
    this._modalService.open(MODALS[name]);
  }
  /*smsverify(f) {
    var numbers = new RegExp(/^[0-9]+$/);
    if (f.smscode.trim()) {
      if (numbers.test(f.smscode)) {
        f.phone_number = this.phone_number
        f.usercode = this.usernameForegetPass
        this.service.checkotp(f).subscribe(resp=>{
          console.log(resp);
          if (resp == "111") 
          {
            this.ispass = true
            this.step1 = false;
            this.step2 = false;
            this.step3 = true;
            this.step4 = false;
            this.step5 = false;
  
          }else if(resp == "222"){
            this.showmsgforgetpass2 = true
            this.msgforgetpass2 = "code is invalid"
          }
         
        })
      } else {
        this.showmsgforgetpass2 = true
        this.msgforgetpass2 = "code is invalid"
      }
    }
    else {
      this.showmsgforgetpass2 = true
      this.msgforgetpass2 = "Please type the SMS code"
    }
  }*/
  /**sss */
  resetpassword(f) {
    console.log(f.password1)
    console.log(f.password2)
    var passwordExp = new RegExp(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[@?!.,:*=$&_])(?=[^A-Z]*[A-Z]).{8,}$/);
    this.errorarrayresetP = []
    this.validresetP = true

    //Check Fields If Empty
    if (!f.password1.trim()) {
      this.errorarrayresetP.push("Password")
      this.validresetP = false
    }

    if (!f.Password2.trim()) {
      this.errorarrayresetP.push("Confirmation Password")
      this.validresetP = false
    }

    //check Condition if respected
    if (this.validresetP) {
      if (!passwordExp.test(f.password1)) {
        this.errorarrayresetP = []
        this.validresetP = true
        this.msgarrayresetP = true
        this.errorarrayresetP.push("password must be at least 8 characters and contain a number and an uppercase and lowercase letters ")
        this.validresetP = false
      } else if (!(f.Password2 === f.password1)) {
        this.errorarrayresetP.push("Password confirmation must match Password")
        this.validresetP = false
      }
    }

    if (this.validresetP) {
      console.log(f);
      f.usercode = this.usernameForegetPass
      f.password = this.passwordForegetPass
      this.service.updatepassword(f).subscribe(resp => {
        console.log(resp);
        if (resp == "111") {
          console.log("successPass")
          this.step1 = false;
          this.step2 = false;
          this.step3 = false;
          this.step4 = true;
          this.step5 = false;
          this.router.navigateByUrl("/successPass");//+++
          this.openff()

        } else if (resp == "444") {
          console.log("Username / phone number invalid")
          this.msgstep4 = "Username / phone number invalid"
          this.msgarrayresetP = true
          this.showmsgstep3 = true
        }
        else if (resp == "222") {
          console.log("Please enter new password");
          this.msgarrayresetP = true
          this.errorarrayresetP.push("Please enter new password");
          // this.msgstep4 = "please Enter new password"
          this.showmsgstep3 = true
        }
      })
    } else {
      this.msgarrayresetP = true
    }



    /*this.ispass = true
    this.step1 = false;
    this.step2 = false;
    this.step3 = false;
    this.step4 = true;
    this.step5 = false;
    //++++
    this.router.navigateByUrl("/successPass");
  } else {
    this.msgarrayresetP = true
  }*/
  }
  public businessRegNoInput: string;
  public dateOfIncInput: string;

  stepPassword : boolean = false;
  inValidInfos : boolean = false;
   resetPasswordReq = new ResetPasswordRequest();

  checkValidInfos(){
    this.resetPasswordReq.businessRegNo= this.businessRegNoInput;
    this.resetPasswordReq.dateOfInc = this.dateOfIncInput;
    this.resetPasswordReq.userName = this.usernameForegetPass;
    console.log("REQUEST IS => USERNAME : "+ this.resetPasswordReq.userName
    +" Business Reistration Number : "+ this.resetPasswordReq.businessRegNo
    +" Date of incorporation : "+ this.resetPasswordReq.dateOfInc)
    this.service.checkValidInfosToResetPassword(this.resetPasswordReq).subscribe(response =>{
      console.log('Response Reset Password :', response);
      if (response["respCode"] == "000") {
        console.log('Infos checked Successfully');
        this.stepPassword=true;
          }
          else{
            console.log('Infos checked but not correct ')
            this.inValidInfos = true;
            this.stepPassword=false;
          } 
    })
  }

}

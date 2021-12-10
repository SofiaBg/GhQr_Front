import { JwtHelperService } from '@auth0/angular-jwt';
import { Component, OnInit, Type } from '@angular/core';
import { Router } from '@angular/router';
import { GipService } from "../services/gip.service";
import { CommonUserService } from "../services/CommonUserService";
///forgot pass
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
//---import { Constant } from "../services/Constant";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
//+++
export class NgbdModalConfirmAutofocus {
  constructor(public modal: NgbActiveModal) { }
}

const MODALS: { [name: string]: Type<any> } = {
  autofocus: NgbdModalConfirmAutofocus
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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
  errorarrayresetP: any;

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


  //Block user
  nbrAccess: number = 3;

  constructor(private service: GipService, private router: Router, private _modalService: NgbModal, config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }


  destroy = new Subject();
  showDialog = false;
  timer: number;
  dialog = 'stay logged in?';
  notice = 'session expired';
  showNotice = false;

  rxjsTimer = timer(1000, 1000);

  ngOnInit() {

    

  }

  signUp() {
    this.router.navigateByUrl("/signUp")
  }

  stringJson: any;

  stringObject: any;
  onLogin(f) {
    this.hide = true;
    console.log(f)
    if (!f.username.trim() || !f.password.trim()) {
      // if(!f.username.isEmpty() || !f.password.isEmpty()){
      console.log("gfds " + f.username)
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
          localStorage.setItem('name', 'ADMINISTRATOR');//++
          // localStorage.setItem('idAccount','2c81310d-3456-470b-9aca-242f9f013112')
          console.log("ussssssserrrrr", localStorage.getItem)
          this.router.navigateByUrl("/merchant");
          localStorage.setItem('role', 'ADMIN');//++

         



        /* this.Errpass= false;
       this.valid= true;*/}
        else if (this.service.isSuperAdmin()) {
          localStorage.setItem('user', this.username.toString());//++
          localStorage.setItem('name', 'SUPER ADMINISTRATOR');//++
          console.log("ussssssserrrrr", localStorage.getItem)
          this.router.navigateByUrl("/adminList");
          localStorage.setItem('role', 'SUPERADMIN');
        }
        else {

          console.log("he is in " + this.username)

          this.service.getIdAccount(this.username).subscribe(

            resp => {

              console.log("return id account sucsess and here is response bellow")
              console.log(resp);
              //   this.secure= data['secure']

              this.idAccount = resp['idAccount'];
              console.log("this.idAccount" + this.idAccount);

              this.service.saveIdAccount(this.idAccount)
              console.log("this.idAccount" + this.idAccount)
              localStorage.setItem('user', JSON.stringify({ login: this.model.username }));//++
              let decodedToken = new JwtHelperService().decodeToken(jwt);
              localStorage.setItem('name', decodedToken.name);//++
              localStorage.setItem('role', 'USER');//++
              console.log("ussssssserrrrr", localStorage.getItem)
              this.router.navigateByUrl("/merchantTrans");
              // this.Errpass= false;
              // this.valid= true;
            }
            , error => {
              this.nbrAccess = this.nbrAccess - 1;
              console.log("not return id account !!!")
              this.router.navigateByUrl("/login")
            }
          )
            , error => {
              this.nbrAccess = this.nbrAccess - 1;
              console.log("Wrong username or password - SAFIA - !!!")
              this.router.navigateByUrl("/login")
            }

        }

        //if(this.service.isAdmin()==false){
        //  console.log("+++++++++++++++"+this.username)
        //   console.log(jwt)
      },
        err => {
          console.log(err.headers)

          let blocked = err.headers.get("blocked")

          if (blocked) {
            this.msg = "User is blocked";
            this.hide = false;
            console.log("user blocked");
            return;
          }

          console.log("ereur login ")
          this.msg = "Wrong username or password";
          this.hide = false;
          this.nbrAccess = this.nbrAccess - 1;
          // this.Errpass= false;


          this.mod = 1;

          /*setTimeout(()=>{    //<<<---    using ()=> syntax      
            this.hide= true;
          }, 9000);*/
        }

      )
      //  console.log("kaydooooozzz executer hadci")
      this.Errpass = false;
    }
  }



  // onLogin(f) {
  //   this.hide = true;
  //   console.log(f)
  //   if (!f.username.trim() || !f.password.trim()) {
  //     // if(!f.username.isEmpty() || !f.password.isEmpty()){
  //     console.log("gfds" + f.username)
  //     this.Errpass = true;
  //     //--this.Errpass1=false;
  //     /* this.showmsg = true;
  //    this.msgarray = false;
  //    this.msg1 = "Username is mandatory";*/
  //     // this.valid= false;
  //     //this.hide=true;
  //   }
  //   else {
  //     this.service.login(f).subscribe(resp => {


  //       let jwt = resp.headers.get("authorization")

  //       console.log("jwt **  " + jwt)

  //       this.username = this.service.saveToken(jwt);
  //       console.log("username that we send to get id account " + this.username)
  //       if (this.service.isAdmin()) {
  //         // this.router.navigateByUrl("/customer");
  //         // Vérifier que login/mdp sont correctes, par exemple par une requête à un service REST
  //         localStorage.setItem('user', JSON.stringify({ login: this.model.username }));//++
  //         localStorage.setItem('name', 'ADMINISTRATOR');//++
  //         console.log("ussssssserrrrr", localStorage.getItem)
  //         this.router.navigateByUrl("/merchant");
  //         localStorage.setItem('role', 'ADMIN');//++
  //       /* this.Errpass= false;
  //      this.valid= true;*/}
  //       else if (this.service.isSuperAdmin()) {
  //         localStorage.setItem('user', this.username.toString());//++
  //         localStorage.setItem('name', 'SUPER ADMINISTRATOR');//++
  //         console.log("ussssssserrrrr", localStorage.getItem)
  //         this.router.navigateByUrl("/adminList");
  //         localStorage.setItem('role', 'SUPERADMIN');
  //       }
  //       else {

  //         console.log("he is in " + this.username)

  //         this.service.getIdAccount(this.username).subscribe(

  //           resp => {

  //             console.log("return id account sucsess and here is response bellow")
  //             console.log(resp);
  //             //   this.secure= data['secure']

  //             this.idAccount = resp['idAccount'];
  //             console.log("this.idAccount" + this.idAccount);

  //             this.service.saveIdAccount(this.idAccount)
  //             console.log("this.idAccount" + this.idAccount)
  //             localStorage.setItem('user', JSON.stringify({ login: this.model.username }));//++
  //             let decodedToken = new JwtHelperService().decodeToken(jwt);
  //             localStorage.setItem('name', decodedToken.name);//++
  //             localStorage.setItem('role', 'USER');//++
  //             console.log("ussssssserrrrr", localStorage.getItem)
  //             this.router.navigateByUrl("/merchantTrans");
  //             // this.Errpass= false;
  //             // this.valid= true;
  //           }
  //           , error => {
  //             this.nbrAccess = this.nbrAccess - 1;
  //             console.log("not return id account !!!")
  //             this.router.navigateByUrl("/login")
  //           }
  //         )
  //         , error => {
  //           this.nbrAccess = this.nbrAccess - 1;
  //           console.log("Wrong username or password - SAFIA - !!!")
  //           this.router.navigateByUrl("/login")
  //         }

  //       }

  //       //if(this.service.isAdmin()==false){
  //       //  console.log("+++++++++++++++"+this.username)
  //       //   console.log(jwt)
  //     },
  //       err => {
  //         console.log(err.headers)

  //         let blocked = err.headers.get("blocked")

  //         if (blocked) {
  //           this.msg = "User is blocked";
  //           this.hide = false;
  //           console.log("user blocked");
  //           return;
  //         }

  //         console.log("ereur login ")
  //         this.msg = "Wrong username or password";
  //         this.hide = false;
  //         this.nbrAccess = this.nbrAccess - 1;
  //         // this.Errpass= false;


  //         this.mod = 1;

  //         /*setTimeout(()=>{    //<<<---    using ()=> syntax      
  //           this.hide= true;
  //         }, 9000);*/
  //       }

  //     )
  //     //  console.log("kaydooooozzz executer hadci")
  //     this.Errpass = false;
  //   }
  // }





  onRegister() {

    this.router.navigateByUrl("/addMerchant")

  }
  //+++++++++++++++++++++++Forgot pass
  openf(contentf) {
    console.log("test");

    if (this.usernameForegetPass == null || this.usernameForegetPass.value == "") {
      this.msg1 = "Please enter your username";
      this.showmsg = true;
    }

    if (this.usernameForegetPass.trim()) {
      console.log(this.usernameForegetPass.trim());

      this.router.navigateByUrl("/forgotPass");
      /* this.modalService.open(contentf,
         {
           ariaLabelledBy: 'modal-basic-title',
           size: 'lg',
           windowClass: 'custom-class'
         });*/
      console.log("test123");
    } else {
      this.showmsg = true
      this.msgarray = false;
      this.msg1 = "Username is mandatory"
    }

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
    //this.router.navigateByUrl("/login");
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
  //+++
  GETID(e) {
    console.log("username" + e);
    this.usernameForegetPass = e.trim();
    localStorage.setItem("forgotpass", this.usernameForegetPass);

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

  resetpassword(f) {
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
        this.errorarrayresetP.push("password must be at least 8 characters and contain a number and an uppercase and lowercase letters ")
        this.validresetP = false
      } else if (!(f.Password2 === f.password1)) {
        this.errorarrayresetP.push("Password confirmation must match Password")
        this.validresetP = false
      }
    }

    if (this.validresetP) {
      console.log(f);
      this.ispass = true
      this.step1 = false;
      this.step2 = false;
      this.step3 = false;
      this.step4 = true;
      this.step5 = false;
    } else {
      this.msgarrayresetP = true
    }
  }
  //+++++++++++forgot login
  openg(contentf) {
    console.log("test");

    if (this.usernameForegetPass.trim()) {
      console.log(this.usernameForegetPass.trim());

      this.router.navigateByUrl("/forgotLogin");
      /* this.modalService.open(contentf,
         {
           ariaLabelledBy: 'modal-basic-title',
           size: 'lg',
           windowClass: 'custom-class'
         });*/
      console.log("test123");
    } else {
      this.showmsg = true
      this.msgarray = false;
      this.msg1 = "Username is mandatory"
    }

  }
  //++++++++++++++++++++++++
  forgertLogin(f) {
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


}

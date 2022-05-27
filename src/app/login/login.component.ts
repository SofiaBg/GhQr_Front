import { JwtHelperService } from "@auth0/angular-jwt";
import { Component, OnInit, Type } from "@angular/core";
import { Router } from "@angular/router";
import { GipService } from "../services/gip.service";
import { CommonUserService } from "../services/CommonUserService";
///forgot pass
import {
  NgbActiveModal,
  NgbModal,
  NgbModalConfig,
} from "@ng-bootstrap/ng-bootstrap";
//---import { Constant } from "../services/Constant";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Subject, timer } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { MerchantTransactionsComponent } from "../merchant-transactions/merchant-transactions.component";
//+++

export class NgbdModalConfirmAutofocus {
  constructor(public modal: NgbActiveModal) {}
}

const MODALS: { [name: string]: Type<any> } = {
  autofocus: NgbdModalConfirmAutofocus,
};

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  mod: number = 0;
  username: String;
  msg: String;
  msg1: String;
  hide: boolean = true;
  model: any = {}; //+++

  idAccount: string;
  Errpass: boolean = false; //+++
  Errpass1: boolean = false; //+++
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
  valid1: Boolean = true; //---changer flcode valid1
  msgarray: Boolean = false;
  errorarray: any;

  //Block user
  nbrAccess: number = 3;

  constructor(
    private service: GipService,
    private router: Router,
    private _modalService: NgbModal,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {
    config.backdrop = "static";
    config.keyboard = false;
  }

  destroy = new Subject();
  showDialog = false;
  timer: number;
  dialog = "stay logged in?";
  notice = "session expired";
  showNotice = false;

  resetPassword: boolean = false;
  rxjsTimer = timer(1000, 1000);

  
 
  ngOnInit() {
    this.getAparamSession(this.id);
  }
  showEye: boolean = false;
  password;


  passwordField : boolean ;
  togglePasswordTextType() {
    this.passwordField = !this.passwordField;
  }

  // onClick() {
  //   if (this.password === "password") {
  //     this.password = "text";
  //     this.showEye = true;
  //   } else {
  //     this.password = "password";
  //     this.showEye = false;
  //   }
  // }

  validcondition: boolean;
  errorarraycondtion: boolean;
  Errpass4: boolean;
  Errpass3: boolean;
  paramPass: string;
  paramPass1: string;
  paramPass2: string;
  valid2: boolean;

  MerchantParamToken1(paramPass, paramPass1, paramPass2) {
    paramPass2 = this.password;
    console.log("PASSWORD " + this.password);
    console.log("PASSWORD " + this.paramPass2);
    console.log(
      "Password " +
        paramPass +
        " this.idAccount " +
        this.idAccount +
        " this.paramPass1 " +
        this.paramPass1 +
        " this.paramPass2 " +
        this.paramPass2 +
        " "
    );

    if (paramPass == null || paramPass1 == null || paramPass2 == null) {
      this.Errpass3 = true;
      this.Errpass1 = false;
      this.valid1 = false;
    } else {
      console.log(
        "Password " +
          paramPass +
          " this.userName " +
          this.username +
          " this.paramPass1 " +
          this.paramPass1 +
          " this.paramPass2 " +
          this.paramPass2 +
          " "
      );
      console.log("MerchantParamToken1 " + this.username);
      // this.service.MparamPass1( paramPass2, localStorage.getItem('user')).subscribe(data=>{
      // this.service
      //   .resetPasswordF(this.paramPass2, localStorage.getItem("idAccount"))
      //   .subscribe(
      //     (data) => {
      //       console.log(
      //         "-----------------------------------------------------------------"
      //       );
            // console.log(data);
            this.valid2 = true;
            this.valid1 = false;
            this.Errpass4 = false;
            this.Errpass3 = false;
            this.Errpass1 = false;
            var numbers = new RegExp(/^[0-9]+$/);
            var passwordExp = new RegExp(
              /^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[@?!.,:*=$&_])(?=[^A-Z]*[A-Z]).{8,}$/
            );
            this.errorarraycondtion = false;
            this.validcondition = true;
            if (!passwordExp.test(paramPass)) {
              this.errorarraycondtion = true;
              this.validcondition = false;
              console.log("mtdozch");
            } else {
              /*SAFIA */
              // this.service.MparamPass( paramPass, paramPass1, paramPass2, localStorage.getItem('user')).subscribe(data=>{
              this.service
                .resetPasswordFirstConnection(
                  paramPass2,
                  paramPass1,
                  this.password,
                  localStorage.getItem("forgotpass")
                )
                .subscribe(
                  (data) => {
                    console.log(
                      "-----------------------------------------------------------------"
                    );
                    console.log(data);
                    console.log("user", localStorage.getItem("forgotpass"));
                    this.valid1 = true;
                    this.Errpass3 = false;
                    this.Errpass1 = false;
                    this.Errpass4 = false;
                    this.errorarraycondtion = false;
                    this.validcondition = true;
                  },
                  (err) => {
                    this.Errpass1 = true;
                    this.Errpass3 = false;
                    this.valid1 = false;
                    console.log(err);

                    console.log("erreur password ");
                    console.log(
                      "erreur password1 " + paramPass + "" + paramPass1
                    );
                  }
                );
            }
          }
          // ,
          // (err) => {
          //   this.Errpass1 = false;
          //   this.Errpass4 = true;
          //   this.Errpass3 = false;
          //   this.valid1 = false;
          //   this.valid2 = false;
          //   console.log(err);

          //   console.log("erreur password ");
          //   console.log("erreur oldpassword1 " + paramPass + "" + paramPass2);
          // }
        // );
    // }
  }
  // getUserInfos(){
  //   console.log('+++++ USER INFORMATIONS +++++'+ this.username)
  //   this.service.getUserInfos(this.username).subscribe(data =>{
  //     console.log(data);
  //   })
  // }

  signUp() {
    this.router.navigateByUrl("/signUp");
  }

  stringJson: any;

  stringObject: any;

  checkValidCredentials(username, password){
    this.service.checkValidCredentials(username,password).subscribe(response =>{
      console.log('CBG API RESPONSE     ', response)
      if (response["respCode"] == "000") {
        this.isValid=true;
          }
          else{
            this.isValid=false;
          }     
         })
  }
  onLogin(f) {
    // this.password=f.password
    f.password = this.password
    this.username=f.username
    this.hide = true;
    console.log(f);

    // console.log("+++++ USER INFORMATIONS +++++" + f.username);
    // this.service.getUserInfos(f.username).subscribe((data) => {
    //   console.log("+++++ USER INFORMATIONS +++++" + data);
    // });

    console.log('TEST 1')
    if (!f.username.trim() || !f.password.trim()) {
      // if(!f.username.isEmpty() || !f.password.isEmpty()){
      console.log("gfds " + f.username);
      this.Errpass = true;
      //--this.Errpass1=false;
      /* this.showmsg = true;
     this.msgarray = false;
     this.msg1 = "Username is mandatory";*/
      // this.valid= false;
      //this.hide=true;
    } else {
      this.service.login(f).subscribe(
        (resp) => {
          console.log('RESPONSE   ')
          console.log(resp);
          console.log('ERROR HEADERS ',resp.headers);
          console.log('ERROR HEADERS ',resp.headers.get("blocked"));

          let blocked = resp.headers.get("blocked");
          // let resetPassword = resp.headers.get("isReset");

          // console.log(
          //   "************RESET PASSWORD *************     " + resetPassword
          // );

          //this.checkValidCredentials(f.username, f.password);
          if(this.isValid == false){
            this.msg = "Invalid username"
          }
          if (blocked == "blocked") {
            this.msg = "User is blocked";
            this.hide = false;
            console.log("user blocked");
            return;
          } 
           if (blocked == "firstC") {
            console.log("Reset Password");
            this.msg = "Please reset your password !";
            this.hide = false;
            console.log("RESET PASSWORD POPUP",this.resetPassword);
            this.resetPassword = true;
            this.openFirstConnection(f);
            console.log("Reset Password");
            console.log("RESET PASSWORD POPUP",this.resetPassword);
            return; 
          }
          else{
            console.log("ereur login ")
                    this.msg = "Wrong login or password";
                    this.hide = false;
                    this.nbrAccess = this.nbrAccess - 1;
          } 

          console.log('RESPONSE   '+ resp)
          console.log('ERROR HEADERS ',resp.headers);

          let jwt = resp.headers.get("authorization");

          console.log("jwt **  " + jwt);

          this.username = this.service.saveToken(jwt);
          console.log(
            "username that we send to get id account " + this.username
          );
          // JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]))["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
          // console.log('RELE :'+ JSON.parse(window.atob(localStorage.getItem('userToken').split('.')[1]))["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])
          if (this.service.isAdmin()) {
            // this.router.navigateByUrl("/customer");
            // Vérifier que login/mdp sont correctes, par exemple par une requête à un service REST
            localStorage.setItem(
              "user",
              JSON.stringify({ login: this.model.username })
            ); //++
            localStorage.setItem("name", "ADMINISTRATOR"); //++
            // localStorage.setItem('idAccount','2c81310d-3456-470b-9aca-242f9f013112')
            console.log("ussssssserrrrr", localStorage.getItem);
            this.router.navigateByUrl("/adminList");
            localStorage.setItem("role", "ADMIN"); //++

            this.service
              .findAccountId(localStorage.getItem("forgotpass"))
              .subscribe((data) => {
                console.log("DATA ", data);

                // Convert String obect to JSON
                this.stringJson = JSON.stringify(data);
                this.stringObject = JSON.parse(this.stringJson);
                console.log("JSON object -", this.stringObject);
                console.log(this.stringObject.accountId);
                localStorage.setItem("idAccount", this.stringObject.accountId);
              });
          } else if (this.service.isOfficier()) {
            localStorage.setItem(
              "user",
              JSON.stringify({ login: this.model.username })
            ); //++
            localStorage.setItem("name", "OFFICIER"); //++
            // console.log("ussssssserrrrr", localStorage.getItem);
            this.router.navigateByUrl("/merchant");
            localStorage.setItem("role", "OFFICIER"); //++

            this.service
              .findAccountId(localStorage.getItem("forgotpass"))
              .subscribe((data) => {
                console.log("DATA ", data);

                this.stringJson = JSON.stringify(data);
                this.stringObject = JSON.parse(this.stringJson);
                console.log("JSON object -", this.stringObject);
                console.log(this.stringObject.accountId);
                localStorage.setItem("idAccount", this.stringObject.accountId);
              });
          } else if (this.service.isBranchOfficier()) {
            localStorage.setItem(
              "user",
              JSON.stringify({ login: this.model.username })
            ); //++
            localStorage.setItem("name", "BRANCH OFFICIER"); //++
            // console.log("ussssssserrrrr", localStorage.getItem);
            this.router.navigateByUrl("/createSingleBulkMerchant");
            localStorage.setItem("role", "BRANCH OFFICIER"); //++

            this.service
              .findAccountId(localStorage.getItem("forgotpass"))
              .subscribe((data) => {
                console.log("DATA ", data);

                this.stringJson = JSON.stringify(data);
                this.stringObject = JSON.parse(this.stringJson);
                console.log("JSON object -", this.stringObject);
                console.log(this.stringObject.accountId);
                localStorage.setItem("idAccount", this.stringObject.accountId);
              });
          } else if (this.service.isManager()) {
            localStorage.setItem(
              "user",
              JSON.stringify({ login: this.model.username })
            ); //++
            localStorage.setItem("name", "MANAGER"); //++
            // console.log("ussssssserrrrr", localStorage.getItem);
            this.router.navigateByUrl("/merchantList");
            localStorage.setItem("role", "MANAGER"); //++

            this.service
              .findAccountId(localStorage.getItem("forgotpass"))
              .subscribe((data) => {
                console.log("DATA ", data);

                this.stringJson = JSON.stringify(data);
                this.stringObject = JSON.parse(this.stringJson);
                console.log("JSON object -", this.stringObject);
                console.log(this.stringObject.accountId);
                localStorage.setItem("idAccount", this.stringObject.accountId);
              });
          } else if (this.service.isBranchManager()) {
            localStorage.setItem(
              "user",
              JSON.stringify({ login: this.model.username })
            ); //++
            localStorage.setItem("name", "BRANCH MANAGER"); //++
            // console.log("ussssssserrrrr", localStorage.getItem);
            this.router.navigateByUrl("/getAllBulkMerchantsFoValidation");
            localStorage.setItem("role", "BRANCH MANAGER"); //++

            this.service
              .findAccountId(localStorage.getItem("forgotpass"))
              .subscribe((data) => {
                console.log("DATA ", data);

                this.stringJson = JSON.stringify(data);
                this.stringObject = JSON.parse(this.stringJson);
                console.log("JSON object -", this.stringObject);
                console.log(this.stringObject.accountId);
                localStorage.setItem("idAccount", this.stringObject.accountId);
              });
          } else if (this.service.isSubUser()) {
            localStorage.setItem(
              "user",
              JSON.stringify({ login: this.model.username })
            ); //++
            localStorage.setItem("name", "SUB USER"); //++
            // console.log("ussssssserrrrr", localStorage.getItem);
            this.router.navigateByUrl("/transactions");
            localStorage.setItem("role", "SUB USER"); //++

            this.service
              .findAccountId(localStorage.getItem("forgotpass"))
              .subscribe((data) => {
                console.log("DATA ", data);

                this.stringJson = JSON.stringify(data);
                this.stringObject = JSON.parse(this.stringJson);
                console.log("JSON object -", this.stringObject);
                console.log(this.stringObject.accountId);
                localStorage.setItem("idAccount", this.stringObject.accountId);
              });
          } else if (this.service.isUser()) {
            this.hide=true
            console.log("he is in " + this.username);

            this.service.getIdAccount(this.username).subscribe(
              (resp) => {
                console.log(
                  "return id account sucsess and here is response bellow"
                );
                console.log(resp);
                //   this.secure= data['secure']

                this.idAccount = resp["idAccount"];
                console.log("this.idAccount" + this.idAccount);

                this.service.saveIdAccount(this.idAccount);
                console.log("this.idAccount" + this.idAccount);
                localStorage.setItem(
                  "user",
                  JSON.stringify({ login: this.model.username })
                ); //++
                console.log("JWT IS : " + jwt);
                let decodedToken = new JwtHelperService().decodeToken(jwt);
                localStorage.setItem("name", decodedToken.name); //++
                localStorage.setItem("role", "USER"); //++
                console.log("ussssssserrrrr", localStorage.getItem);
                this.router.navigateByUrl("/transactions");
                // MerchantTransactionsComponent.getInstance();
                // this.Errpass= false;
                // this.valid= true;
              },
              (error) => {
                this.nbrAccess = this.nbrAccess - 1;
                console.log("not return id account !!!");
                this.router.navigateByUrl("/login");
              }
            ),
              (error) => {
                this.nbrAccess = this.nbrAccess - 1;
                console.log("Wrong login or password - SAFIA - !!!");
                this.router.navigateByUrl("/login");
              };
          }
        },
        (err) => {
          console.log("ereur login ")
          this.msg = "Wrong login or password";
          this.hide = false;
          this.nbrAccess = this.nbrAccess - 1;
          
          console.log('ERROR HEADERS ',err.headers);
          console.log('ERROR HEADERS ',err.headers.get("blocked"));

          let blocked = err.headers.get("blocked");
          let resetPassword = err.headers.get("isReset");

          console.log(
            "************RESET PASSWORD *************     " + resetPassword
          );

          if (blocked.equals("blocked")) {
            this.msg = "User is blocked";
            this.hide = false;
            console.log("user blocked");
            return;
          } 
           if (resetPassword) {
            console.log("Reset Password");
            this.msg = "Please reset your password !";
            this.hide = false;
            this.resetPassword = true;
            console.log("Reset Password");
            return;
          } 
          
            console.log("ereur login ");
            this.msg = "Wrong login or password";
            this.hide = false;
            // this.nbrAccess = this.nbrAccess - 1;
            // this.Errpass= false;

            this.mod = 1;
          
          /*setTimeout(()=>{    //<<<---    using ()=> syntax      
            this.hide= true;
          }, 9000);*/
        }
      );
      //  console.log("kaydooooozzz executer hadci")
      this.Errpass = false;
    }
  }

  // onLogin(f) {
  //   this.hide = true;
  //   console.log(f);
  //   if (!f.username.trim() || !f.password.trim()) {
  //     // if(!f.username.isEmpty() || !f.password.isEmpty()){
  //     console.log("gfds " + f.username);
  //     this.Errpass = true;
  //     //--this.Errpass1=false;
  //     /* this.showmsg = true;
  //    this.msgarray = false;
  //    this.msg1 = "Username is mandatory";*/
  //     // this.valid= false;
  //     //this.hide=true;
  //   } else {
  //     this.service.login(f).subscribe(
  //       (resp) => {
  //         let jwt = resp.headers.get("authorization");

  //         console.log("jwt **  " + jwt);

  //         this.username = this.service.saveToken(jwt);
  //         console.log(
  //           "username that we send to get id account " + this.username
  //         );
  //         // JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]))["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
  //         // console.log('RELE :'+ JSON.parse(window.atob(localStorage.getItem('userToken').split('.')[1]))["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])
  //         if (this.service.isAdmin()) {
  //           // this.router.navigateByUrl("/customer");
  //           // Vérifier que login/mdp sont correctes, par exemple par une requête à un service REST
  //           localStorage.setItem(
  //             "user",
  //             JSON.stringify({ login: this.model.username })
  //           ); //++
  //           localStorage.setItem("name", "ADMINISTRATOR"); //++
  //           // localStorage.setItem('idAccount','2c81310d-3456-470b-9aca-242f9f013112')
  //           console.log("ussssssserrrrr", localStorage.getItem);
  //           this.router.navigateByUrl("/merchant");
  //           localStorage.setItem("role", "ADMIN"); //++

  //           this.service
  //             .findAccountId(localStorage.getItem("forgotpass"))
  //             .subscribe((data) => {
  //               console.log("DATA ", data);

  //               // Convert String obect to JSON
  //               this.stringJson = JSON.stringify(data);
  //               this.stringObject = JSON.parse(this.stringJson);
  //               console.log("JSON object -", this.stringObject);
  //               console.log(this.stringObject.accountId);
  //               localStorage.setItem("idAccount", this.stringObject.accountId);
  //             });
  //         }
  //         else  if (this.service.isOfficier) {
  //           localStorage.setItem('user', JSON.stringify({ login: this.model.username }));//++
  //           localStorage.setItem('name', 'OFFICIER');//++
  //           console.log("ussssssserrrrr", localStorage.getItem)
  //           this.router.navigateByUrl("/merchant");
  //           localStorage.setItem('role', 'OFFICIER');//++

  //           this.service.findAccountId(localStorage.getItem('forgotpass')).subscribe(data => {

  //             console.log('DATA ', data);

  //             this.stringJson = JSON.stringify(data);
  //             this.stringObject = JSON.parse(this.stringJson);
  //             console.log("JSON object -", this.stringObject);
  //             console.log(this.stringObject.accountId)
  //             localStorage.setItem('idAccount', this.stringObject.accountId);
  //           });

  //         }else  if (this.service.isBranchOfficier) {

  //           localStorage.setItem('user', JSON.stringify({ login: this.model.username }));//++
  //           localStorage.setItem('name', 'BRANCH OFFICIER');//++
  //           console.log("ussssssserrrrr", localStorage.getItem)
  //           this.router.navigateByUrl("/bulkMerchants");
  //           localStorage.setItem('role', 'BRANCH OFFICIER');//++

  //           this.service.findAccountId(localStorage.getItem('forgotpass')).subscribe(data => {

  //             console.log('DATA ', data);

  //             this.stringJson = JSON.stringify(data);
  //             this.stringObject = JSON.parse(this.stringJson);
  //             console.log("JSON object -", this.stringObject);
  //             console.log(this.stringObject.accountId)
  //             localStorage.setItem('idAccount', this.stringObject.accountId);
  //           });

  //         }
  //         else if (this.service.isManager) {
  //           localStorage.setItem(
  //             "user",
  //             JSON.stringify({ login: this.model.username })
  //           ); //++
  //           localStorage.setItem("name", "MANAGER"); //++
  //           console.log("ussssssserrrrr", localStorage.getItem);
  //           this.router.navigateByUrl("/merchant");
  //           localStorage.setItem("role", "MANAGER"); //++

  //           this.service
  //             .findAccountId(localStorage.getItem("forgotpass"))
  //             .subscribe((data) => {
  //               console.log("DATA ", data);

  //               this.stringJson = JSON.stringify(data);
  //               this.stringObject = JSON.parse(this.stringJson);
  //               console.log("JSON object -", this.stringObject);
  //               console.log(this.stringObject.accountId);
  //               localStorage.setItem("idAccount", this.stringObject.accountId);
  //             });
  //         }
  //         else if (this.service.isBranchManager) {
  //           localStorage.setItem(
  //             "user",
  //             JSON.stringify({ login: this.model.username })
  //           ); //++
  //           localStorage.setItem("name", "MANAGER"); //++
  //           console.log("ussssssserrrrr", localStorage.getItem);
  //           this.router.navigateByUrl("/merchantList");
  //           localStorage.setItem("role", "BRANCH MANAGER"); //++

  //           this.service
  //             .findAccountId(localStorage.getItem("forgotpass"))
  //             .subscribe((data) => {
  //               console.log("DATA ", data);

  //               this.stringJson = JSON.stringify(data);
  //               this.stringObject = JSON.parse(this.stringJson);
  //               console.log("JSON object -", this.stringObject);
  //               console.log(this.stringObject.accountId);
  //               localStorage.setItem("idAccount", this.stringObject.accountId);
  //             });
  //         } else if (this.service.isUser) {
  //           console.log("he is in " + this.username);

  //           this.service.getIdAccount(this.username).subscribe(
  //             (resp) => {
  //               console.log(
  //                 "return id account sucsess and here is response bellow"
  //               );
  //               console.log(resp);
  //               //   this.secure= data['secure']

  //               this.idAccount = resp["idAccount"];
  //               console.log("this.idAccount" + this.idAccount);

  //               this.service.saveIdAccount(this.idAccount);
  //               console.log("this.idAccount" + this.idAccount);
  //               localStorage.setItem(
  //                 "user",
  //                 JSON.stringify({ login: this.model.username })
  //               ); //++
  //               console.log("JWT IS : " + jwt);
  //               let decodedToken = new JwtHelperService().decodeToken(jwt);
  //               localStorage.setItem("name", decodedToken.name); //++
  //               localStorage.setItem("role", "USER"); //++
  //               console.log("ussssssserrrrr", localStorage.getItem);
  //               // this.router.navigateByUrl("/merchantTrans");
  //               MerchantTransactionsComponent.getInstance();
  //               // this.Errpass= false;
  //               // this.valid= true;
  //             },
  //             (error) => {
  //               this.nbrAccess = this.nbrAccess - 1;
  //               console.log("not return id account !!!");
  //               this.router.navigateByUrl("/login");
  //             }
  //           ),
  //             (error) => {
  //               this.nbrAccess = this.nbrAccess - 1;
  //               console.log("Wrong login or password - SAFIA - !!!");
  //               this.router.navigateByUrl("/login");
  //             };
  //         }

  //         /* this.Errpass= false;
  //      this.valid= true;*/
  //         // else if (this.service.isSuperAdmin()) {
  //         //   localStorage.setItem('user', this.username.toString());//++
  //         //   localStorage.setItem('name', 'SUPER ADMINISTRATOR');//++
  //         //   console.log("ussssssserrrrr", localStorage.getItem)
  //         //   this.router.navigateByUrl("/adminList");
  //         //   localStorage.setItem('role', 'SUPERADMIN');

  //         //   this.service.findAccountId(localStorage.getItem('user')).subscribe(data => {

  //         //     console.log('DATA ', data);

  //         //     // Convert String obect to JSON
  //         //     this.stringJson = JSON.stringify(data);
  //         //     this.stringObject = JSON.parse(this.stringJson);
  //         //     console.log("JSON object -", this.stringObject);
  //         //     console.log(this.stringObject.accountId)
  //         //     localStorage.setItem('idAccount', this.stringObject.accountId);

  //         //   });
  //         // }
  //         // else

  //         // else

  //         // else

  //         // else

  //         //if(this.service.isAdmin()==false){
  //         //  console.log("+++++++++++++++"+this.username)
  //         //   console.log(jwt)
  //       },
  //       (err) => {
  //         console.log(err.headers);

  //         let blocked = err.headers.get("blocked");

  //         if (blocked) {
  //           this.msg = "User is blocked";
  //           this.hide = false;
  //           console.log("user blocked");
  //           return;
  //         }

  //         console.log("ereur login ");
  //         this.msg = "Wrong login or password";
  //         this.hide = false;
  //         this.nbrAccess = this.nbrAccess - 1;
  //         // this.Errpass= false;

  //         this.mod = 1;

  //         /*setTimeout(()=>{    //<<<---    using ()=> syntax
  //           this.hide= true;
  //         }, 9000);*/
  //       }
  //     );
  //     //  console.log("kaydooooozzz executer hadci")
  //     this.Errpass = false;
  //   }
  // }

  getAparamSession(id) {
    console.log(" id " + id);
    this.service.getAparamSession(id).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log("erreur token ");
      }
    );
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

  phoneForegetPass: any;
  phone: boolean = false;

  stepOtp: boolean = false;
  dataOtp: any;

  openff() {
    if (
      this.usernameForegetPass == null ||
      this.usernameForegetPass.value == ""
    ) {
      this.msg1 = "Please enter your username";
      this.showmsg = true;
    }
    console.log("test");

    // if (this.step2 == true) {
    //--console.log(this.usernameForegetPass.trim());

    this.router.navigateByUrl("/resetPass");
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

  onRegister() {
    this.router.navigateByUrl("/addMerchant");
  }
  //+++++++++++++++++++++++Forgot pass
  passwordForegetPass: any;
  showmsgstep3: Boolean = false;
  msgstep4: any;


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
      f.usercode = this.usernameForegetPass
      f.password = this.passwordForegetPass
      this.service.updatepassword(f).subscribe(resp=>{
        console.log(resp);
        if (resp == "111") 
        {
          this.step1 = false;
          this.step2 = false;
          this.step3 = false;
          this.step4 = true;
          this.step5 = false;
          this.router.navigateByUrl("/successPass");//+++
          this.openff()
  
        }else if(resp == "444"){
          this.msgstep4 = "Username / phone number invalid"
          this.showmsgstep3 = true         
        }
        else if(resp == "222"){
          this.msgstep4 = "please Enter new password"
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
  openFirstConnection(contentf) {
    console.log("test");

    if (
      this.usernameForegetPass == null ||
      this.usernameForegetPass.value == ""
    ) {
      this.msg1 = "Please enter your username";
      this.showmsg = true;
    }

    if (this.usernameForegetPass.trim()) {
      console.log(this.usernameForegetPass.trim());

      console.log("USERNAME :) " + this.usernameForegetPass);
      console.log("USERNAME :) " +localStorage.getItem('forgotpass'));
      
      this.service
        .findUserByMobileNumber(localStorage.getItem('forgotpass'))
        .subscribe((data) => {
          console.log(" USERNAME FORGOT PWD" + data);

          this.stringJson = JSON.stringify(data);
          this.stringObject = JSON.parse(this.stringJson);
          console.log("JSON object -", this.stringObject);
          console.log(this.stringObject.username);
          localStorage.setItem("forgotpass", this.stringObject.username);

          this.usernameForegetPass = this.stringObject.username;
          console.log(data);
        });

      // this.router.navigateByUrl("/forgotPass");
      this.router.navigateByUrl("/resetPasswordFirstConnection");
      /* this.modalService.open(contentf,
         {
           ariaLabelledBy: 'modal-basic-title',
           size: 'lg',
           windowClass: 'custom-class'
         });*/
      console.log("test123");
    } else {
      this.showmsg = true;
      this.msgarray = false;
      this.msg1 = "Username is mandatory";
    }
  }
  
  isValid : boolean = false;
  
  openf(contentf) {
    console.log("test");

    if (
      this.usernameForegetPass == null ||
      this.usernameForegetPass.value == ""
    ) {
      this.msg1 = "Please enter your username";
      this.showmsg = true;
    }

    if (this.usernameForegetPass.trim()) {
      console.log(this.usernameForegetPass.trim());

      console.log("USERNAME :) " + this.usernameForegetPass);
      this.service
        .findUserByMobileNumber(this.usernameForegetPass)
        .subscribe((data) => {
          console.log(" USERNAME FORGOT PWD" + data);

          this.stringJson = JSON.stringify(data);
          this.stringObject = JSON.parse(this.stringJson);
          console.log("JSON object -", this.stringObject);
          console.log(this.stringObject.username);
          localStorage.setItem("forgotpass", this.stringObject.username);

          this.usernameForegetPass = this.stringObject.username;
          console.log(data);
        });

      // this.router.navigateByUrl("/forgotPass");
      this.router.navigateByUrl("/resetPass");
      /* this.modalService.open(contentf,
         {
           ariaLabelledBy: 'modal-basic-title',
           size: 'lg',
           windowClass: 'custom-class'
         });*/
      console.log("test123");
    } else {
      this.showmsg = true;
      this.msgarray = false;
      this.msg1 = "Username is mandatory";
    }
  }
  //++++++++++++++++++++++++
  forgertPassword(f) {
    this.errorarraystep1 = [];
    this.validstep1 = true;
    this.validresetP = true;

    //Check Fields If Empty
    if (!f.email.trim()) {
      this.errorarraystep1.push("Email is Required");
      this.validresetP = false;
    }
    if (!f.phone_number.trim()) {
      this.errorarraystep1.push("Phone number is Required");
      this.validresetP = false;
    }
    if (!f.customer_id.trim()) {
      this.errorarraystep1.push("Customer id is Required");
      this.validresetP = false;
    }
    if (this.validresetP) {
      var regexp = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      var numbers = new RegExp(/^[0-9]+$/);
      this.errorarraystep1 = [];
      this.validstep1 = true;

      if (!regexp.test(f.email)) {
        this.errorarraystep1.push("Please Enter A valid Email");
        this.validstep1 = false;
        console.log("email not valid");
      }
      if (f.phone_number.length < 10 || !numbers.test(f.phone_number)) {
        this.errorarraystep1.push("Please Enter a valid Phone Number");
        this.validstep1 = false;
        console.log("phone_number not valid");
      }
      console.log("this.errorarraystep1" + this.errorarraystep1);
      console.log("this.validstep1" + this.validstep1);

      if (this.validstep1) {
        console.log("good");

        f.usercode = this.usernameForegetPass;
        console.log(f);
        this.service.forgotpassword(f).subscribe((resp) => {
          console.log("######## Response Forgot Password ######" + resp);
          if (resp == "111") {
            console.log("good");

            this.step1 = false;
            this.step2 = true;
            this.step3 = false;
            this.step4 = false;
            this.step5 = false;
            this.phone_number = f.phone_number;
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
          } else if (resp == "222") {
            this.showmsgforgetpass = true;
            this.showmsgstep1 = false;
            this.msgforgetpass = "Inavalid Informations";
          } else if (resp == "333") {
            this.showmsgforgetpass = true;
            this.msgforgetpass = "Inavalid Informations ";
          }
        });
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
    this.modalService.dismissAll();
    this.ispass = false;
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
    this.errorarrayresetP = [];
    this.errorarray = [];
    this.errorarraystep1 = [];
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
  GETIDP(e) {
    console.log("password" + e);
    this.password = e.trim();
    localStorage.setItem("password", this.password);
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

  // resetpassword(f) {
  //   var passwordExp = new RegExp(
  //     /^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[@?!.,:*=$&_])(?=[^A-Z]*[A-Z]).{8,}$/
  //   );
  //   this.errorarrayresetP = [];
  //   this.validresetP = true;

  //   //Check Fields If Empty
  //   if (!f.password1.trim()) {
  //     this.errorarrayresetP.push("Password");
  //     this.validresetP = false;
  //   }

  //   if (!f.Password2.trim()) {
  //     this.errorarrayresetP.push("Confirmation Password");
  //     this.validresetP = false;
  //   }

  //   //check Condition if respected
  //   if (this.validresetP) {
  //     if (!passwordExp.test(f.password1)) {
  //       this.errorarrayresetP = [];
  //       this.validresetP = true;
  //       this.errorarrayresetP.push(
  //         "password must be at least 8 characters and contain a number and an uppercase and lowercase letters "
  //       );
  //       this.validresetP = false;
  //     } else if (!(f.Password2 === f.password1)) {
  //       this.errorarrayresetP.push("Password confirmation must match Password");
  //       this.validresetP = false;
  //     }
  //   }

  //   if (this.validresetP) {
  //     console.log(f);
  //     this.ispass = true;
  //     this.step1 = false;
  //     this.step2 = false;
  //     this.step3 = false;
  //     this.step4 = true;
  //     this.step5 = false;
  //   } else {
  //     this.msgarrayresetP = true;
  //   }
  // }
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
      this.showmsg = true;
      this.msgarray = false;
      this.msg1 = "Username is mandatory";
    }
  }
  //++++++++++++++++++++++++
  forgertLogin(f) {
    this.errorarraystep1 = [];
    this.validstep1 = true;
    this.validresetP = true;

    //Check Fields If Empty
    if (!f.email.trim()) {
      this.errorarraystep1.push("Email is Required");
      this.validresetP = false;
    }
    if (!f.phone_number.trim()) {
      this.errorarraystep1.push("Phone number is Required");
      this.validresetP = false;
    }
    if (!f.customer_id.trim()) {
      this.errorarraystep1.push("Customer id is Required");
      this.validresetP = false;
    }
    if (this.validresetP) {
      var regexp = new RegExp(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      var numbers = new RegExp(/^[0-9]+$/);
      this.errorarraystep1 = [];
      this.validstep1 = true;

      if (!regexp.test(f.email)) {
        this.errorarraystep1.push("Please Enter A valid Email");
        this.validstep1 = false;
        console.log("email not valid");
      }
      if (f.phone_number.length < 10 || !numbers.test(f.phone_number)) {
        this.errorarraystep1.push("Please Enter a valid Phone Number");
        this.validstep1 = false;
        console.log("phone_number not valid");
      }
      console.log("this.errorarraystep1" + this.errorarraystep1);
      console.log("this.validstep1" + this.validstep1);

      if (this.validstep1) {
        console.log("good");

        f.usercode = this.usernameForegetPass;
        console.log(f);
        this.service.forgotpassword(f).subscribe((resp) => {
          console.log("######## Response Forgot Password ######" + resp);
          if (resp == "111") {
            console.log("good");

            this.step1 = false;
            this.step2 = true;
            this.step3 = false;
            this.step4 = false;
            this.step5 = false;
            this.phone_number = f.phone_number;
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
          } else if (resp == "222") {
            this.showmsgforgetpass = true;
            this.showmsgstep1 = false;
            this.msgforgetpass = "Inavalid Informations";
          } else if (resp == "333") {
            this.showmsgforgetpass = true;
            this.msgforgetpass = "Inavalid Informations ";
          }
        });
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

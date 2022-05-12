import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../BaseComponent/BaseComponent';
import { GipService } from '../services/gip.service';

@Component({
  selector: 'app-passreset',
  templateUrl: './passreset.component.html',
  styleUrls: ['./passreset.component.css']
})
export class PassresetComponent extends BaseComponent implements OnInit {
  validcondition: boolean;
  errorarraycondtion: boolean;
  Errpass4: boolean;
  Errpass1: boolean;
  valid1: boolean;
  Errpass3: boolean;
  idAccount: string = localStorage.getItem('idAccount');
  paramPass: string;
  paramPass1: string;
  paramPass2: string;
  valid2: boolean;


  // stringJson: any;

  // stringObject: any;
  public step1 :boolean= false;

  constructor(private service: GipService, router : Router) {    super(router);
  }

  mb : string;
  dataOtp: any;

  sendOTP(mobileNumber) {
    console.log("***** SNED OTP *****");
    mobileNumber = this.mb;
    this.dataOtp = this.service
      .sendOtpCode(mobileNumber)
      .subscribe((data) => {
        // if(data["respCode"] == "000"){
          this.step1=true;
          this.stepOtp=true;
        // }
        console.log("***** OTP *****", data);

      });
  }
  otpInput : any;
  mode: boolean = false;
  show: boolean = false;
  stepOtp: boolean = false;
  stepSave: boolean = false;
  saveUser: boolean = false;
  showInput: boolean = false;
  showInput2: boolean = true;
  public error = false;
  public success = false;
  public errMessage = "";
  public errTitle = "Error";

  validate(mobileNumber, otp) {

    mobileNumber =this.mb;
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
        this.MerchantParamToken1(this.paramPass, this.paramPass1, this.paramPass2);
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
  
  merchantPage(){
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
    }
  }

  stringJson: any;
  stringObject: any;

  getMobileNumber() {
    this.service.getMobileNumber(localStorage.getItem('forgotpass')).subscribe(resp => {
      console.log(resp);

      this.stringJson = JSON.stringify(resp);
      this.stringObject = JSON.parse(this.stringJson);
      console.log("JSON object -", this.stringObject);
      console.log(this.stringObject.phone)
      this.mb = this.stringObject.phone;
      console.log("PHONE :", this.mb)

    })
  }
  ngOnInit() {



    this.service.getMobileNumber(localStorage.getItem('forgotpass')).subscribe(resp => {
      console.log(resp);

      this.stringJson = JSON.stringify(resp);
      this.stringObject = JSON.parse(this.stringJson);
      console.log("JSON object -", this.stringObject);
      console.log(this.stringObject.phone)
      this.mb = this.stringObject.phone;
      console.log("PHONE :", this.mb)

    })
    // this.service.findAccountId(localStorage.getItem('forgotpass')).subscribe(data => {

    //   console.log('DATA ', data);
    
    //     // Convert String obect to JSON
    //    this.stringJson = JSON.stringify(data);
    //    this.stringObject = JSON.parse(this.stringJson);
    //    console.log("JSON object -", this.stringObject);
    //    console.log(this.stringObject.accountId)
    //    localStorage.setItem('idAccount',this.stringObject.accountId);

    // });

   
  }
  

  MerchantParamToken1(paramPass, paramPass1, paramPass2){
    console.log("Password " + paramPass + " this.idAccount " + this.idAccount + " this.paramPass1 " + this.paramPass1 + " this.paramPass2 " + this.paramPass2 + " ")

    if(paramPass == null || paramPass1 == null || paramPass2 == null){
      this.Errpass3= true;
      this.Errpass1= false;
      this.valid1= false;
    }
    else{
      console.log("Password " + paramPass + " this.idAccount " + this.idAccount + " this.paramPass1 " + this.paramPass1 + " this.paramPass2 " + this.paramPass2 + " ")
      console.log("MerchantParamToken1 " +this.idAccount )
      // this.service.MparamPass1( paramPass2, localStorage.getItem('user')).subscribe(data=>{
        this.service.MparamPass1( paramPass2, localStorage.getItem('idAccount')).subscribe(data=>{
          console.log("-----------------------------------------------------------------");    
          console.log(data);
          this.valid2=true;
          this.valid1=false;
          this.Errpass4=false;
          this.Errpass3= false;
          this.Errpass1= false;
          var numbers = new RegExp(/^[0-9]+$/);
          var passwordExp = new RegExp(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[@?!.,:*=$&_])(?=[^A-Z]*[A-Z]).{8,}$/);
          this.errorarraycondtion = false
          this.validcondition = true
          if(!passwordExp.test(paramPass)){
          this.errorarraycondtion = true; 
          this.validcondition = false;
          console.log("mtdozch");
        } else {
          /*SAFIA */
          // this.service.MparamPass( paramPass, paramPass1, paramPass2, localStorage.getItem('user')).subscribe(data=>{
            this.service.MparamPass( paramPass, paramPass1, paramPass2, localStorage.getItem('idAccount')).subscribe(data=>{
              console.log("-----------------------------------------------------------------");    
            console.log(data);
            console.log('user',localStorage.getItem('idAccount'))
            this.valid1=true;
            this.Errpass3= false;
            this.Errpass1= false;
            this.Errpass4=false;
            this.errorarraycondtion = false;
            this.validcondition = true;
            setTimeout(() => {
              this.service.logout();
              localStorage.clear();
              this.router.navigateByUrl("/login")         
               }, 3000);
                    },err=>{
            this.Errpass1=true;
            this.Errpass3= false;
            this.valid1= false;
            console.log(err)
            
            console.log("erreur password ")
            console.log("erreur password1 " +paramPass + "" + paramPass1)
      
          })
      }
        
      },err=>{
        this.Errpass1=false;
        this.Errpass4=true;
        this.Errpass3= false;
        this.valid1= false;
        this.valid2=false;
        console.log(err)
        
        console.log("erreur password ")
        console.log("erreur oldpassword1 " +paramPass + "" + paramPass2)
  
      }) 
  }
  }

}

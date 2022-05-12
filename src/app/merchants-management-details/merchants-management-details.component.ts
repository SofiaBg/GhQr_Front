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
  public merchantNameInput: string;
  public blocked: string;
  public notBlocked: string;
  public blockStatus: boolean;
  public registrationNumberInput: string;
  public tinInput: string;
  public guaranteeInput: string;
  public apiUrlInput: string;
  public companyNameInput: string;
  public websiteInput: string;

  public error = false;
  public success = false;
  public errMessage = "";
  public errTitle = "Error";
  public successMessage = "";
  public successTitle = "Success";

  public merchantId: any;

  constructor(private service: GipService, router: Router) {
    super(router);
    if (this.router.getCurrentNavigation() == null || this.router.getCurrentNavigation().extras == null || this.router.getCurrentNavigation().extras.state == null) {
      this.router.navigateByUrl("/merchantManagementList");
    }
    let merchant = this.router.getCurrentNavigation().extras.state['merchant'] as Merchant;
    // this.firstNameInput = merchant.firstName;
    // this.lastNameInput = merchant.lastName;
    this.merchantNameInput=merchant.merchantName
    this.emailInput = merchant.email;
    this.mobileNumberInput = merchant.phone;
    this.registrationNumberInput = merchant.user.businessCertNumber;
    this.tinInput = merchant.tin;
    this.guaranteeInput=merchant.guarantee
    // this.apiUrlInput = merchant.APIUrl;
    this.apiUrlInput = merchant.urlApi;
    this.websiteInput=merchant.website;
    this.companyNameInput=merchant.companyName;

    this.blockStatus = merchant.user.blocked;
    
    if (this.blockStatus) {
      this.blocked = "checked";
    } else {
      this.notBlocked = "checked";
    }

    this.merchantId=merchant.idPerson;
    console.log('MERCHANT ID',merchant.idPerson)
      
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

  ngOnInit() {
    this.getAccountId();
    
  }
  showMessage: boolean = false;
  show: boolean = false;
  resetPassword(){
    this.service.resetPassword(this.mobileNumberInput).subscribe(data=>{
      console.log('mobileNumber ');
      console.log('mobileNumber '+data);

      if (data['respCode'] == "001") {
        console.log('Failed to change password');
        this.showMessage = true;
      }
      if (data['respCode'] == "000") {
        this.show = true;
        setTimeout(() => {
          console.log('Password changed successfully')
        }, 3000)
      }
    })
    
  }

  merchantAccountId :any;
  getAccountId(){
    console.log(this.merchantId)
    let idPerson= this.merchantId;
    console.log('ID PERSON  ',idPerson);
    this.service.getAccountMerchantByPersonId(idPerson).subscribe(data=>{
      console.log('FIND ACCOUNT ID ');
      console.log('ACCOUNT ID '+data);
      this.merchantAccountId=data;
      console.log('MERCHANT ACCOUNT ID : '+this.merchantAccountId);

    })
  }


  MerchantParamToken1(paramPass, paramPass1, paramPass2){
    console.log("Password " + paramPass + " this.idAccount " + this.merchantAccountId + " this.paramPass1 " + this.paramPass1 + " this.paramPass2 " + this.paramPass2 + " ")

    if(paramPass == null || paramPass1 == null || paramPass2 == null){
      this.Errpass3= true;
      this.Errpass1= false;
      this.valid1= false;
    }
    else{
      console.log("Password " + paramPass + " this.idAccount " + this.merchantAccountId + " this.paramPass1 " + this.paramPass1 + " this.paramPass2 " + this.paramPass2 + " ")
      console.log("MerchantParamToken1 " +this.idAccount )
      // this.service.MparamPass1( paramPass2, localStorage.getItem('user')).subscribe(data=>{
        this.service.MparamPass1( paramPass2, this.merchantAccountId).subscribe(data=>{
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
            this.service.MparamPass( paramPass, paramPass1, paramPass2, this.merchantAccountId).subscribe(data=>{
              console.log("-----------------------------------------------------------------");    
            console.log(data);
            console.log('user',this.merchantAccountId)
            this.valid1=true;
            this.Errpass3= false;
            this.Errpass1= false;
            this.Errpass4=false;
            this.errorarraycondtion = false;
            this.validcondition = true;
            
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

  cancel() {
    this.router.navigateByUrl("/merchantManagementList")
  }

  updateMerchant() {
    console.log(' Mobile Number  '+ this.mobileNumberInput)
    let merchant = new Merchant();
      
      merchant.email = this.emailInput;
      merchant.merchantName= this.merchantNameInput;
      // merchant.firstName = this.firstNameInput;
      // merchant.lastName =this.lastNameInput  ;
      merchant.email = this.emailInput;
      merchant.phone = this.mobileNumberInput;
      merchant.registrationNumber = this.registrationNumberInput  ;
      merchant.tin = this.tinInput;
      merchant.guarantee = this.guaranteeInput;
      // merchant.APIUrl = this.apiUrlInput ;
      merchant.urlApi = this.apiUrlInput ;
      merchant.website =this.websiteInput 
      merchant.companyName = this.companyNameInput

    let user = new User();
    user.mobileNumber = this.mobileNumberInput;
    user.blocked = this.blockStatus;
    console.log('BLOCKED !' + this.blockStatus)
    console.log('Mobile Number !' + this.mobileNumberInput)
    console.log('APIUrl : '+ this.apiUrlInput)
    console.log('urlApi : '+ this.apiUrlInput)
    merchant.user = user;
 
    console.log(merchant, ' || ', user);
    this.service.updateMerchant(merchant).subscribe(data => {
      if (data['respCode'] == "000") {
        console.log('*** MERCHANT ***',merchant)
        console.log('APIUrl merchant: '+ this.apiUrlInput)
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

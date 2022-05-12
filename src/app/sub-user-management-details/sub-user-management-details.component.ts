import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../BaseComponent/BaseComponent';
import { Merchant } from '../classes/Merchant';
import { SubUsers , User} from '../classes/SubUser';
import { GipService } from '../services/gip.service';

@Component({
  selector: 'app-sub-user-management-details',
  templateUrl: './sub-user-management-details.component.html',
  styleUrls: ['./sub-user-management-details.component.css']
})
export class SubUserManagementDetailsComponent extends BaseComponent implements OnInit {

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
  public apiUrlInput: string;
  public companyNameInput: string;
  public websiteInput: string;
  public usernameInput: string;

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
      this.router.navigateByUrl("/subUserManagement");
    }
    let merchant = this.router.getCurrentNavigation().extras.state['merchant'] as SubUsers;
    this.usernameInput = merchant.user.username;
    this.firstNameInput = merchant.firstName;
    this.lastNameInput = merchant.lastName;
    this.emailInput = merchant.email;
    this.mobileNumberInput = merchant.phone;
    this.registrationNumberInput = merchant.registrationNumber;
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
        this.router.navigateByUrl("/subUserManagement");
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

  showMessageUserId: boolean = false;
  showUserId: boolean = false;
  sendUserId(){
    console.log('MOBILE NUM ', this.mobileNumberInput)
    this.service.sendUserId(this.mobileNumberInput).subscribe(data=>{
      console.log('mobileNumber ');
      console.log('mobileNumber '+data);

      if (data['respCode'] == "001") {
        // console.log('Failed to send UserId');
        this.showMessageUserId = true;
        this.errMessage = data["respDesc"];
        console.log("ERROR MESSAGE ", data["respDesc"])
        this.errMessage = data["respDesc"];
        // this.showMessage=true;
      }
      if (data['respCode'] == "000") {
        this.showUserId = true;
        setTimeout(() => {
          console.log('Mail Sended Successfully')
        }, 3000)
      }
    })
  }

  cancel() {
    this.router.navigateByUrl("/subUserManagement")
  }

  updateSubUser() {
    console.log(' Mobile Number  '+ this.mobileNumberInput)
    let subUser = new SubUsers();
      
    subUser.email = this.emailInput;
    subUser.firstName = this.firstNameInput;
    subUser.lastName =this.lastNameInput  ;
    subUser.email = this.emailInput;
    subUser.phone = this.mobileNumberInput;
    subUser.registrationNumber = this.registrationNumberInput  ;
    subUser.tin = this.tinInput;
    subUser.guarantee = this.guaranteeInput;
      // merchant.APIUrl = this.apiUrlInput ;
      subUser.urlApi = this.apiUrlInput ;
      subUser.website =this.websiteInput 
      subUser.companyName = this.companyNameInput

    let user = new User();
    user.mobileNumber = this.mobileNumberInput;
    user.blocked = this.blockStatus;
    console.log('BLOCKED !' + this.blockStatus)
    console.log('Mobile Number !' + this.mobileNumberInput)
    console.log('APIUrl : '+ this.apiUrlInput)
    console.log('urlApi : '+ this.apiUrlInput)
    subUser.user = user;
 
    console.log(subUser, ' || ', user);
    this.service.updateSubUser(subUser).subscribe(data => {
      if (data['respCode'] == "000") {
        console.log('*** MERCHANT ***',subUser)
        console.log('APIUrl merchant: '+ this.apiUrlInput)
        this.success = true;
        this.error = false;
        this.successMessage = "User updated successfully. Redirecting..."

        setTimeout(() => {
          this.router.navigateByUrl('/subUserManagement');
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


  deleteSubUser() {
    let subUser = new Merchant();
    let user = new User();
    user.mobileNumber = this.mobileNumberInput;
    subUser.user = user;
    this.service.deleteSubUser(subUser).subscribe(data => {
      if (data['respCode'] == "000") {
        this.success = true;
        this.error = false;
        this.successMessage = "User deleted successfully. Redirecting..."
        setTimeout(() => {
          this.router.navigateByUrl('/subUserManagement');
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


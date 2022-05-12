import { BaseComponent } from './../BaseComponent/BaseComponent';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GipService } from '../services/gip.service';
import {  User } from '../admin-list/admin-list.component';
import { Person } from '../classes/Person';

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.css']
})
export class AdminDetailsComponent extends BaseComponent implements OnInit {

  public usernameInput: string;
  public firstNameInput: string;
  public lastNameInput: string;
  public emailInput: string;
  public mobileNumberInput: string;
  public blocked: string;
  public notBlocked: string;
  public blockStatus: boolean;
  public userRoleInput: any;
  public branchInput: any;

  public error = false;
  public success = false;
  public errMessage = "";
  public errTitle = "Error";
  public successMessage = "";
  public successTitle = "Success";

  constructor(private service: GipService, router: Router) {
    super(router);
    if(this.router.getCurrentNavigation() == null || this.router.getCurrentNavigation().extras == null || this.router.getCurrentNavigation().extras.state == null){
      this.router.navigateByUrl("/adminList");
    }
    let admin = this.router.getCurrentNavigation().extras.state['admin'] as Person;
    this.usernameInput = admin.user.username;
    this.firstNameInput = admin.firstName;
    this.lastNameInput = admin.lastName;
    this.emailInput = admin.email;
    this.mobileNumberInput = admin.phone;
    this.branchInput = admin.branch;
    this.blockStatus = admin.user.blocked;
    this.userRoleInput= admin.typePers;
    if(this.blockStatus){
      this.blocked = "checked";
    } else {
      this.notBlocked = "checked";
    }
  }
  showMessage: boolean = false;
  show: boolean = false;
  resetPassword(){
    console.log('MOBILE NUM ', this.mobileNumberInput)
    this.service.resetPassword(this.mobileNumberInput).subscribe(data=>{
      console.log('mobileNumber ');
      console.log('mobileNumber '+data);

      if (data['respCode'] == "001") {
        // console.log('Failed to send UserId');
        this.showMessage = true;
        this.errMessage = data["respDesc"];
        console.log("ERROR MESSAGE ", data["respDesc"])
        this.errMessage = data["respDesc"];
        // this.showMessage=true;
      }
      if (data['respCode'] == "000") {
        this.show = true;
        setTimeout(() => {
          console.log('Mail Sended Successfully')
        }, 3000)
      }
    })
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
  homePage(){
    this.router.navigateByUrl("/adminList")
  }

  ngOnInit() {
    
  }
 
  cancel(){
    this.router.navigateByUrl("/adminList")
  }

  changeBlocked(event){
    if(event.target.value == 1){
      this.blockStatus = true;
    } else {
      this.blockStatus = false;
    }
  }

  updateAdmin(){
    let admin = new Person();
    admin.email = this.emailInput;
    admin.firstName = this.firstNameInput;
    admin.lastName = this.lastNameInput;
    admin.phone = this.mobileNumberInput;
    admin.branch=this.branchInput;
    let user = new User();
    user.username = this.usernameInput;
    user.blocked = this.blockStatus;
    admin.user = user;
    this.service.updateAdmin(admin).subscribe(data =>{
      if(data['respCode'] == "000"){
        this.success = true;
        this.error = false;
        this.successMessage = "User updated successfully. Redirecting..."

        setTimeout(() => {
          this.router.navigateByUrl('/adminList');
        }, 3000);
        
      } else {
        this.success = false;
        this.error = true;
        this.errMessage = data['respDesc'];
      }
    }
    ,err=>{
      this.success = false;
      this.error = true;
    });
  }

  deleteAdmin(){
    let admin = new Person();
    let user = new User();
    user.username = this.usernameInput;
    admin.user = user;
    this.service.deleteAdmin(admin).subscribe(data =>{
      if(data['respCode'] == "000"){
        this.success = true;
        this.error = false;
        this.successMessage = "User deleted successfully. Redirecting..."
        setTimeout(() => {
          this.router.navigateByUrl('/adminList');
        }, 3000);
      } else {
        this.success = false;
        this.error = true;
        this.errMessage = data['respDesc'];
      }
    }
    ,err=>{
      this.success = false;
      this.error = true;
    });
  }

}
export class ToggleButtonComponent  {
  @Output() changed = new EventEmitter<boolean>();
}

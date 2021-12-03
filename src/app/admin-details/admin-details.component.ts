import { BaseComponent } from './../BaseComponent/BaseComponent';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GipService } from '../services/gip.service';
import { Admin, User } from '../admin-list/admin-list.component';

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
    let admin = this.router.getCurrentNavigation().extras.state['admin'] as Admin;
    this.usernameInput = admin.user.username;
    this.firstNameInput = admin.firstName;
    this.lastNameInput = admin.lastName;
    this.emailInput = admin.email;
    this.mobileNumberInput = admin.phone;
    this.blockStatus = admin.user.blocked;
    if(this.blockStatus){
      this.blocked = "checked";
    } else {
      this.notBlocked = "checked";
    }
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
    let admin = new Admin();
    admin.email = this.emailInput;
    admin.firstName = this.firstNameInput;
    admin.lastName = this.lastNameInput;
    admin.phone = this.mobileNumberInput;
    let user = new User();
    user.username = this.usernameInput;
    user.blocked = this.blockStatus;
    admin.user = user;
    this.service.updateAdmin(admin).subscribe(data =>{
      if(data['respCode'] == "000"){
        this.success = true;
        this.error = false;
        this.successMessage = "Admin updated successfully. Redirecting..."
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
    let admin = new Admin();
    let user = new User();
    user.username = this.usernameInput;
    admin.user = user;
    this.service.deleteAdmin(admin).subscribe(data =>{
      if(data['respCode'] == "000"){
        this.success = true;
        this.error = false;
        this.successMessage = "Admin deleted successfully. Redirecting..."
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

import { BaseComponent } from './../BaseComponent/BaseComponent';
import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { Admin, User } from '../admin-list/admin-list.component';
import { GipService } from '../services/gip.service';

@Component({
  selector: 'app-admin-creation',
  templateUrl: './admin-creation.component.html',
  styleUrls: ['./admin-creation.component.css']
})
export class AdminCreationComponent extends BaseComponent implements OnInit {

  public usernameInput: string;
  public firstNameInput: string;
  public lastNameInput: string;
  public emailInput: string;
  public mobileNumberInput: string;

  public error = false;
  public success = false;
  public errMessage = "";
  public errTitle = "Error";
  public successMessage = "";
  public successTitle = "Success";

  constructor(private service: GipService, router: Router) {
    super(router);
  }

  ngOnInit() {
  }

  
  merchantPage(){
    this.router.navigateByUrl("/adminList")
  }
  createAdmin(){
    let admin = new Admin();
    admin.email = this.emailInput;
    admin.firstName = this.firstNameInput;
    admin.lastName = this.lastNameInput;
    admin.phone = this.mobileNumberInput;
    let user = new User();
    user.username = this.usernameInput;
    admin.user = user;
    this.service.createAdmin(admin).subscribe(data =>{
      if(data['respCode'] == "000"){
        this.success = true;
        this.error = false;
        this.successMessage = "Admin created successfully. Redirecting..."
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

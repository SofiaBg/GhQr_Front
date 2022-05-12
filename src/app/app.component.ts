import { Component, HostListener, OnDestroy } from '@angular/core';

import {Router} from '@angular/router';
//import {AuthenticationService} from './services/authentication.sevice';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogData } from './DialogData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ghipspayment';
  animal: string;
  name: string;

  // ngOnDestroy() {
  //   localStorage.clear();
  //     this.router.navigateByUrl("/login")
  // }
  //private authentService:AuthenticationService,

  constructor(private router:Router) {}

  @HostListener("window:onbeforeunload",["$event"])
  clearLocalStorage(event){
    localStorage.clear();
    this.router.navigateByUrl("/login")
  }

  /*onLogout(){ 
    this.authentService.logout()
    this.router.navigateByUrl("/login")
  }*/
}

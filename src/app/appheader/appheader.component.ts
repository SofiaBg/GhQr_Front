import { JwtHelperService } from '@auth0/angular-jwt';
import { Component, OnInit } from '@angular/core';
import {GipService} from "../services/gip.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent implements OnInit {

  private userName: String

  /*SAFIA 01.12.2021 */
  private name: String

  logOut(){
    this.service.logout();
    this.router.navigateByUrl("/login")
  }
  constructor(private service:GipService,private router:Router) { }

  ngOnInit() {
    this.userName = localStorage.getItem('forgotpass')
    
    /*SAFIA 01.12.2021 */
    this.name = localStorage.getItem('Name')
  }

}

import { JwtHelperService } from '@auth0/angular-jwt';
import { Component, OnInit } from '@angular/core';
import {GipService} from "../services/gip.service";
import {Router} from "@angular/router";
import { BaseComponent } from '../BaseComponent/BaseComponent';

@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent extends BaseComponent implements OnInit {


  /*SAFIA 01.12.2021 */
  private name: String ;
  private role : string ;

  private userName : any;

  logOut(){
    this.service.logout();
    this.router.navigateByUrl("/login")
  }
  constructor(private service:GipService, router:Router) { super(router);
  }

  show : boolean = false;
  showN : boolean = false;
  showCU : boolean = false;
  merchantName : string;
  ngOnInit() {

    this.service.getIdAccountByUserName('Mhajar1').subscribe(data => {
      console.log(data);
              this.userName=data;
            })
    this.userName = localStorage.getItem('forgotpass')
    
    /*SAFIA 01.12.2021 */
    this.name = localStorage.getItem('Name')
    this.role= localStorage.getItem('role')
    this.userName = localStorage.getItem('forgotpass');


    
    if(localStorage.getItem('role') == 'USER'){
      this.getMerchantName()
      this.getCompanyName();
      this.showCU=true;
      this.show=false;
      this.showN=false
    }else
    if(localStorage.getItem('role') == 'SUB USER'){
      this.getCompanyName();
      this.show=true;
      this.showCU=false;
      this.showN=false

    }else{
      this.showN=true
      this.showCU=false;
      this.show=false;
    }
  }

  getMerchantName(){
    console.log('*********************** GET MERCHANT NAME *************************')
    this.service.getMerchantName(localStorage.getItem('forgotpass')).subscribe(data => {
      console.log("*** ",data);

    this.companyName= data
      this.stringJson = JSON.stringify(data);
      this.stringObject = JSON.parse(this.stringJson);
      console.log("JSON object -", this.stringObject);
      console.log(this.stringObject.merchantName)
      this.merchantName=this.stringObject.merchantName

    })
  }
  stringJson: any;
  stringObject: any;
  companyName : any;
  getCompanyName(){
    console.log('*********************** GET COMPANY NAME *************************')
    this.service.getCompanyName(localStorage.getItem('forgotpass')).subscribe(data => {
      console.log("*** ",data);

    this.companyName= data
      this.stringJson = JSON.stringify(data);
      this.stringObject = JSON.parse(this.stringJson);
      console.log("JSON object -", this.stringObject);
      console.log(this.stringObject.companyName)

    })
  }

//     getIdAccountByUserName(username){
//       console.log("***************************************************************************")
//       this.service.getIdAccountByUserName('Mhajar1').subscribe(data => {
// console.log(data);
//         this.userName=data;
//       })
      
//   }

}

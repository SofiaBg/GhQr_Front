import { BaseComponent } from './../BaseComponent/BaseComponent';
import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { GipService } from '../services/gip.service';
import { BnNgIdleService } from 'bn-ng-idle';
@Component({
  selector: 'app-param',
  templateUrl: './param.component.html',
  styleUrls: ['./param.component.css']
})
export class ParamComponent extends BaseComponent implements OnInit {
  paramToke:any;
  id:any=localStorage.getItem('forgotpass');
  sessionTime:any;
  Errtoken:boolean;
  token:boolean;
  session:boolean;
  valid:boolean;
  timesession : any;
  constructor(private service:GipService,router:Router,private bnIdle: BnNgIdleService) { super(router); }

  ngOnInit() {
    console.log("   ngOnInit" )
    console.log(" " + this.router.url)
    this.valid=false;
    if("/param/session"==this.router.url){
    this.session= true;
     this.token =false ;
     this.Errtoken =false;
     this.getAparamSession(this.id);
     this.TimeSession()
    }else{
      this.session= false;
      this.token =true ;
      this.Errtoken =false;
      this.getAparamToken(this.id);
      this.TimeSession()
    }   
    this.id=="admin";
  }
  
  url(paramToke){
    if("/param/session"==this.router.url){
      this.AparamSession(paramToke)
    }else{
      this.AparamToken(paramToke)
    }
  }

  AparamToken(paramToke){
  
  this.service.AparamToken(paramToke , this.id).subscribe(data=>{
  console.log(" id " + paramToke + "id  " +this.id)
    this.paramToke=data;
    this.valid = true;
  },err=>{
    this.Errtoken =true
  console.log("erreur token ")
  })
  }
  //+++++
  TimeSession(){
    this.service.getTimesession().subscribe(data=>{
      this.timesession=data;
    
      this.bnIdle.startWatching(this.timesession).subscribe((isTimedOut: boolean) => {
        //++++
        
              if (isTimedOut) {
                console.log('session expired');
                this.service.logOutMerchant();
                this.router.navigateByUrl("/login")
              }
            });
      
    },err=>{
      this.service.logout();
      this.router.navigateByUrl("/login");
    })
  }
  
  AparamSession(sessionTime){  
    this.service.AparamSession(sessionTime,this.id).subscribe(data=>{
      this.sessionTime=data;
      this.valid = true;
    },err=>{
      this.Errtoken =true
      console.log("erreur token ")
    })   
  }

  getAparamToken(id){
    console.log(" id " + id)
    this.service.getAparamToken(id).subscribe(data=>{
      this.paramToke=data;
    },err=>{
      console.log("erreur token ")
    })
       
  }

  getAparamSession(id){
    console.log(" id " + id)
    this.service.getAparamSession(id).subscribe(data=>{
    this.sessionTime=data;
    },err=>{   
      console.log("erreur token ")
    })
       
  }  

}

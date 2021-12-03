import { Component, OnInit,ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GipService} from '../services/gip.service';
import {switchMap} from 'rxjs/operators';
import {Secure} from '../services/Secure';
import Swal from 'sweetalert2'
import { Location } from '@angular/common';
import { Compiler } from '@angular/core';

import swal from 'sweetalert2';
/*import $ from "jquery";*/
import {PayementAcess} from '../services/PayementAcess';
import {RoutingState} from "../services/RoutingState";
//import {PayementAccess} from '../services/PayementAccess';
@Component({
  selector: 'app-payement',
  templateUrl: './payement.component.html',
  styleUrls: ['./payement.component.css']
})


export class PayementComponent implements OnInit {
  valid:boolean;
  public secure:Secure = new Secure();
  token:String
  previousRoute: string;
  pminitial:any;
  pmconfirm:any;
  confirm:boolean=false;
  errorMessage:String;
  mode:number=0;
  id:any;
  codeError:number=100;
  display:string = 'none';
  displayOTP:string = 'none';
  finpayement:boolean=false;
  select:string = "";
  showq:boolean=false;
  showpay:boolean=false;
  showotp:boolean=false;
  showbutton:boolean=false;
  showmodal:boolean=false;
  showmodalsc:boolean=false;
  showmerr:boolean=false;
  showdetail:boolean=false;
  showfailed:boolean=false;
  SessionTimeOut:any;

  //  public pma :PayementAcess=new PayementAcess();
  constructor(private route:ActivatedRoute,private service:GipService, private router:Router,
              private routingState: RoutingState,    private compiler: Compiler

  ) { }

  ngOnInit() {
    console.log("ngOnInit")

    //    this.route.paramMap.pipe(
    this.route.paramMap.subscribe(params => {
      if(params.get("secure")==null)
        console.log("params.get(\"secure\")==nulnulllllll")
      //   this.secure.setSecure(params.get("secure")) ;
           this.token=params.get("secure")    
    });
    this.secure.setSecure(this.token)
    console.log("token envoye"+this.secure.getSecure())
    
    this.autochargemenToken();
  }

  autochargemenToken(){
    this.id="admin";
    console.log("autochargemenToken " + this.id)
    this.service.getAparamSession(this.id).subscribe(data=>{
      this.SessionTimeOut =data;
      console.log("autochargemenToken  " + this.SessionTimeOut + " *1000  "  + this.SessionTimeOut*1000)
            
      this.service.verifiyToken(this.secure).subscribe( data=>{ 
      this.pminitial=data;
        this.valid= true;      
      setTimeout(()=>{    //<<<---    using ()=> syntax      
        this.valid= false;
      }, this.SessionTimeOut*1000);
      },
      err=>{
        this.valid=false
        console.log(this.valid)
      })
    })
  };
  
  sendOTP(payementinfo){
    console.log("sendOTP")
    this.showmerr=false;
    console.log("token will be sended to for payement info "+this.token)
    this.service.sendInformations(payementinfo).subscribe(
      data=>{
        //this.pmconfirm=data;
        // this.mode=1

        console.log("this.pmconfirm" +this.pmconfirm + "  "+ data['codeError'])
        if(data['codeError']!=null){
          this.mode=0;
          this.errorMessage= data['codeError'];

        }
        else{
          this.pmconfirm=data
          this.confirm=this.pmconfirm.clientexiste;
          this.service.sendOTP(payementinfo).subscribe(resp => {
            this.mode=2;
            this.showmodalsc=true;


            this.openModalOTP()
            //  $("#modal-otp").modal('show');
            console.log(" SEND OTP ffffffffffffffffffff ")

          }, err => {
            this.showmerr=true;

            console.log(" erreur status otp ")
          })
        }


      },err => {
        console.log("error exception code error: err---this.errorMessage,err.error,err.message");
        console.log(err);
        console.log("-----------------------------------");
        this.mode=0;

        console.log(this.errorMessage);
        console.log(err.error);
        console.log(err.message);
        //this.errorMessage= err.error.message;
      });

  }




  onSell(payementinfo){
    console.log(payementinfo);
    /* if(payementinfo.telephone.match(/\b(4[0-9]{12}(?:[0-9]{3})?)\b/)[1]){
       console.log("valid mobile number");
     }else{
       console.log("Invalid mobile number");
     }*/

    console.log("token will be sended to for payement info"+this.token)
    this.showmerr=false;

    this.service.sendInformations(payementinfo).subscribe(
      data=>{
        //this.pmconfirm=data;
        // this.mode=1

        console.log(this.pmconfirm)
        if(data['codeError']!=null){
          this.mode=0;
          this.errorMessage= data['codeError'];
        }
        else{
          this.pmconfirm=data
          this.confirm=this.pmconfirm.clientexiste;
          this.mode=2;
          this.openModal();
        }
        console.log("-----------------------------------");
        console.log(data);
        console.log("-----------------------------------");

      },err => {
        console.log("error exception code error: err---this.errorMessage,err.error,err.message");
        console.log(err);
        console.log("-----------------------------------");
        this.mode=0;
        console.log(this.errorMessage);
        console.log(err.error);
        console.log(err.message);
        //this.errorMessage= err.error.message;
      });
  }

  onConfirmSell(){

    console.log("confirmation ok!")
    console.log(this.pmconfirm);
    this.display='none';
    this.errorMessage=null;
    this.service.confirmPayement(this.pmconfirm).subscribe(data=>{
      this.finpayement=true;
      this.paiementsuccessfull();
      console.log(data)
    },err=>{
      this.mode=0;
      // this.errorMessage= err.error.message;
      this.finpayement=true;

      this.paiementFailed();
    });
  }

  openModal(){

    this.display='block';

  }

  openModalOTP(){

    this.displayOTP='block';

  }
  Salert(){
    Swal.fire('Hello world!');
    // const Swal = require('sweetalert2');
    // swal("Congrats!", ", Your account is created!", "success");

  }
  paiementsuccessfull(){



    /* Swal.fire(
       'Good job!',
       'your payment is successful',
       'success',


     )*/
    Swal.fire({
      //position: 'top-end',
      type: 'success',
      title:  'your payment is successful',
      position:"center",
      width:500
      // timer: 1500
    })
    this.showdetail=true;
    this.previousRoute
  }
  paiementFailed() {
    Swal.fire({

      //  html: "<div style='font-size:1.6rem !important '> title </div>",
      type: 'error',
      //closeButtonHtml:'  <a (click)="redirestion()" class="text-center"> <h4>ok</h4></a>',
      title: ' <p>payment Transaction failed! !</p>',
      //  text: 'payment Transaction failed!',
      // width:900,
      // customClass: 'swal-wide',
      position: 'center',
      width:500,
      //html: '<button (click)="redirestion()">Goto</button>',


    }    )
    // @ts-ignore
    //waits(4000)
    this.showfailed=true;

    //this.finpayement==true;

   // this.redirestion();
  }
  redirestion(){
    console.log(this.previousRoute)

    this.router.navigateByUrl(this.previousRoute)

  }


  showWithOTP(){
    this.showq=true;
    this.showpay=true;
    this.showbutton=true;
    this.showotp=true;
    this.showmodal=true;

  }

  showWithoutOTP(){
    this.showq=true;
    this.showpay=true;
    this.showbutton=false;
    this.showmodal=false;
  }


  form(){
    this.router.navigateByUrl("/form")

  }


}

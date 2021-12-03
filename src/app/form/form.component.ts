import { Component, OnInit } from '@angular/core';
import {GipService} from "../services/gip.service";
import {relativeToRootDirs} from "@angular/compiler-cli/src/transformers/util";
import {Router} from "@angular/router";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
secure:string="";
  hide:boolean=true;
  erreur:string="";


  constructor(private service:GipService,private router:Router) { }

  ngOnInit() {
  }
  generate(payement){

    console.log("payement de redirection"+payement);
  console.log("account  "+payement.accountId)
    console.log(payement.amount)
    console.log(payement.idFacture)
    console.log(payement.idPersonne)
    console.log(payement.narration)

    let res = this.service.generate(payement);
  let token;
        res.subscribe(data=>{
          console.log(data);
      //  let token
          this.secure= data['secure'];
          this.secure="/payement/"+this.secure
          this.router.navigateByUrl(this.secure);
      //  document.location = "/payement/"+this.secure;
        },err=>{
          console.log(err);
          this.hide=false;
         this.erreur="Redirection error";


        });

  }




}

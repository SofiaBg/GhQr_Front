import { Component, OnInit } from '@angular/core';
import { GipService } from '../services/gip.service';

@Component({
  selector: 'app-passreset',
  templateUrl: './passreset.component.html',
  styleUrls: ['./passreset.component.css']
})
export class PassresetComponent implements OnInit {
  validcondition: boolean;
  errorarraycondtion: boolean;
  Errpass4: boolean;
  Errpass1: boolean;
  valid1: boolean;
  Errpass3: boolean;
  idAccount: string;
  paramPass: string;
  paramPass1: string;
  paramPass2: string;
  valid2: boolean;

  constructor(private service: GipService) { }

  ngOnInit() {
    this.idAccount = localStorage.getItem('idAccount');
  }

  MerchantParamToken1(paramPass, paramPass1, paramPass2){
    if(paramPass == null || paramPass1 == null || paramPass2 == null){
      this.Errpass3= true;
      this.Errpass1= false;
      this.valid1= false;
    }
    else{
      console.log("Password " + paramPass + " this.idAccount " + this.idAccount + " this.paramPass1 " + this.paramPass1 + " this.paramPass2 " + this.paramPass2 + " ")
      console.log("MerchantParamToken1 " +this.idAccount )
      // this.service.MparamPass1( paramPass2, localStorage.getItem('user')).subscribe(data=>{
        this.service.MparamPass1( paramPass2, localStorage.getItem('idAccount')).subscribe(data=>{
          console.log("-----------------------------------------------------------------");    
          console.log(data);
          this.valid2=true;
          this.valid1=false;
          this.Errpass4=false;
          this.Errpass3= false;
          this.Errpass1= false;
          var numbers = new RegExp(/^[0-9]+$/);
          var passwordExp = new RegExp(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=.*[@?!.,:*=$&_])(?=[^A-Z]*[A-Z]).{8,}$/);
          this.errorarraycondtion = false
          this.validcondition = true
          if(!passwordExp.test(paramPass)){
          this.errorarraycondtion = true; 
          this.validcondition = false;
          console.log("mtdozch");
        } else {
          /*SAFIA */
          // this.service.MparamPass( paramPass, paramPass1, paramPass2, localStorage.getItem('user')).subscribe(data=>{
            this.service.MparamPass( paramPass, paramPass1, paramPass2, localStorage.getItem('idAccount')).subscribe(data=>{
              console.log("-----------------------------------------------------------------");    
            console.log(data);
            console.log('user',localStorage.getItem('idAccount'))
            this.valid1=true;
            this.Errpass3= false;
            this.Errpass1= false;
            this.Errpass4=false;
            this.errorarraycondtion = false;
            this.validcondition = true;
            
          },err=>{
            this.Errpass1=true;
            this.Errpass3= false;
            this.valid1= false;
            console.log(err)
            
            console.log("erreur password ")
            console.log("erreur password1 " +paramPass + "" + paramPass1)
      
          })
      }
        
      },err=>{
        this.Errpass1=false;
        this.Errpass4=true;
        this.Errpass3= false;
        this.valid1= false;
        this.valid2=false;
        console.log(err)
        
        console.log("erreur password ")
        console.log("erreur oldpassword1 " +paramPass + "" + paramPass2)
  
      }) 
  }
  }

}

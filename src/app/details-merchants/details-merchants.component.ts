import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { BaseComponent } from '../BaseComponent/BaseComponent';
import { Merchant } from '../new-merchant/new-merchant.component';
import { GipService } from '../services/gip.service';
import * as i18nIsoCountries from 'i18n-iso-countries';

@Component({
  selector: 'app-details-merchants',
  templateUrl: './details-merchants.component.html',
  styleUrls: ['./details-merchants.component.css']
})
export class DetailsMerchantsComponent extends BaseComponent implements OnInit {

  terminals: Array<any>;
  merchant: Merchant;
  idAccount: String= localStorage.getItem('idAccount');
  accountMerch;
  paramToke: any;
  transactionParAccountMerch;
  qrtransactionParAccountMerch: any;//++
  currentpageMerch: number = 0;
  firstTrans;
  Errtoken: boolean = false;
  valid: boolean = false;

 constructor
  (private formBuilder: FormBuilder, 
    public _formBuilder: FormBuilder, 
    private bnIdle: BnNgIdleService,
     private service: GipService, router: Router) {
    /* this.datepickerForm = this._formBuilder.group({
       'startDate': [null, Validators.required]
     });*/
    super(router);
  }
  ngOnInit() {
    i18nIsoCountries.registerLocale(require("i18n-iso-countries/langs/en.json"));
    this.idAccount = this.service.loadIdAccount();
    this.getAccountMerchant(this.idAccount)
  }

  showTerminal : boolean = false ;
  
  getAccountMerchant(idAccount) {
    console.log(' ACCOUNT ID ',localStorage.getItem('idAccount'))
    this.service.getAccountMerchant(idAccount).subscribe(data => {
      console.log("-----------------------------------------------------------------");
      this.accountMerch = data;
      localStorage.setItem('merchant', JSON.stringify(data['merchant']));
      console.log(data)
      this.merchant = JSON.parse(localStorage.getItem('merchant'));
      this.terminals = Array<any>();
      for (let site of this.merchant['sites']) {
        for (let terminal of site['acceptorPoints']) {
          terminal['site'] = site['name'] + " (" + site['id'] + ")";
          terminal['creationDate'] = new Date(Date.parse(terminal['creationDate']));
          this.terminals.push(terminal);
        }
      }
      if(this.terminals.length > 0){
        this.showTerminal=true
      }

    }, err => {
      console.log("prblm de recuperation des compte de merchant")
    })
    //accountsPersonne=data
  }

  MerchantParamToken(paramToke) {

    console.log("Token " + paramToke + " this.idAccount " + this.idAccount + " ")
    console.log("MerchantParamToken " + this.idAccount)
    this.service.MparamToken(paramToke, this.idAccount).subscribe(data => {
      console.log("-----------------------------------------------------------------");
      console.log(data)
      this.paramToke = data;

      this.valid = true;
    }, err => {
      this.Errtoken = true;
      console.log("erreur token ")
    })

  }

  getMParamToekn() {
    this.service.getMPToken(this.idAccount).subscribe(data => {
      console.log("-----------------------------------------------------------------");
      console.log(data)
      this.paramToke = data;

    }, err => {
      this.Errtoken = true;
      console.log("erreur token ")
    })
  }

  initCap(string: String): String {
    let words: string[] = string.split(" ");
    var finalString = "";
    for (let word of words) {
      finalString += " " + word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
    }
    return finalString.substring(1);
  }

  countryName(countryCode: String): String {
    return i18nIsoCountries.getName(countryCode.toString(), "en", { select: "alias" });
  }


}

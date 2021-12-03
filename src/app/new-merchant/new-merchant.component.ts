import { BaseComponent } from './../BaseComponent/BaseComponent';
import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
//import {AuthenticationService} from '../services/authentication.sevice';
import { GipService } from '../services/gip.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationMerchant } from '../services/RegistrationMerchant';
import { BnNgIdleService } from 'bn-ng-idle';//++
import $ from "jquery";
import {
  NgbActiveModal,
  NgbModal,
  NgbModalConfig,
} from '@ng-bootstrap/ng-bootstrap';
import 'ng-bootstrap-to-bootstrap-3';
import { LoggerService } from 'ngx-admin-lte';
import { CommonModule } from '@angular/common';
import { MerchantCities } from '../classes/MerchantCities';
import { MerchantRegions } from '../classes/MerchantRegions';
import { MerchantStatus } from '../classes/MerchantStatus';
import { MerchantLegalForm } from '../classes/MerchantLegalForm';
import { MerchantMCC } from '../classes/MerchantMCC';
import { MerchantLegalIDType } from '../classes/MerchantLegalDType';
import { Countries } from '../classes/Countries';
import { ZipCodes } from '../classes/ZipCodes';
import { MerchantUsage } from '../classes/MerchantUsage';
import { MerchantBank } from '../classes/MerchantBank';
import { MerchantBranch } from '../classes/MerchantBranch';
import { ModeSending } from '../classes/ModeSending';
import { SiteStatus } from '../classes/SiteStatus';
import { any } from '@uirouter/core';

export class Merchant {

  // constructor(bank: any, accountnumber: any, visaidentifier: any, usage: any, region: any, digitaladdress: any, email: any,
  //   branch: any, companyname: any, openingdate: any, sendingmode: any, city: any, title: any, mobilenumber: any,
  //   businessregno: any, mcc: any, mastercardidentifier: any, careof: any, businessphysicaladdress1: any, firstname: any,
  //   legalidtype: any, tin: any, upiidentifier: any, startdate: any, businessphysicaladdress2: any, lastname: any,
  //   doingbusinessas: any, status: any, type: any, country: any, businessphysicaladdress3: any, func: any, sites: any[],
  //   state: any, zipcode: any, postalcode: any, contractnumber: any, legalform: any, acctstartdt: any,
  //   mainactivity: any, mainactivitytype: any) {

  // }
  /* SAFIA 06.10.2021 */
  constructor(bank: any, accountnumber: any, visaidentifier: any, usage: any, region: any, digitaladdress: any, email: any,
    branch: any, companyname: any, openingdate: any, sendingmode: any, city: any, title: any, mobilenumber: any,
    businessregno: any, mcc: any, mastercardidentifier: any, careof: any, businessphysicaladdress1: any, firstname: any,
    legalidtype: any, tin: any, upiidentifier: any, startdate: any, businessphysicaladdress2: any, lastname: any,
    doingbusinessas: any, status: any, type: any, country: any, businessphysicaladdress3: any, func: any, sites: any[],
    state: any, zipcode: any, postalcode: any, contractnumber: any, legalform: any, acctstartdt: any,
    mainactivity: any, mainactivitytype: any, dateOfIncorporation:any) {

  }
}

@Component({
  selector: 'app-new-merchant',
  templateUrl: './new-merchant.component.html',
  styleUrls: ['./new-merchant.component.css']
})
export class NewMerchantComponent extends BaseComponent implements OnInit {

  formGroup: FormGroup;


  user: any;
  banques: any;
  titles: Array<any> = [];
  mode: number = 0;
  errorMessage: string;
  banque;
  bank: string = '00031';

  sites: any[];

  /* SAFIA 14.09.2021*/
  merchantCities: MerchantCities[];
  merchantRegions: MerchantRegions[];
  merchantStatus: MerchantStatus[];
  merchantLegalForm: MerchantLegalForm[];
  merchantMCC: MerchantMCC[];
  merchantLegalIDType: MerchantLegalIDType[];
  countries: Countries[];
  zipCodes: ZipCodes[];
  merchantUsages: MerchantUsage[];
  merchantBank: MerchantBank[];
  merchantBranch: MerchantBranch[];
  modeSending: ModeSending[];

  sending: boolean = false;

  merchant: any;
  show: boolean = false;
  sign: String;
  mySelectedtitle: any;
  timesession: any;
  Errpass: boolean = false;//++++++

  stringJson: any;

  stringObject: any;
  userName: any;


  //private authService:AuthenticationService,
  constructor(private gipService: GipService, router: Router, public fb: FormBuilder, private bnIdle: BnNgIdleService, private modalService: NgbModal) {
    super(router);
    this.titles = [
      { code: '01', name: "Mr" },
      { code: '02', name: "Mrs" },
      { code: '03', name: "Ms" }
    ];

    this.sites = [];
  }

  ngOnInit() {

    /* SAFIA 14.09.2021 */
    this.gipService.getMerchantCities().subscribe(data => {
      this.merchantCities = data;
      console.log(data);
    });

    /* SAFIA 14.09.2021 */
    this.gipService.getMerchantRegions().subscribe(data => {
      this.merchantRegions = data;
      console.log(data);
    });

    /* SAFIA 14.09.2021 */
    this.gipService.getMerchantStatus().subscribe(data => {
      this.merchantStatus = data;
      console.log(data);
    });

    /* SAFIA 14.09.2021 */
    this.gipService.getMerchantLegalForm().subscribe(data => {
      this.merchantLegalForm = data;
      console.log(data);
    });

    /* SAFIA 15.09.2021 */
    this.gipService.getMerchantMCC().subscribe(data => {
      this.merchantMCC = data;
      console.log(data);
    });

    /* SAFIA 15.09.2021 */
    this.gipService.getMerchantLegalIDType().subscribe(data => {
      this.merchantLegalIDType = data;
      console.log(data);
    });

    /* SAFIA 15.09.2021 */
    this.gipService.getCountries().subscribe(data => {
      this.countries = data;
      console.log(data);
    });

    /* SAFIA 15.09.2021 */
    this.gipService.getZipCodes().subscribe(data => {
      this.zipCodes = data;
      console.log(data);
    });

    //Safia 15.09.2021
    this.gipService.getMerchantUsage().subscribe(data => {
      this.merchantUsages = data;
      console.log(data);
    });

    //Safia 15.09.2021
    this.gipService.getMerchantBank().subscribe(data => {
      this.merchantBank = data;
      console.log("merchantBank", data);
    });

    //Safia 15.09.2021
    this.gipService.getMerchantBranch().subscribe(data => {
      this.merchantBranch = data;
      console.log(data);
    });

    //Safia 16.09.2021
    this.gipService.getModeSending().subscribe(data => {
      this.modeSending = data;
      console.log(data);
      console.log();
    });

    // this.merchant = new RegistrationMerchant();
    this.autochargement()
    this.TimeSession()
    /*//+++
        this.bnIdle.startWatching(1800).subscribe((isTimedOut: boolean) => {
          if (isTimedOut) {
            console.log('session expired');
            this.gipService.logOutMerchant();
            this.router.navigateByUrl("/login")
          }
        });*/
  }

  /*SAFIA 28.09.2021 */
  getMerchantInfoByAccountNumber(accountNumber) {
    accountNumber = $('#accountnumber').val();
    console.log('Account Number = ', accountNumber)
    this.gipService.getMerchantInfoByAccountNumber(accountNumber).subscribe(data => {
      console.log(data);
      // Convert String obect to JSON
      this.stringJson = JSON.stringify(data);
      // console.log("String json object :", this.stringJson);
      // console.log("Type :", typeof this.stringJson);

      // ConvertjSON to an object
      this.stringObject = JSON.parse(this.stringJson);
      console.log("JSON object -", this.stringObject);
      console.log(this.stringObject.address)
      console.log(this.stringObject.dateOfBirth)
    });
  }

  //+++++
  TimeSession() {
    this.gipService.getTimesession().subscribe(data => {
      this.timesession = data;

      this.bnIdle.startWatching(this.timesession).subscribe((isTimedOut: boolean) => {
        //++++

        if (isTimedOut) {
          console.log('session expired');
          this.gipService.logOutMerchant();
          this.router.navigateByUrl("/login")
        }
      });

    }, err => {
      this.gipService.logout();
      this.router.navigateByUrl("/login");
    })
  }

  fillTestData() {
    $('#bank').val("300311")
    $('#accountnumber').val("10203065478962")
    $('#visaidentifier').val("94816231654987")
    $('#usage').val("01")
    $('#region').val("001")
    $('#digitaladdress').val("123 PO BOX 2")
    $('#email').val("kojo.manu@gmail.com")
    $('#branch').val("0001")
    $('#companyname').val("PapayeLtd")
    $('#openingdate').val("2021-10-05")
    $('#sendingmode').val("01")
    $('#city').val("00001")
    $('#title').val("Mr")
    $('#mobilenumber').val("0245821491")
    $('#businessregno').val("2351005737")
    $('#mcc').val("5123")
    $("#legalid").val("789546132")
    $('#mastercardidentifier').val("879456123")
    $('#careof').val("MSDF")
    $('#businessphysicaladdress1').val("Ogbojo near the ogbojo ga")
    $('#firstname').val("Daniel")
    $('#legalidtype').val("P")
    $('#tin').val()
    $('#upiidentifier').val("9874562348")
    $('#startdate').val("2021-10-05")
    $('#businessphysicaladdress2').val("Ogbojo near the ogbojo ga")
    $('#lastname').val("Abban")
    $('#doingbusinessas').val("omarcompanyltd")
    $('#status').val("N")
    $('#type').val("Email")
    $('#country').val("288")
    $('#businessphysicaladdress3').val("Ogbojo near the ogbojo ga")
    $('#function').val("CEO")
    $('#state').val("001")
    $('#zipcode').val("00000001")
    $('#postalcode').val("00000001")
    $('#mainactivity').val("789465")
    $('#mainactivitytype').val("P")
    $('#legalform').val("P")
    $('#contractnumber').val()
    $('#acctstartdt').val("2021-01-21")
    this.sites = [{
      "location": "00001",
      "typeOfSite": "2",
      "openingDate": "23/02/2021",
      "country": "288",
      "region": "001",
      "city": "00001",
      "physicalAddress1": "P.O.Box123",
      "physicalAddress2": "P.O.Box123",
      "physicalAddress3": "P.O.Box123",
      "digitalAddress": "P.O.Box123",
      "name": "Site 1",
      "email": "kojo.manu@gmail.com",
      "mobileNumber": "0245821491",
      "status": "N",
      "state": "001",
      "postalCode": "00000001",
      "zipCode": "00000001",
      "acceptorPoints": [{
        "name": "papaye01",
        "acronym": "PapayeLtd",
        "mobileNumber": "0245821491"
      }]
    }]
  }


  onCCSelection(value: string) {
    console.log("the selected value is" + value);
  }

  dsign(merchant) {
    console.log("signature " + merchant)
    this.gipService.generateSignture(merchant).subscribe(
      data => {
        console.log("signature " + data)
        merchant = data;
      }
      , err => {
        console.log(" erreur siganture")
      }
    );

  }

  onRegister(merchant) {
    console.log(merchant)

    /*  this.gipService.generateSignture(merchant).subscribe(
   
       data=>{
         
         this.merchant = data;
         console.log("signature " + this.merchant )
       }
       ,err=>{ 
         console.log(" erreur siganture")
      
       });
      console.log(merchant)
   */
    /*if(!merchant.firstName.trim() || !merchant.lastName.trim() || !merchant.username.trim() || !merchant.password.trim() || !merchant.repassword.trim() || !merchant.accountMerchant.trim() || !merchant.bank.trim() || !merchant.phone.trim() || !merchant.email.trim()){
    this.Errpass= true;
          //--this.Errpass1=false;
         /* this.showmsg = true;
        this.msgarray = false;
        this.msg1 = "Username is mandatory";*/
    // this.valid= false;
    //this.hide=true;
    /* }
     else{*/
    this.gipService.register(merchant).subscribe(
      data => {
        this.merchant = data;
        this.mode = 1;
        this.show = true;
        console.log(" merchant returned " + this.merchant)
        console.log("commercant  est ajouter")
      }
      , err => {
        this.mode = 0;
        console.log("erreuur")
      });
    //-- this.Errpass=false;}
  }


  autochargement() {
    this.gipService.getBanques().subscribe(datab => {

      this.banques = datab;
      console.log(this.banques)
    }, err => {
      console.log("erreur de connexion")
      //this.authenticatService.logout();
      this.router.navigateByUrl("/addMerchant")

    });

  }
  //+++
  getLogin() {
    return JSON.parse(localStorage.getItem('user')).login;
  }

  modal(index: number = -1) {
    const modal = this.modalService.open(NewSiteModal, { size: 'lg', backdrop: 'static', keyboard: false });
    modal.result.then(
      (newRow) => {
        if (index == -1) {
          this.sites.push(newRow);
        }
        else {
          this.sites.splice(index, 1, newRow);
        }
      },
      () => {

      }
    );
    $('#sitebranch').val($('#branch').val());
    $('#sitecompanyname').val($('#companyname').val());
    if (index > -1) {
      NewSiteModal.acceptorPoints = this.sites[index].acceptorPoints;

      $('#sitelocation').val(this.sites[index].location);
      $('#sitetypeofsite').val(this.sites[index].typeOfSite);
      $('#siteopeningdate').val(this.sites[index].openingDate);
      $('#sitecountry').val(this.sites[index].country);
      $('#siteregion').val(this.sites[index].region);
      $('#sitecity').val(this.sites[index].city);
      $('#sitephysicaladdress1').val(this.sites[index].physicalAddress1);
      $('#sitephysicaladdress2').val(this.sites[index].physicalAddress2);
      $('#sitephysicaladdress3').val(this.sites[index].physicalAddress3);
      $('#sitedigitaladdress').val(this.sites[index].digitalAddress);
      $('#sitename').val(this.sites[index].name);
      $('#siteemail').val(this.sites[index].email);
      $('#sitemobilenumber').val(this.sites[index].mobileNumber);
      $('#sitestatus').val(this.sites[index].status);
      $('#sitestate').val(this.sites[index].state);
      $('#sitepostalcode').val(this.sites[index].postalCode);
      $('#sitezipcode').val(this.sites[index].zipCode);

    }
    else {
      NewSiteModal.acceptorPoints = [];
    }
  }

  remove(index) {
    removeFromArray(this.sites, index);
  }

  send() {

    let userCapturing = this.userName = localStorage.getItem('forgotpass')

    this.sending = true;
    let merchant = {
      "bank": $('#bank').val(),
      "accountNumber": $('#accountnumber').val(),
      "visaIdentifier": $('#visaidentifier').val(),
      "usage": $('#usage').val(),
      "region": $('#region').val(),
      "digitalAddress": $('#digitaladdress').val(),
      "email": $('#email').val(),
      "branch": $('#branch').val(),
      "companyName": $('#companyname').val(),
      "openingDate": $('#openingdate').val(),
      "sendingMode": $('#sendingmode').val(),
      "city": $('#city').val(),
      "title": $('#title').val(),
      "mobileNumber": $('#mobilenumber').val(),
      "businessRegNo": $('#businessregno').val(),
      "mcc": $('#mcc').val(),
      "mastercardIdentifier": $('#mastercardidentifier').val(),
      "careOf": $('#careof').val(),
      "businessPhysicalAddress1": $('#businessphysicaladdress1').val(),
      "firstName": $('#firstname').val(),
      "legalIdType": $('#legalidtype').val(),
      "tin": $('#tin').val(),
      "upiIdentifier": $('#upiidentifier').val(),
      "startDate": $('#startdate').val(),
      "businessPhysicalAddress2": $('#businessphysicaladdress2').val(),
      "lastName": $('#lastname').val(),
      "doingBusinessAs": $('#doingbusinessas').val(),
      "status": $('#status').val(),
      "type": $('#type').val(),
      "country": $('#country').val(),
      "businessPhysicalAddress3": $('#businessphysicaladdress3').val(),
      "function": $('#function').val(),
      "sites": this.sites,
      "state": $('#state').val(),
      "zipCode": $('#zipcode').val(),
      "postalCode": $('#postalcode').val(),
      "mainActivity": $('#mainactivity').val(),
      "mainactivityType": $('#mainactivitytype').val(),
      "legalForm": $('#legalform').val(),
      "contractNumber": $('#contractnumber').val(),
      "acctStartDt": $('#acctstartdt').val(),
      /* SAFIA */
      "dateOfIncorporation": $('#dateOfIncorporation').val()
    };

    console.log(merchant);

    this.gipService.addMerchant(merchant).subscribe(data => {

      if ($('#companyName').empty || $('#contractnumber').empty || $('#mainactivity').empty || $('#mainactivitytype').empty
        || $('#startdate').empty || $('#firstname').empty || $('#lastname').empty || $('#email').empty || $('#mobilenumber').empty
        || $('#sitestatus').empty || $('#sitename').empty || $('#sitelocation').empty || $('#siteopeningdate').empty
        || $('#siteemail').empty || $('#sitemobilenumber').empty
        || $('#acceptorpoint').empty || $('#acceptorpointacronym').empty || $('#acceptorpointmobilenumber').empty
      ) {
        this.errorMessage = "Please fill in the required fields."
      }

      else if (data['respCode'] == "001") {
        this.errorMessage = "Failed to add merchant."
      }
      else if (data['respCode'] == "000") {
        this.mode = 1;
        this.show = true;
        setTimeout(() => {
          this.router.navigateByUrl('/merchant');
        }, 3000);
      }
      this.sending = false;
    }
      , err => {
        this.mode = 0;
        this.errorMessage = "Failed to add merchant."
        this.sending = false;
      });
  }

}

@Component({
  templateUrl: './new-merchant-new-site.html',
  styleUrls: ['./new-merchant.component.css']
})
export class NewSiteModal {

  index: number;
  static acceptorPoints = [];

  errorMessage: string;


  siteRegions: MerchantRegions[];
  siteCities: MerchantCities[];
  siteCountries: Countries[]
  siteStatus: SiteStatus[];
  siteZipCodes: ZipCodes[];

  get accPoints() {
    return NewSiteModal.acceptorPoints;
  }

  // constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) {}
  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal, private gipService: GipService) { }

  ngOnInit() {

    /*21.09.2021 */
    this.gipService.getMerchantRegions().subscribe(data => {
      this.siteRegions = data;
      console.log('Site regions ', data);
    });
    /* SAFIA 21.09.2021 */
    this.gipService.getMerchantCities().subscribe(data => {
      this.siteCities = data;
      console.log('Site Cities ', data);
    });

    /*SAFIA 21.09.2021 */
    this.gipService.getCountries().subscribe(data => {
      this.siteCountries = data;
      console.log('Site Countries ', data);
    });

    /*SAFIA 21.09.2021 */
    this.gipService.getSiteStatus().subscribe(data => {
      this.siteStatus = data;
      console.log('Site Status ', data);
    });

    /*SAFIA 21.09.2021 */
    this.gipService.getZipCodes().subscribe(data => {
      this.siteZipCodes = data;
      console.log(data);
    });
  }

  modal(index: number = -1) {
    this.modalService.open(NewAcceptorPointModal, { backdrop: 'static', keyboard: false }).result.then(
      (newRow) => {
        if (index == -1) {
          NewSiteModal.acceptorPoints.push(newRow);
        }
        else {
          NewSiteModal.acceptorPoints.splice(index, 1, newRow);
        }
      },
      () => {

      });
    $('#acceptorpointcompanyname').val($('#companyname').val());
    $('#acceptorpointdescription').val($('#sitelocation').val());
    if (index > -1) {
      $('#acceptorpoint').val(NewSiteModal.acceptorPoints[index].name);
      $('#acceptorpointacronym').val(NewSiteModal.acceptorPoints[index].acronym);
      $('#acceptorpointmobilenumber').val(NewSiteModal.acceptorPoints[index].mobileNumber);
    }
  }

  save() {

    if ($('#sitestatus').empty || $('#sitename').empty || $('#sitelocation').empty || $('#siteopeningdate').empty
    || $('#siteemail').empty || $('#sitemobilenumber').empty
  ) {
    this.errorMessage = "Please fill in the required fields."
  }else{
    let newRow = {
      "location": $('#sitelocation').val(),
      "typeOfSite": $('#sitetypeofsite').val(),
      "openingDate": $('#siteopeningdate').val(),
      "country": $('#sitecountry').val(),
      "region": $('#siteregion').val(),
      "city": $('#sitecity').val(),
      "physicalAddress1": $('#sitephysicaladdress1').val(),
      "physicalAddress2": $('#sitephysicaladdress2').val(),
      "physicalAddress3": $('#sitephysicaladdress3').val(),
      "digitalAddress": $('#sitedigitaladdress').val(),
      "email": $('#siteemail').val(),
      "mobileNumber": $('#sitemobilenumber').val(),
      "acceptorPoints": NewSiteModal.acceptorPoints,
      "name": $('#sitename').val(),
      "status": $('#sitestatus').val(),
      "state": $('#sitestate').val(),
      "postalCode": $('#sitepostalcode').val(),
      "zipCode": $('#sitezipcode').val()
    };


    this.activeModal.close(newRow);
  }
  
  }

  remove(index) {
    removeFromArray(NewSiteModal.acceptorPoints, index);
  }

  close() {
    if (confirm("Do you really want to close the modal ? All unsaved data will be lost !"))
      this.activeModal.dismiss();
  }
}

@Component({
  templateUrl: './new-merchant-new-acceptor-point.html',
  styleUrls: ['./new-merchant.component.css']
})
export class NewAcceptorPointModal {

  errorMessage: string;

  constructor(public activeModal: NgbActiveModal) {
    console.log(this)
  }

  save() {

    if ($('#acceptorpoint').empty || $('#acceptorpointacronym').empty || $('#acceptorpointmobilenumber').empty) {
    this.errorMessage = "Please fill in the required fields."
  }else{
    let newRow = {
      "name": $('#acceptorpoint').val(),
      "acronym": $('#acceptorpointacronym').val(),
      "mobileNumber": $('#acceptorpointmobilenumber').val()
    };

    this.activeModal.close(newRow);
  }
    
  }

  close() {
    if (confirm("Do you really want to close the modal ? All unsaved data will be lost !"))
      this.activeModal.dismiss();
  }
}

function removeFromArray(array: Array<any>, index) {
  array.splice(index, 1);
}
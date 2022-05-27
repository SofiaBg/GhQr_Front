import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BnNgIdleService } from 'bn-ng-idle';
import { BaseComponent } from '../BaseComponent/BaseComponent';
import { AcceptorPointDto } from '../classes/AcceptorPointDto';
import { BranchLocator } from '../classes/branch-locator';
import { Countries } from '../classes/Countries';
import { MerchantBank } from '../classes/MerchantBank';
import { MerchantBranch } from '../classes/MerchantBranch';
import { MerchantCities } from '../classes/MerchantCities';
import { MerchantDto } from '../classes/MerchantDto';
import { MerchantLegalIDType } from '../classes/MerchantLegalDType';
import { MerchantLegalForm } from '../classes/MerchantLegalForm';
import { MerchantMCC } from '../classes/MerchantMCC';
import { MerchantRegions } from '../classes/MerchantRegions';
import { MerchantStatus } from '../classes/MerchantStatus';
import { MerchantUsage } from '../classes/MerchantUsage';
import { ModeSending } from '../classes/ModeSending';
import { SiteDto } from '../classes/SiteDto';
import { ZipCodes } from '../classes/ZipCodes';
import { GipService } from '../services/gip.service';

@Component({
  selector: 'app-new-single-merchant',
  templateUrl: './new-single-merchant.component.html',
  styleUrls: ['./new-single-merchant.component.css']
})
export class NewSingleMerchantComponent extends BaseComponent implements OnInit {

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
  branchLocator: BranchLocator[];
  stringJson: any;
  public stringObject: any;
  errorMessage: string;
  regN: any;

  qrMerchant = new MerchantDto();
  qrSite = new SiteDto();
  qrAcceptorPoint = new AcceptorPointDto();
  form : FormGroup;
  qrSiteToCreate : boolean = false;
  qrAcceptorPointToCreate : boolean = false;
  showMessageSave: boolean = false;
  saved: boolean = false;


  c: number = 0;
  a: number = 0;

  constructor(private gipService: GipService,
             router: Router,
              private bnIdle: 
              BnNgIdleService, 
              private modalService: NgbModal,
              private formGroup : FormBuilder
              ) {
    super(router);
    this.form = formGroup.group({
      accountNumber : [this.qrMerchant.accountNumber, Validators.required],
      bank : [ this.qrMerchant.bank, Validators.required],
      branch : [this.qrMerchant.branch, Validators.required],
      businessRegNo : [this.qrMerchant.businessRegNo, Validators.required],
      legalIdType : [this.qrMerchant.legalIdType, Validators.required],
      legalId : [this.qrMerchant.legalId, Validators.required],
      doingBuninessAs : [this.qrMerchant.doingBuninessAs, Validators.required],
      companyName : [this.qrMerchant.companyName, Validators.required],
      mcc : [this.qrMerchant.mcc, Validators.required],
      tin : [this.qrMerchant.tin, Validators.required],
      status : [this.qrMerchant.status, Validators.required],
      visaIdentifier : [this.qrMerchant.visaIdentifier, Validators.required],
      openingDate : [this.qrMerchant.openingDate, Validators.required],
      masterCardIdentifier : [this.qrMerchant.masterCardIdentifier, Validators.required],
      upiIdentifier : [this.qrMerchant.upiIdentifier, Validators.required],
      contractNumber : [this.qrMerchant.contractNumber, Validators.required],
      legalForm : [this.qrMerchant.legalForm, Validators.required],
      accountStartDate : [this.qrMerchant.accountStartDate, Validators.required],
      mainActivityType : [this.qrMerchant.mainActivityType, Validators.required],
      mainActivity : [this.qrMerchant.mainActivity, Validators.required],
      dateOfIncorporation : [this.qrMerchant.dateOfIncorporation, Validators.required],
      type : [this.qrMerchant.type, Validators.required],
      usage : [this.qrMerchant.usage, Validators.required],
      sendingMode : [this.qrMerchant.sendingMode, Validators.required],
      careOf : [this.qrMerchant.careOf, Validators.required],
      startDate : [this.qrMerchant.startDate, Validators.required],
      country : [this.qrMerchant.country, Validators.required],
      region : [this.qrMerchant.region, Validators.required],
      city : [this.qrMerchant.city, Validators.required],
      businessPhysicalAddress1 : [this.qrMerchant.businessPhysicalAddress1, Validators.required],
      businessPhysicalAddress2 : [this.qrMerchant.businessPhysicalAddress2, Validators.required],
      businessPhysicalAddress3 : [this.qrMerchant.businessPhysicalAddress3, Validators.required],
      digitalAddress : [this.qrMerchant.digitalAddress, Validators.required],
      state : [this.qrMerchant.state, Validators.required],
      zipCode : [this.qrMerchant.zipCode, Validators.required],
      title : [this.qrMerchant.title, Validators.required],
      firstName : [this.qrMerchant.firstName, Validators.required],
      lastName : [this.qrMerchant.lastName, Validators.required],
      function : [this.qrMerchant.function, Validators.required],
      email : [this.qrMerchant.email, Validators.required],
      mobileNumber : [this.qrMerchant.mobileNumber, Validators.required]
    })

  }

  createQrSite(){
    this.qrSiteToCreate == true;
    let site = new SiteDto;
    site.idItem = this.c.valueOf();
    this.qrMerchant.sites.push(site);

    this.form.addControl("siteName"+ site.idItem, new FormControl);
    this.form.addControl("statusS"+site.idItem, new FormControl);
    this.form.addControl("location"+site.idItem, new FormControl);
    this.form.addControl("typeOfSite"+site.idItem, new FormControl);
    this.form.addControl("openingDateS"+site.idItem, new FormControl);
    this.form.addControl("countryS"+site.idItem, new FormControl);
    this.form.addControl("regionS"+site.idItem, new FormControl);
    this.form.addControl("cityS"+site.idItem, new FormControl);
    this.form.addControl("physicalAddress1"+site.idItem, new FormControl);
    this.form.addControl("physicalAddress2"+site.idItem, new FormControl);
    this.form.addControl("physicalAddress3"+site.idItem, new FormControl);
    this.form.addControl("digitalAddressS"+site.idItem, new FormControl);
    this.form.addControl("stateS"+site.idItem, new FormControl);
    this.form.addControl("postalCode"+site.idItem, new FormControl);
    this.form.addControl("statusS"+site.idItem, new FormControl);
    this.form.addControl("zipCodeS"+site.idItem, new FormControl);
    this.form.addControl("emailS"+site.idItem, new FormControl);
    this.form.addControl("mobileNumberS"+site.idItem, new FormControl);

    this.c++;
  }
  

  createQrAcceptorpoint(){
    this.qrAcceptorPointToCreate == true;
    let acceptorPoint = new AcceptorPointDto;
    acceptorPoint.idItem = this.a.valueOf();
    this.qrSite.acceptorPoints.push(acceptorPoint);

    this.form.addControl("description"+ acceptorPoint.idItem, new FormControl);
    this.form.addControl("acceptorPoint"+ acceptorPoint.idItem, new FormControl);
    this.form.addControl("acronym"+ acceptorPoint.idItem, new FormControl);
    this.form.addControl("mobileNumberA"+ acceptorPoint.idItem, new FormControl);

    this.a++;
  }

  save() {
    console.log(this.qrMerchant);
    console.log("***** START SAVE merchant *****");

    console.log(this.qrMerchant, "Merchant");
    this.gipService.saveMerchant(this.qrMerchant).subscribe((data) => {
      console.log("data", data);
      if (data["respCode"] == "000") {
        console.log("User added successfully");
        this.showMessageSave = true;
        setTimeout(() => {
          this.router.navigateByUrl("/merchant");
        }, 4000);
        // this.router.navigateByUrl('/login');
      } else if (data["respCode"] == "001") {
        this.errorMessage = "Failed to save merchant.";
        console.log("Failed to save merchant");
        this.saved = true;
      }
    });
    }

  ngOnInit() {
    this.gipService.getMerchantBranchLocator().subscribe((data) => {
      console.log("get branch");
      this.branchLocator = data;
      console.log(data);
    });

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
  }

  merchantPage() {
    this.router.navigateByUrl("/merchant") 
   if (localStorage.getItem('role') == 'BRANCH OFFICIER') {
      this.router.navigate(['/createSingleBulkMerchant'])
      return false;
    } else if(localStorage.getItem('role') == 'OFFICIER'){
      this.router.navigate(['/merchant'])
    }
  }

  getMerchantInfoByAccountNumber(accountNumber) {
    accountNumber = $('#accountnumber').val();
    console.log('Account Number = ', accountNumber)

    this.gipService.getMerchantInfoByAccountNumber(accountNumber).subscribe(data => {
      console.log(data);
      
      this.stringJson = JSON.stringify(data);
      console.log("String json object :", this.stringJson);
      console.log("Type :", typeof this.stringJson);

      this.stringObject = JSON.parse(this.stringJson);
      console.log("JSON object -", this.stringObject);
      console.log(this.stringObject.address)

      if (data === null || data === undefined) {
        this.errorMessage = "No, informations to show."
      }
    });

    $('#businessregno').val(this.regN);
  }


}
function removeFromArray(array: Array<any>, index) {
  array.splice(index, 1);
}
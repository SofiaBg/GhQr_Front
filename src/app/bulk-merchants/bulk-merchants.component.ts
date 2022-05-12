import { DOCUMENT, ViewportScroller } from '@angular/common';
import { Component, OnInit, ViewChild, Renderer2, Inject, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CSVRecord } from '../classes/CSVRecord';
import { GipService } from '../services/gip.service';

@Component({
  selector: 'app-bulk-merchants',
  templateUrl: './bulk-merchants.component.html',
  styleUrls: ['./bulk-merchants.component.css']
})

/**
 * SAFIA 02.12.2021
 */

export class BulkMerchantsComponent implements OnInit {
  currentpage: number = 0;
  totalPages: number;
  pages: Array<any>;
  pagesize: number = 5;
  pagenumber: number;
  public records: any[] = [];
 
  selectedRecord : CSVRecord;

  result: any = null;
  showResult :  any[] =  this.result;
  showError: boolean = false;
  public errorMessage: string;
  showSuccess: boolean=false;

  @ViewChild('csvReader', { static: false }) csvReader: any;


  pageYoffset = 0;
  @HostListener('window:scroll', ['$event']) onScroll(event){
    this.pageYoffset = window.pageYOffset;
  }

  scrollToTop(){
    this.scroll.scrollToPosition([0,0]);
  }

  constructor( private router : Router,private gipService : GipService ,private _renderer2: Renderer2, 
    @Inject(DOCUMENT) private _document: Document, private scroll : ViewportScroller) { }

  ngOnInit() {

    // let script = this._renderer2.createElement('script');
    //     script.type = `application/javascript`;
    //     script.text = `
    //         {
    //           var app = angular.module('MyApp', [])
    //           app.controller('MyController', function ($scope, $window) {
                  
    //               $scope.GetDetails = function (index) {
    //                   var name = $scope.records[index].ID;
    //                   $window.alert("ID: " + name );
    //               };
    //           });
    //         }
    //     `;

    //     this._renderer2.appendChild(this._document.body, script);

  }

  uploadListener($event: any): void {

    let text = [];
    let files = $event.srcElement.files;

    if (this.isValidCSVFile(files[0])) {

      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);

        let headersRow = this.getHeaderArray(csvRecordsArray);

        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);

        this.result= this.records;
        this.showResult = this.result.slice(this.currentpage * this.pagesize, (this.currentpage + 1) * this.pagesize);
        this.successMessage ='File uploaded successfully!'
        console.log('File uploaded successfully!');
        this.showSuccess=true;
      };

      reader.onerror = function () {
        let errorMessage:string;
        console.log('error is occured while reading file!');
       errorMessage ='error is occured while reading file!'
      };

    } else {
      // alert("Please import valid .csv file.");
      this.errorMessage='Please import valid .csv file'
      console.log('Please import valid .csv file')
      this.showError=true;
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      if (curruntRecord.length == headerLength) {
        let csvRecord: CSVRecord = new CSVRecord();
        // csvRecord.id = curruntRecord[0].trim();
        csvRecord.accountNumber = curruntRecord[0].trim();
        csvRecord.bank = curruntRecord[1].trim();
        csvRecord.branch = curruntRecord[2].trim();
        csvRecord.businessRegNo = curruntRecord[3].trim();
        csvRecord.legalIdType = curruntRecord[4].trim()
        csvRecord.legalId = curruntRecord[5].trim()
        csvRecord.doingBuninessAs = curruntRecord[6].trim()
        csvRecord.companyName = curruntRecord[7].trim();
        csvRecord.mcc = curruntRecord[8].trim()
        csvRecord.tin = curruntRecord[9].trim()
        csvRecord.status = curruntRecord[10].trim()
        csvRecord.visaIdentifier = curruntRecord[11].trim()
        csvRecord.openingDate = curruntRecord[12].trim()
        csvRecord.masterCardIdentifier = curruntRecord[13].trim()
        csvRecord.upiIdentifier = curruntRecord[14].trim()
        csvRecord.contractNumber = curruntRecord[15].trim()
        csvRecord.legalForm = curruntRecord[16].trim()
        csvRecord.accountStartDate = curruntRecord[17].trim()
        csvRecord.mainActivityType = curruntRecord[18].trim()
        csvRecord.mainActivity = curruntRecord[19].trim()
        csvRecord.dateOfIncorporation = curruntRecord[20].trim();
        csvRecord.type = curruntRecord[21].trim()
        csvRecord.usage = curruntRecord[22].trim()
        csvRecord.sendingMode = curruntRecord[23].trim()
        csvRecord.careOf = curruntRecord[24].trim()
        csvRecord.startDate = curruntRecord[25].trim()
        csvRecord.country = curruntRecord[26].trim()
        csvRecord.region = curruntRecord[27].trim()
        csvRecord.city = curruntRecord[28].trim()
        csvRecord.businessPhysicalAddress1 = curruntRecord[29].trim()
        csvRecord.businessPhysicalAddress2 = curruntRecord[30].trim()
        csvRecord.businessPhysicalAddress3 = curruntRecord[31].trim()
        csvRecord.digitalAddress = curruntRecord[32].trim()
        csvRecord.state = curruntRecord[33].trim()
        csvRecord.zipCode = curruntRecord[34].trim()
        csvRecord.title = curruntRecord[35].trim()
        csvRecord.firstName = curruntRecord[36].trim();
        csvRecord.lastName = curruntRecord[37].trim();
        csvRecord.function = curruntRecord[38].trim()
        csvRecord.email = curruntRecord[39].trim()
        csvRecord.mobileNumber = curruntRecord[40].trim()
        csvRecord.siteName = curruntRecord[41].trim()
        csvRecord.statusS = curruntRecord[42].trim()
        csvRecord.location = curruntRecord[43].trim()
        csvRecord.typeOfSite = curruntRecord[44].trim();
        csvRecord.openingDate = curruntRecord[45].trim()
        csvRecord.countryS = curruntRecord[46].trim()
        csvRecord.regionS = curruntRecord[47].trim()
        csvRecord.cityS = curruntRecord[48].trim()
        csvRecord.physicalAddress1 = curruntRecord[49].trim()
        csvRecord.physicalAddress2 = curruntRecord[50].trim()
        csvRecord.physicalAddress3 = curruntRecord[51].trim()
        csvRecord.digitalAddressS = curruntRecord[52].trim()
        csvRecord.stateS = curruntRecord[53].trim()
        csvRecord.postalCode = curruntRecord[54].trim()
        csvRecord.zipCodeS = curruntRecord[55].trim()
        csvRecord.emailS = curruntRecord[56].trim()
        csvRecord.mobileNumberS = curruntRecord[57].trim()
        csvRecord.description = curruntRecord[58].trim()
        csvRecord.acceptorPoint = curruntRecord[59].trim()
        csvRecord.acronym = curruntRecord[60].trim()
        csvRecord.mobileNumberA = curruntRecord[61].trim()
        csvArr.push(csvRecord);
      }
      else{
        console.log('Missed data, Please check your file!')
      }
    }
    return csvArr;
  }

  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) { 
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.csvReader.nativeElement.value = "";
    this.records = [];
  }

  deleteRow(x) {
    this.showResult.splice(x, 1);
    this.successMessage = "Merchant removed successfully."

  }


  onsizechange() {
    this.totalPages = Math.ceil(this.result.length / this.pagesize);
    if (this.currentpage + 1 > this.pagesize) {
      this.currentpage = 0;
    }
    this.showResult = this.result.slice(this.currentpage * this.pagesize, (this.currentpage + 1) * this.pagesize);
  }

  gotoPage(i: number) {
    this.currentpage = i;
    this.showResult = this.result.slice(this.currentpage * this.pagesize, (this.currentpage + 1) * this.pagesize);
  }

  gotoPageFromInput() {
    if (this.pagenumber > 0 && this.pagenumber < this.records.length + 1) {
      this.gotoPage(this.pagenumber);
    }
  }

  onKey(event) {
    this.pagenumber = Number(event.target.value) - 1;
  }


 
  onSelect( csvRecord : CSVRecord) : void{
    this.selectedRecord =  csvRecord;
  }


  recordForm=new FormGroup({  
    accountNumber:new FormControl('',[Validators.required]), 
    bank :new FormControl('',[Validators.required]), 
    branch:new FormControl('',[Validators.required]), 
    businessRegNo:new FormControl('',[Validators.required]), 
    legalIdType:new FormControl('',[Validators.required]), 
    legalId:new FormControl('',[Validators.required]), 
    doingBuninessAs:new FormControl('',[Validators.required]), 
    companyName:new FormControl('',[Validators.required]), 
    mcc:new FormControl('',[Validators.required]), 
    tin:new FormControl('',[Validators.required]), 
    status:new FormControl('',[Validators.required]), 
    visaIdentifier:new FormControl('',[Validators.required]), 
    openingDate:new FormControl('',[Validators.required]), 
    masterCardIdentifier:new FormControl('',[Validators.required]), 
    upiIdentifier:new FormControl('',[Validators.required]), 
    contractNumber:new FormControl('',[Validators.required]), 
    legalForm:new FormControl('',[Validators.required]), 
    accountStartDate:new FormControl('',[Validators.required]), 
    mainActivityType:new FormControl('',[Validators.required]), 
    mainActivity:new FormControl('',[Validators.required]), 
    dateOfIncorporation:new FormControl('',[Validators.required]), 
    type:new FormControl('',[Validators.required]), 
    usage:new FormControl('',[Validators.required]), 
    sendingMode:new FormControl('',[Validators.required]), 
    careOf:new FormControl('',[Validators.required]), 
    startDate:new FormControl('',[Validators.required]), 
    country:new FormControl('',[Validators.required]), 
    region:new FormControl('',[Validators.required]), 
    city:new FormControl('',[Validators.required]), 
    businessPhysicalAddress1:new FormControl('',[Validators.required]), 
    businessPhysicalAddress2:new FormControl('',[Validators.required]), 
    businessPhysicalAddress3:new FormControl('',[Validators.required]), 
    digitalAddress:new FormControl('',[Validators.required]), 
    state:new FormControl('',[Validators.required]), 
    zipCode:new FormControl('',[Validators.required]), 
    title:new FormControl('',[Validators.required]), 
    firstName:new FormControl('',[Validators.required]), 
    lastName:new FormControl('',[Validators.required]), 
    function:new FormControl('',[Validators.required]), 
    email:new FormControl('',[Validators.required,Validators.email]), 
    mobileNumber:new FormControl('',[Validators.required,Validators.minLength(10)]), 
    siteName:new FormControl('',[Validators.required]), 
    statusS:new FormControl('',[Validators.required]), 
    location:new FormControl('',[Validators.required]), 
    typeOfSite:new FormControl('',[Validators.required]), 
    openingDateS:new FormControl('',[Validators.required]), 
    countryS:new FormControl('',[Validators.required]), 
    regionS:new FormControl('',[Validators.required]), 
    cityS:new FormControl('',[Validators.required]), 
    physicalAddress1:new FormControl('',[Validators.required]), 
    physicalAddress2:new FormControl('',[Validators.required]), 
    physicalAddress3:new FormControl('',[Validators.required]), 
    digitalAddressS:new FormControl('',[Validators.required]), 
    stateS:new FormControl('',[Validators.required]), 
    postalCode:new FormControl('',[Validators.required]), 
    zipCodeS:new FormControl('',[Validators.required]), 
    emailS:new FormControl('',[Validators.required]), 
    mobileNumberS:new FormControl('',[Validators.required,Validators.minLength(10)]), 
    description:new FormControl('',[Validators.required]), 
    acceptorPoint:new FormControl('',[Validators.required]), 
    acronym:new FormControl('',[Validators.required]), 
    mobileNumberA:new FormControl('',[Validators.required,Validators.minLength(10)]), 
 
    

    student_branch:new FormControl()  
  });  


  success : boolean = false;
  error : boolean = false;
  errMessage : boolean = false;
  successMessage : string;
  // errorMessage : string;

  deleteRows(d){
    const index = this.showResult.indexOf(d);
    this.showResult.splice(index, 1);
}
  
  saveRecord(csvRecord : CSVRecord ){
    console.log('-- START SAVE RECORD -- ',csvRecord)
    let x : CSVRecord;
    this.gipService.saveRecord(csvRecord).subscribe(data => {
      console.log('DATA ', data)
      if(data['respCode'] == "000"){
        this.success = true;
        this.error = false;
        this.successMessage = "Merchant saved successfully."
        setTimeout(() => {
          this.deleteRows(csvRecord)
          this.router.navigateByUrl('/bulkMerchants');
        }, 3000);
      } else {
        this.success = false;
        this.error = true;
        this.errMessage = data['respDesc'];
      }
    }
    ,err=>{
      this.success = false;
      this.error = true;
    }); 

  }

  merchant(){
    if (localStorage.getItem('role') == 'ADMIN') {

      this.router.navigate(['/adminList']);
      return false;
    } else if (localStorage.getItem('role') == 'USER') {
      this.router.navigate(['/transactions']);
      return false;
    } else if (localStorage.getItem('role') == 'SUB USER') {
      this.router.navigate(['/transactions'])
      return false
    } else if (localStorage.getItem('role') == 'MANAGER') {
      this.router.navigate(['/merchantList'])
      return false;
    } else if (localStorage.getItem('role') == 'BRANCH MANAGER') {
      this.router.navigate(['/getAllBulkMerchantsFoValidation']);
      return false;
    } else if (localStorage.getItem('role') == 'BRANCH OFFICIER') {
      this.router.navigate(['/createSingleBulkMerchant'])
      return false;
    } else if(localStorage.getItem('role') == 'OFFICIER'){
      this.router.navigate(['/merchant'])
    }  }
  
}

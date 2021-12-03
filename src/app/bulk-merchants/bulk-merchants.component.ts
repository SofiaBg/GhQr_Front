import { DOCUMENT } from '@angular/common';
import { Component, OnInit, ViewChild, Renderer2, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CSVRecord } from '../classes/CSVRecord';

@Component({
  selector: 'app-bulk-merchants',
  templateUrl: './bulk-merchants.component.html',
  styleUrls: ['./bulk-merchants.component.css']
})

/**SAFIA 02.12.2021 */
export class BulkMerchantsComponent implements OnInit {
  currentpage: number = -1;
  totalPages: number;
  pages: Array<any>;
  pagesize: number = 5;
  pagenumber: number;
  public records: any[] = [];
  showResult :  any[] =  this.records;

  @ViewChild('csvReader', { static: false }) csvReader: any;


  constructor(  private _renderer2: Renderer2, 
    @Inject(DOCUMENT) private _document: Document) { }

  ngOnInit() {

    let script = this._renderer2.createElement('script');
        script.type = `application/javascript`;
        script.text = `
            {
              var app = angular.module('MyApp', [])
              app.controller('MyController', function ($scope, $window) {
                  
                  $scope.GetDetails = function (index) {
                      var name = $scope.records[index].ID;
                      $window.alert("ID: " + name );
                  };
              });
            }
        `;

        this._renderer2.appendChild(this._document.body, script);

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

        this.showResult = this.records.slice(this.currentpage * this.pagesize, (this.currentpage + 1) * this.pagesize);

      };

      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };

    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];

    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      if (curruntRecord.length == headerLength) {
        let csvRecord: CSVRecord = new CSVRecord();
        csvRecord.id = curruntRecord[0].trim();
        csvRecord.accountNumber = curruntRecord[1].trim();
        csvRecord.bank = curruntRecord[2].trim();
        csvRecord.branch = curruntRecord[3].trim();
        csvRecord.businessRegNo = curruntRecord[4].trim();
        csvRecord.legalIdType = curruntRecord[5].trim()
        csvRecord.legalId = curruntRecord[6].trim()
        csvRecord.doingBuninessAs = curruntRecord[7].trim()
        csvRecord.companyName = curruntRecord[8].trim();
        csvRecord.mcc = curruntRecord[9].trim()
        csvRecord.tin = curruntRecord[10].trim()
        csvRecord.status = curruntRecord[11].trim()
        csvRecord.visaIdentifier = curruntRecord[12].trim()
        csvRecord.openingDate = curruntRecord[13].trim()
        csvRecord.masterCardIdentifier = curruntRecord[14].trim()
        csvRecord.upiIdentifier = curruntRecord[15].trim()
        csvRecord.contractNumber = curruntRecord[16].trim()
        csvRecord.legalForm = curruntRecord[17].trim()
        csvRecord.accountStartDate = curruntRecord[18].trim()
        csvRecord.mainActivityType = curruntRecord[19].trim()
        csvRecord.mainActivity = curruntRecord[20].trim()
        csvRecord.dateOfIncorporation = curruntRecord[21].trim();
        csvRecord.type = curruntRecord[22].trim()
        csvRecord.usage = curruntRecord[23].trim()
        csvRecord.sendingMode = curruntRecord[24].trim()
        csvRecord.careOf = curruntRecord[25].trim
        csvRecord.startDate = curruntRecord[26].trim()
        csvRecord.country = curruntRecord[27].trim()
        csvRecord.region = curruntRecord[28].trim()
        csvRecord.city = curruntRecord[29].trim()
        csvRecord.businessPhysicalAddress1 = curruntRecord[30].trim()
        csvRecord.businessPhysicalAddress2 = curruntRecord[31].trim()
        csvRecord.businessPhysicalAddress3 = curruntRecord[32].trim()
        csvRecord.digitalAddress = curruntRecord[33].trim()
        csvRecord.state = curruntRecord[34].trim()
        csvRecord.zipCode = curruntRecord[35].trim()
        csvRecord.title = curruntRecord[36].trim()
        csvRecord.firstName = curruntRecord[37].trim();
        csvRecord.lastName = curruntRecord[38].trim();
        csvRecord.function = curruntRecord[39].trim()
        csvRecord.email = curruntRecord[40].trim()
        csvRecord.mobileNumber = curruntRecord[41].trim()
        csvRecord.siteName = curruntRecord[42].trim()
        csvRecord.statusS = curruntRecord[43].trim()
        csvRecord.location = curruntRecord[44].trim()
        csvRecord.typeOfSite = curruntRecord[45].trim();
        csvRecord.openingDate = curruntRecord[46].trim()
        csvRecord.countryS = curruntRecord[47].trim()
        csvRecord.regionS = curruntRecord[48].trim()
        csvRecord.cityS = curruntRecord[49].trim()
        csvRecord.physicalAddress1 = curruntRecord[50].trim()
        csvRecord.physicalAddress2 = curruntRecord[51].trim()
        csvRecord.physicalAddress3 = curruntRecord[52].trim()
        csvRecord.digitalAddressS = curruntRecord[53].trim()
        csvRecord.stateS = curruntRecord[54].trim()
        csvRecord.postalCode = curruntRecord[55].trim()
        csvRecord.zipCodeS = curruntRecord[56].trim()
        csvRecord.emailS = curruntRecord[57].trim()
        csvRecord.mobileNumberS = curruntRecord[58].trim()
        csvRecord.acceptorPoint = curruntRecord[59].trim()
        csvRecord.acronym = curruntRecord[60].trim()
        csvRecord.mobileNumberA = curruntRecord[61].trim()
        csvArr.push(csvRecord);
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
    this.records.splice(x, 1);
  }


  onsizechange() {
    this.totalPages = Math.ceil(this.records.length / this.pagesize);
    if (this.currentpage + 1 > this.pagesize) {
      this.currentpage = 0;
    }
    this.showResult = this.records.slice(this.currentpage * this.pagesize, (this.currentpage + 1) * this.pagesize);
  }

  gotoPage(i: number) {
    this.currentpage = i;
    this.showResult = this.records.slice(this.currentpage * this.pagesize, (this.currentpage + 1) * this.pagesize);
  }

  gotoPageFromInput() {
    if (this.pagenumber > 0 && this.pagenumber < this.records.length + 1) {
      this.gotoPage(this.pagenumber);
    }
  }

  onKey(event) {
    this.pagenumber = Number(event.target.value) - 1;
  }


  editUserContact(usercontact: CSVRecord) {
    
    console.log(usercontact);
    localStorage.removeItem('editUserId');
    localStorage.setItem('editUserId', usercontact.id.toString());
    // this.ucs.update(usercontact);
  }

}

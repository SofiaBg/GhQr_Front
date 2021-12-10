import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Person } from '../classes/Person';
import { GipService } from '../services/gip.service';

@Component({
  selector: 'app-bulk-merchants-management-list',
  templateUrl: './bulk-merchants-management-list.component.html',
  styleUrls: ['./bulk-merchants-management-list.component.css']
})
export class BulkMerchantsManagementListComponent implements OnInit {

  persons: Person[];


  constructor(private gipService : GipService, private router : Router) { }

  ngOnInit() {
    this.getAllMerchantPerson();
  }

  getAllMerchantPerson(){
    console.log('------ BULK MERCHANTS ------')
   this.gipService.getAllMerchantPerson().subscribe(data => {
     this.persons = data;
     console.log(data);
     console.log(this.persons);
   });
 }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GipService } from '../services/gip.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private router : Router,private service : GipService) { }
/* SAFIA */
  ngOnInit() {
    localStorage.clear();
    this.service.logout();
  }

  backToHome(){
    this.router.navigateByUrl('/login')
  }

}

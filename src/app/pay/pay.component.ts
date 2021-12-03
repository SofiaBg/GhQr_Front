import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GipService} from "../services/gip.service";

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {
  display:string = 'none';

  constructor(private route:ActivatedRoute,private service:GipService) { }

  ngOnInit() {
   // this.openModal()
  }


  openModal(){

    this.display='block';

  }
}

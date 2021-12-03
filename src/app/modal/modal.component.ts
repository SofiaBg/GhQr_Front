import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogData } from '../DialogData';
import {GipService} from "../services/gip.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  show:boolean=false;
  accountsPersonne:any;
  err:any;
  currentpage:number=0;
  currentPointer=1;
  hideAccouts:boolean=true;
  hidePersonOrTrans:boolean=false;
  a:number=0;

  constructor(private service:GipService,
    private dialogRef: MatDialogRef<ModalComponent>,private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
 changeStatus(creditId,status) {
    this.hidePersonOrTrans=false;
    if(this.a!=1)
      this.currentpage=0;
    this.currentPointer=17;
    this.accountsPersonne=null;
    this.hideAccouts=true;

    this.service.setNSTransactions(creditId,status).subscribe(resp => {
      this.show=true;
      //this.ngOnInit()
      this.successfull();
      this.redirection();
    }, err => {
      this.Failed();

      console.log(" erreur status ")
    })
  }

  redirection(){

    this.router.navigateByUrl("/nstransaction")

  }

  ngOnInit() {
  }
  successfull(){



    /* Swal.fire(
       'Good job!',
       'your payment is successful',
       'success',


     )*/
    Swal.fire({
      //position: 'top-end',
      type: 'success',
      title:  'your settlement is successful',
      position:"center",
      width:500
      // timer: 1500
    })

  }
  Failed() {
    Swal.fire({

      //  html: "<div style='font-size:1.6rem !important '> title </div>",
      type: 'error',
      //closeButtonHtml:'  <a (click)="redirestion()" class="text-center"> <h4>ok</h4></a>',
      title: ' <p>your settlement is failed! !</p>',
      //  text: 'payment Transaction failed!',
      // width:900,
      // customClass: 'swal-wide',
      position: 'center',
      width:500,
      //html: '<button (click)="redirestion()">Goto</button>',


    }    )
    // @ts-ignore
    //waits(4000)

    //this.finpayement==true;

    //this.redirestion();
  }
}

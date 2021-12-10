import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle';
import { Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GipService } from '../services/gip.service';

@Component({
  selector: 'app-out-session',
  templateUrl: './out-session.component.html',
  styleUrls: ['./out-session.component.css']
})
export class OutSessionComponent implements OnInit {

  constructor(private router : Router,private service : GipService, private bnIdle: BnNgIdleService) { }

  destroy = new Subject();
  showDialog = false;
  timer: number;
  dialog = 'stay logged in?';
  notice = 'session expired';
  showNotice = false;

  rxjsTimer = timer(1000, 1000);



  ngOnInit() {
    console.log('-- SESSION TIME OUT --')
    this.rxjsTimer.pipe(takeUntil(this.destroy)).subscribe(val => {
      this.timer = val;

      if (this.timer === 12) {
        console.log(this.dialog)
      }

    if (this.timer >= 10) {
      this.destroy.next();
      this.destroy.complete();
      this.service.logout();
      this.router.navigateByUrl("/login")
      this.showNotice==true;
      console.log(this.notice) ;
    }
  })
  }

}

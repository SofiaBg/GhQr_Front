import { Router } from '@angular/router';
import { HostListener, OnDestroy, OnInit } from '@angular/core';
export class BaseComponent implements OnInit {

    constructor(protected router: Router) {
        if (localStorage.getItem('user') == null || localStorage.getItem('user') == "") {
            this.router.navigateByUrl("/login")
        }
    }
    ngOnInit(): void {

    }
    // ngOnDestroy() {
    //     localStorage.clear();
    //     this.router.navigateByUrl("/login")
    // }


  

}
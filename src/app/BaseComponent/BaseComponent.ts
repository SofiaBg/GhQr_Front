import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
export class BaseComponent implements OnInit {

    constructor(protected router:Router){
        if(localStorage.getItem('user') == null || localStorage.getItem('user') == ""){
            this.router.navigateByUrl("/login")
        }
    }
    ngOnInit(): void {
        
    }

}
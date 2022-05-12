/*import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  
}*/

//+++++++++
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
//import { Observable } from 'rxjs/Observable';//---
import { Observable } from 'rxjs';//+++
import { isNull } from 'util';
import { GipService } from "../../services/gip.service";
import { Subject, timer } from 'rxjs';
import { BnNgIdleService } from 'bn-ng-idle';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export class SignGuard1 implements CanActivate {
  destroy = new Subject();
  showDialog = false;
  timer: number;
  sessionTime: any;
  dialog = 'stay logged in?';
  notice = 'session expired';
  showNotice = false;
  rxjsTimer = timer(1000, 1000);

  constructor(
    private router: Router, private service: GipService, private bnIdle: BnNgIdleService
  ) { }

  /*SAFIA a changé cette partie l ancienne ça marche pas */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Récupération de l'utilisateur connecté
    const isLoggedIn = !isNull(localStorage.getItem('user'));
    console.log("aaaaaaaa");
    if (isLoggedIn) {


      if(localStorage.getItem('token') != null){
        console.log('TOKEN IS NOT NULL ')
        this.service.getAparamSession(localStorage.getItem('forgotpass')).subscribe(data=>{
          console.log('SAFIAAAAAAAAAAAAAAAAAAAAA SESSION' + data)
        this.sessionTime=data;
        localStorage.setItem('sessionTime',this.sessionTime)
    
        },err=>{   
          console.log("erreur token ")
        })
    
          this.bnIdle.startWatching(300).subscribe((res) => {
            if(res) {
                console.log("session expired");
            }
          console.log('-- SESSION TIME OUT --')
          this.rxjsTimer.pipe(takeUntil(this.destroy)).subscribe(val => {
            this.timer = val;
    
            if (this.timer ===  this.sessionTime) {
              console.log(this.dialog)
            }
    
          if (this.timer >=  this.sessionTime) {
            this.destroy.next();
            this.destroy.complete();
            this.service.logout();
            localStorage.clear();
            this.router.navigateByUrl("/login")
            this.showNotice==true;
            console.log(this.notice) ;
          }
        })
        })
      }


      if (localStorage.getItem('role') == 'ADMIN') {
        // if (isLoggedIn) {
        // Si  l'utilisateur connecté : pas de redirection vers la page de login
        console.log('Vous êtes connectés');
        this.service.logout();
        localStorage.clear();
        this.router.navigate(['/login']);
        return false;
      } else if (localStorage.getItem('role') == 'USER') {
        this.router.navigate(['/login']);
        return false;
      } else if (localStorage.getItem('role') == 'SUB USER') {
        this.router.navigate(['/login'])
        return false
      } else if (localStorage.getItem('role') == 'MANAGER') {
        this.router.navigate(['/login'])
        return false;
      } else if (localStorage.getItem('role') == 'BRANCH MANAGER') {
        this.router.navigate(['/login']);
        return false;
      } else if (localStorage.getItem('role') == 'BRANCH OFFICIER') {
        this.router.navigate(['/login'])
        return false;
      } else if(localStorage.getItem('role') == 'OFFICIER'){
        this.router.navigate(['/login '])
      }
    }
    else {
      return true
    }
  }
}

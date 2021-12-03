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

@Injectable()
export class SignGuard implements CanActivate {

constructor(
  private router: Router
) { }

canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // Récupération de l'utilisateur connecté
    const isLoggedIn = !isNull(localStorage.getItem('user'));
    console.log("aaaaaaaa");

    if (isLoggedIn) {
      // Si  l'utilisateur connecté : pas de redirection vers la page de login
      
      console.log('Vous êtes connectés');
      this.router.navigate(['/merchantTrans']);
      return false;
    }
    //this.router.navigate(['/login']);
    return true;
  }
}

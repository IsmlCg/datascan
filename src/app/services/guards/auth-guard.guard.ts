import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  
  constructor( private login: LoginService ) { }

  canActivate(): boolean { 
    console.log( "this.login.isAuthenticated()" );
    console.log( this.login.isAuthenticated() );
    if ( !this.login.isAuthenticated() ) {
      return false;
    } else {
      return true;
    }
  }
}

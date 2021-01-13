import { Injectable } from '@angular/core';


import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  
  constructor(
    private router: Router
  ) { }

  logIn( Username: string, Password: string ): any {
    
    sessionStorage.setItem( 'jwt', Username );
    this.router.navigateByUrl( 'dashboard' );
  }

  logOut(){
    sessionStorage.removeItem( 'jwt' );
    this.router.navigateByUrl( 'login' );
  }
  isAuthenticated(): boolean {
    if ( sessionStorage.getItem( 'jwt' ) ) {
      return true;
    } else {
      return false;
    }
  }
}

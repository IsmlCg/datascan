import { Injectable } from '@angular/core';

import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
  })
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  ulr: any = 'http://localhost:4200/login';
  errorSubject: any = new BehaviorSubject<any>(null);
  errorMessage: any = this.errorSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  login( Username: string, Password: string ): any {
    
    sessionStorage.setItem('jwt', Username );
    this.router.navigateByUrl('dashboard');
    // this.http.post( this.ulr, { Username, Password }, httpOptions ).toPromise().then(
    //   (res: any) => {
    //     if (res && res.jwt) {
    //       sessionStorage.setItem('jwt', res.jwt);
    //       this.errorSubject.next(null);
    //       this.router.navigateByUrl('dashboard');
    //     } else if (res.Message) {
    //       this.errorSubject.next(res.Message);
    //     }
    //   }
    // );
  }

  isAuthenticated(): boolean {
    if ( sessionStorage.getItem('jwt') ) {
      return true;
    } else {
      return false;
    }
  }
}

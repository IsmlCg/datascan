import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './services/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'staff';
  is_log:boolean=false;
  constructor( private log:LoginService ){
    this.is_log = this.log.isAuthenticated();
    console.log( this.is_log );
  }

  logOut(){
    this.log.logOut();
  }
}

import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/user.model';
import { CrudService } from 'src/app/services/firebase/crud.service';
import { LoginService } from './../../services/login/login.service';

type NewType = string;

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  
  isUsernameValid: boolean = true;
  error: string = '';
  user:User = new User();

  data:any=[];
  constructor( private loginService: LoginService, private db: CrudService ) { 
    this.db.setPath( '/users' );
  }

  ngOnInit(): void {
    
  }

  validateUsername(): void {
    // const pattern = RegExp(/^[\w-.]*$/);
    // if (pattern.test(this.)) {
    //   this.isUsernameValid = true;
    // } else {
    //   this.isUsernameValid = false;
    // }
  }

  onKey(event: any, type: string) {
    // if (type === 'username') {
    //   this.username = event.target.value;
    //   this.validateUsername();
    // } else if (type === 'password') {
    //   this.password = event.target.value;
    // }
  }

  onSubmit() {
    console.log( this.loginService.isAuthenticated() );
    if ( this.isUsernameValid ) {

      this.db.getFilter( 'username', this.user.username )
      .snapshotChanges().subscribe(users => {
        users.forEach((item,index) => {
          // this.data!= item.payload.toJSON();
          // var y = item.payload.toJSON();
          // y[index] = item.key;
          this.data.push( item.payload.toJSON() );
          if ( this.data[ index ].username == this.user.username && this.data[ index ].password == this.user.password ) {
            this.loginService.logIn(this.user.username, this.user.password);      
          }
        })
        this.error = 'Error Username or password is incorrect ..!';
      });
      
    }
    
  }

  save() {
    
  }

  demo() {
    this.user.id = "001";
    this.user.username = "ana";
    this.user.password = "ana001";
    this.db.AddBook( this.user );
  }
}

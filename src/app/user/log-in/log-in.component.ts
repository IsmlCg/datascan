import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/user.model';
import { CrudService } from 'src/app/services/firebase/crud.service';
import { LoginService } from './../../services/login/login.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  students: any;
  username = '';
  password = '';
  isUsernameValid: boolean = true;
  error: any = null;
  user:User = new User();

  constructor( private loginService: LoginService, private db: CrudService ) { 
    this.db.GetBookList()
    .snapshotChanges().subscribe(books => {
        books.forEach(item => {
          let a = item.payload.toJSON();
          console.log(a );
        })
        /* Data table */
        
    })

    console.log( '==========' );
    // db.getFilter();
  }

  ngOnInit(): void {
    this.loginService
      .errorSubject
      .subscribe( (errorMessage: any) => {
        this.error = errorMessage;
      });
  }

  validateUsername(): void {
    const pattern = RegExp(/^[\w-.]*$/);
    if (pattern.test(this.username)) {
      this.isUsernameValid = true;
    } else {
      this.isUsernameValid = false;
    }
  }

  onKey(event: any, type: string) {
    if (type === 'username') {
      this.username = event.target.value;
      this.validateUsername();
    } else if (type === 'password') {
      this.password = event.target.value;
    }
  }

  onSubmit() {
    console.log( this.loginService.isAuthenticated() );
    if (this.isUsernameValid) {
      this.loginService
        .login(this.username, this.password);
    }

    // var ref = this.db.database().ref("dinosaurs");
    // ref.orderByKey().endAt("pterodactyl").on("child_added", function(snapshot) {
    //   console.log(snapshot.key);
    // });
    
  }

  save() {
    this.user.id = "001";
    this.user.username = "ana";
    this.user.password = "ana001";
    // console.log( this.user );
    
    let record = {
      id:'passa',
      name:'demoeooo'
    };
  // this.db.create_NewStudent( record ).then(resp => {
  //     console.log(resp);
  //   })
  //     .catch(error => {
  //       console.log(error);
  //     });
    this.db.getFilter().subscribe(data => {

      this.students = data.map(e => {
        console.log( e.payload.doc.id);
        
      })
      

    });

    // this.db.getFilter().then(() => {
    //   console.log('Created new item successfully!');
    //   // this.submitted = true;
    // });
    // console.log( this.db.getDocsByParam( 'password', 'demo' ) )
    // this.db.getDocsByParam( 'password', 'demo' ).
    // subscribe(data => {

    //   this.students = data.map(e => {
    //     return {
    //       id: e.payload.doc.id,
    //       isEdit: false
    //     };
    //   })
    //   console.log(this.students);

    // });

  }

  demo() {
    this.user.id = "001";
    this.user.username = "ana";
    this.user.password = "ana001";
    this.db.AddBook( this.user );
  }
}

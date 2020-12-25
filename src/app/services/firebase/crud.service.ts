import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';
import User from 'src/app/models/user.model';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

export interface Item { name: string; }

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  [x: string]: any;

  private dbPath = '/users';
  booksRef!: AngularFireList<any>;
  bookRef!: AngularFireObject<any>;
  constructor( private afs: AngularFirestore, private db: AngularFireDatabase) {
    this.booksRef = db.list( this.dbPath );
  }

  AddBook( user: User) {
    this.booksRef.push({
      id: user.id,
      username: user.username,
      password:user.password
    })
    .catch(error => {
      this.errorMgmt(error);
    })
  }

  GetBookList() {
    this.booksRef = this.db.list( this.dbPath, ref => ref.orderByChild('username').equalTo('ana') );
    // this.booksRef = this.db.list( this.dbPath, {password:'ana',} );
    return this.booksRef;
  }
  
  getFilter(){
    
    return this.afs.collection('users').snapshotChanges();
  }

  getDocsByParam( getParam:string, paramValue:string ) {
    // var docRef = this.afs.collection( this.dbPath).ref;
    // return docRef.where( getParam, '==', paramValue).get();

    // return this.afs.collection( this.dbPath  ).snapshotChanges();
    return this.afs.collection(this.dbPath).snapshotChanges();

  }

  create_NewStudent(record:object ) {
    return this.afs.collection( 'users' ).add( record );
  }
}
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

  private _path = '';

  constructor( private afs: AngularFirestore, private db: AngularFireDatabase) {
    
  }
  
  add( value: any ) {
    this.db.list( this._path).push( value )
    .catch(error => {
      this.errorMgmt(error);
    })
  }

  delete( key:string) {
    return this.db.list( this._path ).remove( key );
  }

  getAll() {
    return this.db.list( this._path );
  }
  
  getFilter( name:string, val:string ){
    return this.db.list( this._path, ref => ref.orderByChild( name ).equalTo( val ) );
  }

  getAllData() {
    return this.afs.collection(this._path).snapshotChanges();

  }

  create( record:any ) {
    return this.afs.collection( this._path ).add( record );
  }

  setPath( _path: string ){
    this._path = _path;
    this.ref = this.db.list( this._path );
  }

  update( key: string, value: any ){
    return this.db.list( this._path ).update( key, value );
  }
}
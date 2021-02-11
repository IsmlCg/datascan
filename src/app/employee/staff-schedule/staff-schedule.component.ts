import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CrudService } from 'src/app/services/firebase/crud.service';
import { StaffScheduleModalComponent } from '../staff-schedule-modal/staff-schedule-modal.component';


@Component({
  selector: 'app-staff-schedule',
  templateUrl: './staff-schedule.component.html',
  styleUrls: ['./staff-schedule.component.css']
})
export class StaffScheduleComponent implements OnInit {

  isBr = "";
  rows: any[]=[];
  constructor( private db:CrudService, private matDialog: MatDialog ) { 
    this.db.setPath( 'computers' );
  }

  ngOnInit(): void {

    this.db.getAll()
      .snapshotChanges().subscribe(emp => {
        var data:any=[];
        this.rows = [];
        emp.forEach((item,index) => {
          data = item.payload.toJSON();
          let columndata = [];
          for ( const key in data ) {
            if ( Object.prototype.hasOwnProperty.call( data, key ) ) {
              data[ key ][ 'id' ] = key;
              columndata.push( data[ key ] );
            }
          }
          this.rows.push( columndata );
          this.rows[ index ][ 'key' ] = item.payload.key;
        })
      });
  }

  add(){
    this.rows[0].computers.push( {number:100, position:"start", username:"ana", usercode:"1234"} );
  }

  openDialog( path:string, pc:any = null ) {
    console.log( 'ini' )
          console.log(pc)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title:"Registar..!",
      data:null
    };
    if ( path != "" ) {
      dialogConfig.data = {
        title:"Edit..!",
        data: pc
      };
    }
    
    dialogConfig.width= '50%';
    let dialogRef = this.matDialog.open( StaffScheduleModalComponent, dialogConfig );

    dialogRef.afterClosed().subscribe( values => {
      
      if( values ){
        if ( values.isnew ) {
          this.db.setPath( 'computers/row-'+ values.value.rownumber );
          this.db.add( values.value );
        } else {
          this.db.setPath( 'computers/'+ path );
          console.log( 'end' )
          console.log(values)
          this.db.update( pc.id, values.value );
        }
      } 
    });
  }

  delete( path:string, key:string ){
    this.db.setPath( 'computers/'+ path );
    this.db.delete( key );
  }
}

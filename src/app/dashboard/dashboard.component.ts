import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CrudService } from '../services/firebase/crud.service';
import { PrintScheduleComponent } from './print-schedule/print-schedule.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isBr = "";
  rows: any[]=[];
  list: any = [];
  employees:any =[];
  assignedEmployeesCode:any =[];
  employeeEmpty:any ={
    active: true,
    code: "",
    id: "",
    lastname: "",
    name: ""
  };
  constructor( private db:CrudService ) {
    
  }

  ngOnInit(): void {
    this.loadComputers();
  }
  
  loadComputers(){
    this.db.setPath( 'computers' );
    this.db.getAll()
      .snapshotChanges().subscribe(emp => {
        var data:any=[];
        this.rows = [];
        this.assignedEmployeesCode = [];
        emp.forEach((item,index) => {
          data = item.payload.toJSON();
          let columndata = [];
          for ( const key in data ) {
            if ( Object.prototype.hasOwnProperty.call( data, key ) ) {
              data[ key ][ 'id' ] = key;
              data[ key ][ 'col' ] = columndata.length;
              data[ key ][ 'row' ] = index;
              columndata.push( data[ key ] );
              if ( data[ key ].employee.code != "" ) {
                this.assignedEmployeesCode.push( data[ key ].employee.code );  
              }              
            }
          }
          this.rows.push( columndata );
          this.rows[ index ][ 'row' ] = index;
          this.rows[ index ][ 'key' ] = item.payload.key;
        })
        // console.log( this.rows );
        this.loadEmployees();
      });
  }

  loadEmployees(){
    this.db.setPath( 'employees' );
    this.db.getAll()
      .snapshotChanges().subscribe(emp => {
        this.employees =[];
        this.employees.push( this.employeeEmpty );
        emp.forEach((item,index) => {

          let data:any = item.payload.toJSON();          
          if ( this.assignedEmployeesCode.lastIndexOf( data.code ) == -1 ) {
            this.employees.push( data );  
          }
        });
        // console.log( this.employees );
      });
  }
  add(){
    // this.rows[0].computers.push( {number:100, position:"start", username:"ana", usercode:"1234"} );
    console.log( this.employees );
    console.log( this.rows );
    console.log( this.assignedEmployeesCode );
  }
  drop( event: CdkDragDrop<string[]>) {
    
    if (event.container.id === event.previousContainer.id) {
      // moveItemInArray( event.container.data, event.previousIndex, event.currentIndex );
    } else {
      let valBegin:any = event.previousContainer.data;
      let valEnd:any = event.container.data;
      if ( event.previousContainer.id == "" ) {
        this.upgradeComputerEmployee( valEnd.row, valEnd.id, valBegin );
        this.employees.splice( event.previousIndex, 1 );
      }else{
        if ( event.container.id == "" ) {
          
          if ( valBegin.employee.code != "" ) {
            this.employees.splice( event.currentIndex, 0, valBegin );  
          }
          if ( event.previousContainer.id != "" ) {
            this.upgradeComputerEmployee( valBegin.row, valBegin.id, this.employeeEmpty );  
          }
          
        }else{
          if ( event.previousContainer.id == "" ) {
            
            this.employees.splice( event.currentIndex, 0, valBegin.employee );
            this.upgradeComputerEmployee( valBegin.row, valBegin.id, this.employeeEmpty );
          }else{
            
            this.upgradeComputerEmployee( valEnd.row, valEnd.id, valBegin.employee );
            this.upgradeComputerEmployee( valBegin.row, valBegin.id, valEnd.employee );
          }
            
        }
      }
    }
  }

  upgradeComputerEmployee( row:number, key:string, newEmployee:any ){
    if ( !isNaN( row ) ) {
      this.db.setPath( 'computers/row-' + ( row + 1 ) );
      this.db.update( key, { employee:newEmployee });  
    }
    
  }

  printPage() {
    window.print();
  } 
}

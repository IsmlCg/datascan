import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmployeeModalComponent } from '../employee-modal/employee-modal.component';

import {FormControl, Validators} from '@angular/forms';
import { CrudService } from 'src/app/services/firebase/crud.service';
import {PageEvent} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';


export interface PeriodicElement {
  code:string;
  name: string;
  lastname: string;
  id: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { code:'1',name: 'Ismael', lastname:'Cardenas', id: '0843' }
];
@Component({
  selector: 'app-crud-employee',
  templateUrl: './crud-employee.component.html',
  styleUrls: ['./crud-employee.component.css']
})
export class CrudEmployeeComponent implements OnInit {

  displayedColumns: string[] = [ 'id', 'name', 'lastname', 'code', 'option' ];
  dataSource = new MatTableDataSource<PeriodicElement>( ELEMENT_DATA );
  selection = new SelectionModel<PeriodicElement>(true, []);
  
  employees:any=[];

  constructor( private db:CrudService, private matDialog: MatDialog ) { 
    this.db.setPath( 'employees' );
  }
  
  ngOnInit(): void {
    this.db.getAll()
      .snapshotChanges().subscribe(emp => {
        this.employees.pop();
        var data:any=[];
        emp.forEach((item,index) => {
          
          data.push( item.payload.toJSON() );
          
          this.employees[ index ] ={
            'id': item.payload.key,
            'name': data[ index ].name,
            'lastname': data[ index ].lastname,
            'code': data[ index ].code,
            'active': data[ index ].active
          }
        });
        console.log( this.employees );
        this.dataSource.data = this.employees;
      });

  }

  delete( key:string ){
    this.db.delete( key )
    .then(() => {
      console.log( 'The empleyee was updated successfully!' );
    })
        .catch(err => console.log(err));
    
  }
  openDialog( row:number = -1 ) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      title:"Registar..!",
      data:null
    };
    if ( row >= 0 ) {
      dialogConfig.data = {
        title:"Edit..!",
        data:this.employees[ row ]
      };
    }
    
    dialogConfig.width= '50%';
    let dialogRef = this.matDialog.open( EmployeeModalComponent, dialogConfig );

    dialogRef.afterClosed().subscribe( employee => {
      console.log(employee)
      if( employee ){
        if ( employee.isnew ) {
          this.db.add( employee.value );
        } else {
          this.db.update( employee.value.id, employee.value );
        }
      } 
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

  onChange( key:string, $event: MatSlideToggleChange ) {

    this.db.update( key, {active:$event.checked} );
    
  }

}

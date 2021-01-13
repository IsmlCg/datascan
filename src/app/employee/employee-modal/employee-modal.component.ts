import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { CrudService } from 'src/app/services/firebase/crud.service';
import { Employee } from './Employee';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
  styleUrls: ['./employee-modal.component.css']
})
export class EmployeeModalComponent implements OnInit {
  
  employee: Employee = 
    {
      name:'',
      lastname:'',
      code:'',
      id:'',
      active:true
    };
  
  isnew:boolean = true;
  active:boolean = true;
  
  constructor( private db:CrudService, public dialogRef: MatDialogRef<EmployeeModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any){

    if ( data.data != null ) {
      this.employee = data.data;
      this.isnew = false;
    }
  }

  close() {
    let employee = null;
    this.dialogRef.close( employee );
  }

  save() {

    if ( this.employee.id != "" ) {
      // employee ={
      //   fullname:this.fullname,
      //   active:this.active,
      //   code:this.code,
      //   id:this.id
      // } 
    }else{
      // employee ={
      //   fullname:this.fullname,
      //   active:this.active,
      //   code:this.code
      // } 
    }
    this.dialogRef.close( { isnew:this.isnew, value:this.employee } );
  }
  ngOnInit(): void {
  }

  onChange( $event: MatSlideToggleChange ) {
    this.active = $event.checked;
  }

}

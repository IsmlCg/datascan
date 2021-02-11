import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../employee-modal/Employee';
import { Computer } from './Computer';

@Component({
  selector: 'app-staff-schedule-modal',
  templateUrl: './staff-schedule-modal.component.html',
  styleUrls: ['./staff-schedule-modal.component.css']
})
export class StaffScheduleModalComponent implements OnInit {
  employee = {
            name:'',
            lastname:'',
            code:'',
            id:'',
            active:true
          };
  computer:Computer={
    computernumber:0,
    rownumber:1,
    position:"",
    employee:this.employee
  };
  isnew:boolean = true;

  constructor( public dialogRef: MatDialogRef<StaffScheduleModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any ) {
    if ( data.data != null ) {
      this.computer.computernumber = data.data.computernumber;
      this.computer.position = data.data.position;
      this.computer.rownumber = data.data.rownumber;
      this.isnew = false;
    }
   }

  ngOnInit(): void {
  }

  close() {
    let computer = null;
    this.dialogRef.close( computer );
  }

  save() {
    
    console.log(this.computer)
    if ( this.isnew ) {
      this.dialogRef.close( {isnew:this.isnew, value:this.computer} );  
    }else{
      
      let data = {
        computernumber :this.computer.computernumber,
        position :this.computer.position  
      }
      this.dialogRef.close( {isnew:this.isnew, value:data } );
    }
    
  }
}

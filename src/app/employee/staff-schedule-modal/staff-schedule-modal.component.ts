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
  employee: Employee = {
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
  constructor( public dialogRef: MatDialogRef<StaffScheduleModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any ) { }

  ngOnInit(): void {
  }

  close() {
    let computer = null;
    this.dialogRef.close( computer );
  }

  save() {
    
    console.log(this.computer)
    this.dialogRef.close( {isnew:true, value:this.computer} );
  }
}

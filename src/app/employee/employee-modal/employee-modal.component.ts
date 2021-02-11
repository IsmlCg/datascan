import { Time } from '@angular/common';
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
  // scheduleweek
  
  time = "08:00";
  days: any = {
    monday:{
      start:"08:00",
      end:"16:30"
    }
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

  changeJob( newJob:string ) {
    this.employee.days.monday.job = newJob;
    this.employee.days.tuesday.job = newJob;
    this.employee.days.wednesday.job = newJob;
    this.employee.days.thursday.job = newJob;

    this.employee.days.friday.job = newJob;
    this.employee.days.saturday.job = newJob;
    this.employee.days.sunday.job = newJob;
  }

  onChange( $event: MatSlideToggleChange ) {
    this.active = $event.checked;
  }

  changeHours( obj:any )
  {
    
    if ( obj.status == 'enabled' ) {
      obj.start = '08:00';
      obj.end = '16:30';    
    }else{
      obj.start = '';
      obj.end = '';      
    }
    
  }
  
  employee: Employee = 
  {
    name:'',
    lastname:'',
    code:'',
    id:'',
    active:true,
    job:'',
    days:{
      monday:{
        start:"08:00",
        end:"16:30",
        status:"enabled",
        job:""
      },
      tuesday:{
        start:"08:00",
        end:"16:30",
        status:"enabled",
        job:""
      },
      wednesday:{
        start:"08:00",
        end:"16:30",
        status:"enabled",
        job:""
      },
      thursday:{
        start:"08:00",
        end:"16:30",
        status:"enabled",
        job:""
      },
      friday:{
        start:"08:00",
        end:"16:30",
        status:"enabled",
        job:""
      },
      saturday:{
        start:"",
        end:"",
        status:"day-off",
        job:""
      },
      sunday:{
        start:"",
        end:"",
        status:"day-off",
        job:""
      }    
    }
  };
}

import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';


export interface scheduleWeek {
  employee:string;
  monday:any;
  tuesday:any;
  wednesday:any;
  thursday:any;
  friday:any;
  saturday:any;
  sunday:any;
}

@Component({
  selector: 'app-schedule-week',
  templateUrl: './schedule-week.component.html',
  styleUrls: ['./schedule-week.component.css']
})
export class ScheduleWeekComponent implements OnInit {
  datesweek: any[] = [];  
  data: scheduleWeek[] = [];
  jobtype:any[] = [];
  job:string = '';
  displayedColumns: string[] = [ 
    'employee', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday','option' 
  ];
  
  dataSource: any;
  selection = new SelectionModel<scheduleWeek>(true, []);

  constructor() {
    this.data = [
      { employee:'Ismael Cardenas', monday:{date:'8:00-16:30',job:'scan'}, tuesday:{date:'8:00-16:30',job:'scan'}, wednesday:{date:'12:00-13:00',job:'scan'}, thursday:{date:'8:00-16:30',job:'scan'}, friday:{date:'8:00-16:30',job:'scan'}, saturday:{date:'8:00-16:30',job:'scan'}, sunday:{date:'8:00-16:30',job:'scan'} },
      { employee:'Celta Demo', monday:{date:'8:00-16:30',job:'scan'}, tuesday:{date:'8:00-16:30',job:'scan'}, wednesday:{date:'12:00-13:00',job:'scan'}, thursday:{date:'8:00-16:30',job:'scan'}, friday:{date:'8:00-16:30',job:'scan'}, saturday:{date:'8:00-16:30',job:'scan'}, sunday:{date:'8:00-16:30',job:'scan'} }
    ];
    this.dataSource = new MatTableDataSource<scheduleWeek>( this.data );
    
    this.getAllDatesFromWeek();

   }

  ngOnInit(): void {
  }

  delete( key:string ){
   
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    // this.isAllSelected() ?
    //     this.selection.clear() :
    //     this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: scheduleWeek): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.employee}`;
  }
   /** Whether the number of selected elements matches the total number of rows. */
   isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  
  assignWork( row:number, day:string ):void{
    switch ( day ) {
      case 'monday':
        this.data[ row ][ day ].job = this.job;    
      break;
      case 'tuesday':
        this.data[ row ][ day ].job = this.job;    
      break;
      case 'wednesday':
        this.data[ row ][ day ].job = this.job;    
      break;
      case 'thursday':
        this.data[ row ][ day ].job = this.job;    
      break;
      case 'friday':
        this.data[ row ][ day ].job = this.job;    
      break;
      case 'saturday':
        this.data[ row ][ day ].job = this.job;    
      break;
      case 'sunday':
        this.data[ row ][ day ].job = this.job;    
      break;
    }
  }

  assignScan(){
    this.job = 'scan';
  }

  assignWerehouse(){
    this.job = 'werehouse';
  }

  assign(){
    this.job = 'default';
  }

  getAllDatesFromWeek(){
    let date = new Date();
    let day = ( date.getDay() != 0 )? date.getDay() : 7;
    date.setDate( date.getDate() - day );
    for ( let index = 0; index < 7; index++ ) {
      date.setDate( date.getDate() + 1 );     
      this.datesweek.push( moment( date ).format("DD/MM/YYYY") );
    }
  }
} 
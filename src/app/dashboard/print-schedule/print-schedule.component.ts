import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-print-schedule',
  templateUrl: './print-schedule.component.html',
  styleUrls: ['./print-schedule.component.css']
})
export class PrintScheduleComponent implements OnInit {
  ngOnInit(): void {
  }
  title = 'angular-drag-drop';
  tracks: any[] = [
    {
      "title": "Todo",
      "id": "todo",
      "tasks": [
        {
          "id": "first-task",
          "title": "First Task",
          "description": "This is my first task"
        }
      ]
    },
    {
      "title": "In Progress",
      "id": "inprogress",
      "tasks": [
        {
          "id": "first-task",
          "title": "First Task",
          "description": "This is my first task"
        }
      ]
    },
    {
      "title": "D-Done",
      "id": "ddone",
      "tasks": [
        {
          "id": "first-task",
          "title": "First Task",
          "description": "This is my first task"
        }
      ]
    },
    {
      "title": "QA Pass",
      "id": "qapass",
      "tasks": [
        {
          "id": "first-task",
          "title": "First Task",
          "description": "This is my first task"
        }
      ]
    }
  ];

    /**
   * An array of all track ids. Each id is associated with a `cdkDropList` for the
   * track talks. This property can be used to connect all drop lists together.
   */
  get trackIds(): string[] {
    return this.tracks.map(track => track.id);
  }

  onTalkDrop(event: CdkDragDrop<any[]>) {
    // In case the destination container is different from the previous container, we
    // need to transfer the given task to the target data array. This happens if
    // a task has been dropped on a different track.
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  onTrackDrop(event: CdkDragDrop<any[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }
}
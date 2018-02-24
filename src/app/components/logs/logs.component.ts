import { Log } from './../../models/log.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  logs: Log[];

  constructor() { }

  ngOnInit() {
    this.logs = [
      {
        id: '1',
        text: 'Sleep for 9 hours :)',
        date: new Date("02-12-2018 9:00")
      },
      {
        id: '2',
        text: 'Climb',
        date: new Date("02-12-2018 12:00")
      },
    ];
  }

}

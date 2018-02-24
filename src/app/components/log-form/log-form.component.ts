import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {

  date: Date;
  text: string = '';
  id: string;
  constructor(private logService: LogService) { }


  ngOnInit() {
    this.logService.selectedLog.subscribe(log => {

      if (log.id !== null) {
        this.id = log.id;
        this.text = log.text;
        this.date = log.date;
      }

    });
  }

}

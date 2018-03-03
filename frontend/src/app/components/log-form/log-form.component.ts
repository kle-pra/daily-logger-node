import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services/log.service';
import { Log } from '../../models/log.model';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {

  text: string;
  date: Date;
  id: string;
  isUpdate = false;

  constructor(private logService: LogService) { }


  ngOnInit() {
    this.logService.selectedLog.subscribe(log => {
      if (log._id !== null) {
        this.id = log._id;
        this.text = log.text;
        this.date = log.date;
        this.isUpdate = true;
      }
    });
  }

  onSubmit() {
    if (!this.isUpdate) {
      this.logService.addLog({
        _id: null,
        text: this.text,
        date: new Date()
      }).subscribe(log => {
        this.logService.newLog.next(log);
      }, error => {
        console.log(error);
      });
    } else {
      this.logService.updateLog({
        _id: this.id,
        text: this.text,
        date: new Date()
      }).subscribe((updatedLog) => {

        this.logService.newLog.next(updatedLog);

      }, error => {
        console.log(error);
      });
    }
    this.clearForm();
  }

  clearForm(): void {
    this.isUpdate = false;
    this.text = null;
    // set selected log to empty
    this.logService.setSelectedLog(new Log(null, null));
  }

}

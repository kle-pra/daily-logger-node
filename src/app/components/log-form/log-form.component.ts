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
      if (log.id !== null) {
        this.id = log.id;
        this.text = log.text;
        this.date = log.date;
        this.isUpdate = true;
      }
    });
  }

  onSubmit() {
    if (!this.isUpdate) {
      this.logService.addLog({
        id: this.generateUniqueId(),
        text: this.text,
        date: new Date()
      });
    } else {
      this.logService.updateLog({
        id: this.id,
        text: this.text,
        date: new Date()
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

  generateUniqueId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      // tslint:disable-next-line:no-bitwise
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}

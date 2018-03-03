import { LogService } from '../../services/log.service';
import { Log } from './../../models/log.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  logs: Log[] = [];
  selectedLog: Log;
  loading = true;

  constructor(private logService: LogService) { }

  ngOnInit() {
    this.logService.getLogs().subscribe(logs => {
      this.logs = logs;
      this.loading = false;
    }, error => {
      console.log(error);
    });

    this.logService.selectedLog.subscribe((log: Log) => {
      this.selectedLog = log;
    });

    this.logService.newLog.asObservable().subscribe((log) => {
      // in case of update remove old and insert new
      this.logs = this.logs.filter((l) => {
        return l._id !== log._id;
      });
      this.logs.unshift(log);
    });

  }

  onSelect(log: Log) {
    this.logService.setSelectedLog(log);
  }

  deleteLog(id: string) {
    this.logService.deleteLog(id).subscribe(() => {
      this.logs = this.logs.filter((log) => {
        return id !== log._id;
      });
    }, err => {
      console.log(err);
    });
  }

}

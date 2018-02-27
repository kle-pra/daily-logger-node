import { LogService } from '../../services/log.service';
import { Log } from './../../models/log.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  logs: Log[];
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
  }

  onSelect(log: Log) {
    this.logService.setSelectedLog(log);
  }

  deleteLog(id: number) {
    this.logService.deleteLog(id);
  }

}

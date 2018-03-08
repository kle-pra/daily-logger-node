import { LogService } from './../../services/log.service';
import { Component, OnInit } from '@angular/core';
import { Log } from '../../models/log.model';

@Component({
  selector: 'app-logs-archive',
  templateUrl: './logs-archive.component.html',
  styleUrls: ['./logs-archive.component.css']
})
export class LogsArchiveComponent implements OnInit {
  logs: Log[] = [];
  loading = true;
  selectedDate: Date = null;

  constructor(private logService: LogService) { }

  ngOnInit() {
  }

  onDateSelect(event: any) {
    this.selectedDate = new Date(event.target.value);
    this.logService.getLogs(this.selectedDate).subscribe(logs => {
      this.logs = logs;
      this.loading = false;
    }, error => {
      console.log(error);
    });
  }

}

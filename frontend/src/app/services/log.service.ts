import { Injectable } from '@angular/core';
import { Log } from '../models/log.model';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { of } from 'rxjs/observable/of';


@Injectable()
export class LogService {

  logs: Log[];
  private currentLog = new BehaviorSubject<Log>(new Log(null, null));

  selectedLog = this.currentLog.asObservable();

  setSelectedLog(log: Log) {
    this.currentLog.next(log);
  }

  constructor() {
    this.logs = [
    ];
  }

  getLogs(): Observable<Log[]> {

    if (localStorage.getItem('logs') === null) {
      this.logs = [];
    } else {
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }
    return of(this.logs.sort());
  }


  addLog(log: Log): any {
    this.logs.unshift(log);

    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  updateLog(log: Log): any {
    this.logs.forEach((l: Log, i: number) => {
      if (l.id === log.id) {
        this.logs.splice(i, 1);
      }
    });
    this.logs.unshift(log);
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  deleteLog(id): any {
    this.logs.forEach((l: Log, i: number) => {
      if (l.id === id) {
        this.logs.splice(i, 1);
      }
    });
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

}

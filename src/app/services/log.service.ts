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

  constructor() {
    this.logs = [
      {
        id: '1',
        text: 'Sleep for 9 hours :)',
        date: new Date('02-12-2018 9:00')
      },
      {
        id: '2',
        text: 'Climb',
        date: new Date('02-12-2018 12:00')
      },
    ];
  }

  getLogs(): Observable<Log[]> {
    return of(this.logs);
  }

  setSelectedLog(log: Log) {
    this.currentLog.next(log);
  }

  addLog(log: Log): any {
    this.logs.unshift(log);
  }

  updateLog(log: Log): any {
    this.logs.forEach((l: Log, i: number) => {
      if (l.id === log.id) {
        this.logs.splice(i, 1);
      }
    });
    this.logs.unshift(log);
  }

  deleteLog(id): any {
    this.logs.forEach((l: Log, i: number) => {
      if (l.id === id) {
        this.logs.splice(i, 1);
      }
    });
  }

}

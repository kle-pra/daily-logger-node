import { Injectable } from '@angular/core';
import { Log } from '../models/log.model';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';


@Injectable()
export class LogService {
  logs: Log[];

  constructor() {
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

  getLogs(): Observable<any> {
    return of(this.logs);
  }

}

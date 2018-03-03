import { Injectable } from '@angular/core';
import { Log } from '../models/log.model';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LogService {

  private currentLog = new BehaviorSubject<Log>(new Log(null, null));
  newLog = new BehaviorSubject<Log>(new Log(null, null));

  selectedLog = this.currentLog.asObservable();

  setSelectedLog(log: Log) {
    this.currentLog.next(log);
  }

  constructor(private http: HttpClient) {
  }

  getLogs(): Observable<any> {
    return this.http.get('api/logs');
  }


  addLog(log: Log): any {
    return this.http.post('api/logs', log);

  }

  updateLog(log: Log): any {
    return this.http.put('api/logs/' + log._id, log);

  }

  deleteLog(id): any {
    return this.http.delete('api/logs/' + id);

  }

}

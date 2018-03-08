import { Injectable } from '@angular/core';
import { Log } from '../models/log.model';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  getLogs(date: Date): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwt') !== null ? localStorage.getItem('jwt') : ''
      })
    };
    return this.http.get('api/logs?date=' + date.toDateString(), httpOptions);
  }


  addLog(log: Log): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwt') !== null ? localStorage.getItem('jwt') : ''
      })
    };
    return this.http.post('api/logs', log, httpOptions);

  }

  updateLog(log: Log): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwt') !== null ? localStorage.getItem('jwt') : ''
      })
    };
    return this.http.put('api/logs/' + log._id, log, httpOptions);

  }

  deleteLog(id): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwt') !== null ? localStorage.getItem('jwt') : ''
      })
    };
    return this.http.delete('api/logs/' + id, httpOptions);

  }

}

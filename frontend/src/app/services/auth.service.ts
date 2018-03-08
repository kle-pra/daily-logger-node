import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {
  jwtHelper: JwtHelper = new JwtHelper();

  loginSubject = new BehaviorSubject<any>(null);


  constructor() { }

  storeToken(data): Observable<void> {
    console.log(data);
    localStorage.setItem('jwt', data.token);
    return of(null);
  }

  getToken() {
    localStorage.getItem('jwt');
  }

  getLoggedInUser(): string {

    if (this.isLoggedIn()) {
      return this.jwtHelper.decodeToken(localStorage.getItem('jwt')).data.email;
    }
    return null;
  }

  logout() {
    localStorage.removeItem('jwt');
  }

  isLoggedIn(): boolean {
    // check if token is expired here!
    return localStorage.getItem('jwt') !== null && !this.jwtHelper.isTokenExpired(localStorage.getItem('jwt'));
  }

}

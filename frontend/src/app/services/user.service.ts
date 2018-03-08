import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  saveUser(user: User) {
    return this.http.post('api/users', user);
  }

  loginUser(user: User) {
    return this.http.post('api/login', user);
  }
}

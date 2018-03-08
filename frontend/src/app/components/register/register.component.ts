import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = {
    _id: null,
    email: '',
    password: ''
  };

  confirmPassword: string;

  constructor(private userService: UserService, private router: Router, private flashMessage: FlashMessagesService) { }

  ngOnInit() { }

  saveUser(e) {
    this.userService.saveUser(this.user).subscribe((user) => {
      // save jwt token

      this.flashMessage.show('You were successfully registered! You can now login.', { cssClass: 'alert-success', timeout: 3000 });
      this.router.navigate(['login']);
    }, error => {
      this.flashMessage.show('There was a problem with username, try to select different.', { cssClass: 'alert-danger', timeout: 3000 });
    });
  }

}

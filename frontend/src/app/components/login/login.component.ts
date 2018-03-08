import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = {
    _id: null,
    email: '',
    password: ''
  };
  constructor(private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  login(f) {
    if (f.valid) {
      this.userService.loginUser(this.user)
        .subscribe(data => {
          this.authService.storeToken(data);
          this.authService.loginSubject.next(null);
          this.flashMessage.show('You were successfully logged in!', { cssClass: 'alert-success', timeout: 3000 });
          this.router.navigate(['/']);
        }, error => {
          this.flashMessage.show('Wrong email/password', { cssClass: 'alert-danger', timeout: 3000 });
        });

    } else {
      this.flashMessage.show('Fields not valid.', { cssClass: 'alert-danger', timeout: 3000 });
    }

  }

}

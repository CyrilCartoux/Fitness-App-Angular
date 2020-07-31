import { User } from './auth/user.model';
import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.initUser();
  }

  initUser() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const userConnected: User = {
          email: user.email,
          userId: user.uid
        };
        console.log('user is connected : ' + user.uid);
        this.authService.loggedInUser.next(userConnected);
      } else {
        console.log('no users');
      }
    });
  }

}

import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  loggedInUser = new BehaviorSubject<User>(null);

  constructor(
    private router: Router
  ) { }

  createUser(authData: AuthData) {
    firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.user = {
          email: result.user.email,
          userId: result.user.uid
        };
        this.router.navigate(['/login']);
      });
  }

  login(authData: AuthData) {
    firebase.auth().signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.user = {
          email: result.user.email,
          userId: result.user.uid
        };
        this.loggedInUser.next(this.user);
        this.router.navigate(['/training']);
      });
  }

  logout() {
    firebase.auth().signOut()
      .then(res => {
        this.loggedInUser.next(null);
        this.router.navigate(['/']);
      });
  }
}

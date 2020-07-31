import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;
  loggedInUser = new BehaviorSubject<User>(null);

  constructor(
    private router: Router,
    private firebaseAuth: AngularFireAuth
  ) { }

  createUser(authData: AuthData) {
    // create the user
    this.firebaseAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(credentials => {
        this.user = {
          email: credentials.user.email,
          userId: credentials.user.uid
        };
        // store the user in the database
        firebase.database().ref('Users').set({
          email: credentials.user.email,
          userId: credentials.user.uid
        });
        // navigate away
        this.router.navigate(['/']);
      }).catch(err => {
        console.log(err);
      });
  }

  login(authData: AuthData) {
    this.firebaseAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.user = {
          email: result.user.email,
          userId: result.user.uid
        };
        this.loggedInUser.next(this.user);
        this.router.navigate(['/training']);
      }).catch(err => {
        console.log(err);
      });
  }

  logout() {
    this.firebaseAuth.auth.signOut()
      .then(() => {
        this.loggedInUser.next(null);
        this.router.navigate(['/']);
      }).catch(err => {
        console.log(err);
      });
  }
}

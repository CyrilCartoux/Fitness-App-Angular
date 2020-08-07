import { AngularFirestore } from 'angularfire2/firestore';
import { UiService } from './../shared/ui.service';
import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Injectable } from '@angular/core';
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
    private firebaseAuth: AngularFireAuth,
    private uiService: UiService,
    private db: AngularFirestore
  ) { }

  createUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    // create the user
    this.firebaseAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
      .then(credentials => {
        this.user = {
          email: credentials.user.email,
          userId: credentials.user.uid
        };
        // store the user in the database
        this.db.collection('users').doc(credentials.user.uid).set({
          email: credentials.user.email,
          userId: credentials.user.uid
        });
        this.uiService.loadingStateChanged.next(false);
        this.uiService.openSnackBar('Success!');
        // navigate away
        this.router.navigate(['/']);
      }).catch(err => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.openSnackBar(err.message);
      });
  }

  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.firebaseAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.user = {
          email: result.user.email,
          userId: result.user.uid
        };
        this.loggedInUser.next(this.user);
        this.uiService.loadingStateChanged.next(false);
        this.uiService.openSnackBar('Success!');
        this.router.navigate(['/training']);
      }).catch(err => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.openSnackBar(err.message);
      });
  }

  initUser() {
    this.firebaseAuth.auth.onAuthStateChanged(user => {
      if (user) {
        const userConnected: User = {
          email: user.email,
          userId: user.uid
        };
        this.loggedInUser.next(userConnected);
      }
    });
  }

  logout() {
    this.firebaseAuth.auth.signOut()
      .then(() => {
        this.loggedInUser.next(null);
        this.router.navigate(['/']);
        this.uiService.openSnackBar('Logged out!');
      }).catch(err => {
        this.uiService.openSnackBar(err.message);
      });
  }
}

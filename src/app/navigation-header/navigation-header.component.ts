import { User } from './../auth/user.model';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.css']
})
export class NavigationHeaderComponent implements OnInit, OnDestroy {

  user: User;
  authSubscription: Subscription;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.authSubscription = this.authService.loggedInUser.subscribe((user: User) => {
        this.user = user;
      });
    }, 500);
  }
  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}

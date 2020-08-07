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
  isAdmin = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.authSubscription = this.authService.loggedInUser.subscribe((user: User) => {
        if (user) {
          if (user.userId === 'aWjSbHxkKUWOcVPUul6IPhWXtmk1') {
            this.isAdmin = true;
          }
        }
        this.user = user;
      });
    }, 500);
  }
  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}

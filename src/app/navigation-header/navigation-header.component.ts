import { User } from './../auth/user.model';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-header',
  templateUrl: './navigation-header.component.html',
  styleUrls: ['./navigation-header.component.css']
})
export class NavigationHeaderComponent implements OnInit {

  user: User;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.loggedInUser.subscribe((user: User) => {
      console.log(user);
      this.user = user;
    });
  }
  onLogout() {
    this.authService.logout();
  }

}

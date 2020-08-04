import { Subscription } from 'rxjs';
import { UiService } from './../../shared/ui.service';
import { AuthService } from './../auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoading = false;
  uiSub: Subscription;


  constructor(
    private authService: AuthService,
    private uiService: UiService
  ) { }

  ngOnInit(): void {
    this.uiSub = this.uiService.loadingStateChanged.subscribe((isLoading: boolean) => {
      this.isLoading = isLoading;
    });
  }

  onLogin(form: NgForm) {
    this.authService.login(form.value);
  }

  ngOnDestroy() {
    if (this.uiSub) {
      this.uiSub.unsubscribe();
    }
  }

}

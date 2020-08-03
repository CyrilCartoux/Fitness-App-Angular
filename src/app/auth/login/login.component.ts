import { AuthService } from './../auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {
    this.isLoading = true;
    this.authService.login(form.value);
    this.isLoading = false;
  }

}

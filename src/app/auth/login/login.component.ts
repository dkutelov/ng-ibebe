import { AuthService } from '../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoading = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onLoginSubmit(form: NgForm) {
    if (form.invalid) return;

    const { username, password } = form.value;
    this.isLoading = true;
    this.authService.loginUser(username, password);
  }
}

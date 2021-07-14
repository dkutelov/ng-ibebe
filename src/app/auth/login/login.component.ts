import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  isLoading = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  saveForm() {
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;
    this.isLoading = true;
    this.authService.loginUser(username, password);
  }
}

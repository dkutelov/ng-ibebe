import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
  });
  isLoading = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  saveForm() {
    if (this.registerForm.invalid) return;

    const { username, email, password, rePassword } = this.registerForm.value;
    if (password !== rePassword) return;

    this.isLoading = true;
    this.authService.registerUser(username, email, password);
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  usernameValidator,
  passwordValidator,
} from '../../shared/form-validators/validators';
import { RegisterValidators } from './validators/register-validators';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  isLoading = false;
  usernameValidator = usernameValidator;
  passwordValidator = passwordValidator;
  // Form fields
  email = new FormControl('', [Validators.required, Validators.email]);
  username = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(/^[a-zA-Z0-9]+$/gm),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(
      /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,}$/gm
    ),
  ]);
  confirmPassword = new FormControl('', [Validators.required]);

  registerForm = new FormGroup(
    {
      email: this.email,
      username: this.username,
      password: this.password,
      confirmPassword: this.confirmPassword,
    },
    [RegisterValidators.match('password', 'confirmPassword')]
  );

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  register() {
    if (this.registerForm.invalid) return;

    const { username, email, password, rePassword } = this.registerForm.value;
    if (password !== rePassword) return;

    this.isLoading = true;
    this.userService.registerUser(username, email, password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
    });
  }
}

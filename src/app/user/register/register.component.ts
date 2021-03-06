import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { usernameValidator } from '../validators/validators';
import { RegisterValidators } from '../validators/register-validators';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  isLoading = false;

  // Form fields
  email = new FormControl('', [Validators.required, Validators.email]);
  username = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    usernameValidator(),
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.pattern(
      /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,}$/gm
    ),
  ]);
  confirmPassword = new FormControl('');

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

    const { username, email, password, confirmPassword } =
      this.registerForm.value;
    if (password !== confirmPassword) return;

    this.isLoading = true;
    this.userService.registerUser(username, email, password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
    });
  }
}

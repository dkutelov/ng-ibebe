import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { usernameValidator, passwordValidator } from '../../shared/validators';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  isLoading = false;
  usernameValidator = usernameValidator;
  passwordValidator = passwordValidator;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  saveForm(form: NgForm) {
    if (form.invalid) return;

    const { username, email, password, rePassword } = form.value;
    if (password !== rePassword) return;

    this.isLoading = true;
    this.authService.registerUser(username, email, password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {
  usernameValidator,
  passwordValidator,
} from '../../shared/form-validators/validators';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  isLoading = false;
  usernameValidator = usernameValidator;
  passwordValidator = passwordValidator;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  saveForm(form: NgForm) {
    if (form.invalid) return;

    const { username, email, password, rePassword } = form.value;
    if (password !== rePassword) return;

    this.isLoading = true;
    this.userService.registerUser(username, email, password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
    });
  }
}

import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-auth-input',
  templateUrl: './auth-input.component.html',
  styleUrls: ['./auth-input.component.css'],
})
export class AuthInputComponent {
  @Input() control: FormControl = new FormControl();
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() format = ''; //empty string makes masking optional
}

import { Subscription } from 'rxjs';
import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  NgForm,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[ngModel][appSameValue]',
  providers: [
    //use dependency injection to be able to use in ngForm
    {
      provide: NG_VALIDATORS,
      useExisting: SameValueDirective,
      multi: true,
    },
  ],
})
export class SameValueDirective implements Validator {
  @Input() appSameValue = '';
  @Input() name!: string;
  otherControl!: AbstractControl;
  subscription!: Subscription;
  constructor(private form: NgForm) {}

  validate(control: AbstractControl): ValidationErrors | null {
    const otherControl = this.form.controls[this.appSameValue];

    if (this.subscription) this.subscription.unsubscribe();

    this.subscription = otherControl.valueChanges!.subscribe(() => {
      control.updateValueAndValidity({ onlySelf: true });
    });

    return control.value !== otherControl?.value
      ? {
          sameValue: {
            [this.name]: control.value,
            [this.appSameValue]: otherControl?.value,
          },
        }
      : null;
  }
}

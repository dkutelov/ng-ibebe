import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomValidatorDirective } from './custom-validator.directive';
import { ShortenTextPipe } from './shorten-text.pipe';
import { PluralizePipe } from './pluralize.pipe';

@NgModule({
  declarations: [CustomValidatorDirective, ShortenTextPipe, PluralizePipe],
  imports: [CommonModule],
  exports: [CustomValidatorDirective, ShortenTextPipe, PluralizePipe],
})
export class SharedModule {}

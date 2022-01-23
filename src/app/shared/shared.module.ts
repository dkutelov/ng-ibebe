import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

import { CustomValidatorDirective } from './form-validators/custom-validator.directive';
import { PluralizePipe } from './pipes/pluralize.pipe';
import { ShortenTextPipe } from './pipes/shorten-text.pipe';
import { TimeDifferencePipe } from './pipes/time-difference.pipe';
import { LoaderComponent } from './loader/loader.component';
import { AuthInputComponent } from './auth-input/auth-input.component';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';

@NgModule({
  declarations: [
    CustomValidatorDirective,
    ShortenTextPipe,
    PluralizePipe,
    ImageGalleryComponent,
    TimeDifferencePipe,
    LoaderComponent,
    AuthInputComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, NgxMaskModule.forRoot()],
  exports: [
    CustomValidatorDirective,
    ShortenTextPipe,
    PluralizePipe,
    ImageGalleryComponent,
    TimeDifferencePipe,
    LoaderComponent,
    AuthInputComponent,
  ],
})
export class SharedModule {}

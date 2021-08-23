import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomValidatorDirective } from './form-validators/custom-validator.directive';
import { ShortenTextPipe } from './pipes/shorten-text.pipe';
import { PluralizePipe } from './pipes/pluralize.pipe';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';
import { TimeDifferencePipe } from './pipes/time-difference.pipe';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    CustomValidatorDirective,
    ShortenTextPipe,
    PluralizePipe,
    ImageGalleryComponent,
    TimeDifferencePipe,
    LoaderComponent,
  ],
  imports: [CommonModule],
  exports: [
    CustomValidatorDirective,
    ShortenTextPipe,
    PluralizePipe,
    ImageGalleryComponent,
    TimeDifferencePipe,
    LoaderComponent,
  ],
})
export class SharedModule {}

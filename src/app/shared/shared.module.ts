import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomValidatorDirective } from './custom-validator.directive';
import { ShortenTextPipe } from './shorten-text.pipe';
import { PluralizePipe } from './pluralize.pipe';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';

@NgModule({
  declarations: [
    CustomValidatorDirective,
    ShortenTextPipe,
    PluralizePipe,
    ImageGalleryComponent,
  ],
  imports: [CommonModule],
  exports: [
    CustomValidatorDirective,
    ShortenTextPipe,
    PluralizePipe,
    ImageGalleryComponent,
  ],
})
export class SharedModule {}

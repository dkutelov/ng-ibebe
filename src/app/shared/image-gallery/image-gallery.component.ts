import { Component, HostListener, Input, OnInit } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s .3s ease-out', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class ImageGalleryComponent implements OnInit {
  @Input() images!: { imageURL: string }[];
  imageArr: { imageURL: string }[] = [];
  currentImageUrl = '';
  isPreviewMode = false;
  currentImageIndex = 0;
  isFirst = true;
  isLast = true;

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(
    event: KeyboardEvent,
  ) {
    if (event.code === 'Escape') {
      this.isPreviewMode = false;
    }
  }

  constructor() {}

  ngOnInit(): void {
    this.imageArr = this.images;
  }

  showImagePreview(i: number): void {
    this.isPreviewMode = true;
    this.currentImageIndex = i;
    this.currentImageUrl = this.imageArr[i].imageURL;
    this.setArrowsVisibility();
  }

  nextImage(): void {
    if (this.currentImageIndex + 1 <= this.imageArr.length - 1) {
      this.currentImageIndex++;
      this.currentImageUrl = this.imageArr[this.currentImageIndex].imageURL;
      this.setArrowsVisibility();
    }
  }
  prevImage(): void {
    if (this.currentImageIndex - 1 >= 0) {
      this.currentImageIndex--;
      this.currentImageUrl = this.imageArr[this.currentImageIndex].imageURL;
      this.setArrowsVisibility();
    }
  }

  closePreview(): void {
    this.isPreviewMode = false;
  }

  setArrowsVisibility(): void {
    if (this.currentImageIndex === 0) {
      this.isFirst = false;
    } else {
      this.isFirst = true;
    }

    if (this.currentImageIndex === this.imageArr.length - 1) {
      this.isLast = false;
    } else {
      this.isLast = true;
    }
  }
}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css'],
})
export class ImageGalleryComponent implements OnInit {
  @Input() images!: { imageURL: string }[];
  imageArr: { imageURL: string }[] = [];
  currentImageUrl = '';
  isPreviewMode = false;
  currentImageIndex = 0;

  constructor() {}

  ngOnInit(): void {
    this.imageArr = this.images;
  }

  showImagePreview(i: number) {
    this.isPreviewMode = true;
    this.currentImageIndex = i;
    this.currentImageUrl = this.imageArr[i].imageURL;
  }

  nextImage() {
    if (this.currentImageIndex + 1 <= this.imageArr.length - 1) {
      this.currentImageIndex++;
      this.currentImageUrl = this.imageArr[this.currentImageIndex].imageURL;
    }
  }
  prevImage() {
    if (this.currentImageIndex - 1 >= 0) {
      this.currentImageIndex--;
      this.currentImageUrl = this.imageArr[this.currentImageIndex].imageURL;
    }
  }
}

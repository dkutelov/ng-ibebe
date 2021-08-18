import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css'],
})
export class ImageGalleryComponent implements OnInit {
  @Input() images!: { imageURL: string }[];
  imageArr: { imageURL: string }[] = [];

  constructor() {}

  ngOnInit(): void {
    this.imageArr = this.images;
  }
}

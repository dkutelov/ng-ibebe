import { ITag } from './../../_models/tag';
import { Component, OnInit } from '@angular/core';
import { IQuestion } from '../../_models/question';
import { ICategory } from '../../_models/category';
import { ImageService } from '../../_services/image.service';

const TAGS: ITag[] = [
  {
    _id: '601175e6d67fd469c75e8df3',
    name: 'Колики',
  },
  {
    _id: '60117602d67fd469c75e8df4',
    name: 'Хранене',
  },
  {
    _id: '6011760bd67fd469c75e8df5',
    name: 'Първи зъбки',
  },
  {
    _id: '6012b62c5e04207183ea09ea',
    name: 'Кърмене',
  },
];
const CATEGORIES: ICategory[] = [
  { _id: '600d59189523cf2606d0a873', name: 'Бъдещи майки' },
  { _id: '600d59489523cf2606d0a874', name: 'Проблемна бременност' },
  { _id: '600d59569523cf2606d0a875', name: 'Име на бебето' },
  { _id: '600d5e3e86de9c26d2d10139', name: 'Кърмене' },
];

@Component({
  selector: 'app-question-create',
  templateUrl: './question-create.component.html',
  styleUrls: ['./question-create.component.css'],
})
export class QuestionCreateComponent implements OnInit {
  question = {
    title: '',
    text: '',
    category: '',
    tags: [],
  };
  tags!: ITag[];
  categories!: ICategory[];
  imageURLs: string[] = [];

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.tags = TAGS;
    this.categories = CATEGORIES;
  }

  onImagePicked(event: Event) {
    if (!event || !event.target) return;
    const files = (event.target as HTMLInputElement).files;

    if (!files) return;
    const file = files[0];

    this.imageService
      .addImage(file)
      .subscribe((response: { message: string; url: string }) => {
        this.imageURLs.push(response.url);
      });
  }

  createQuestion() {
    console.log(this.question);
  }
}

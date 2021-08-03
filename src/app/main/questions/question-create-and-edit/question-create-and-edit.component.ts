import { ITag } from './../../_models/tag';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { IQuestionCreate } from '../../_models/question';
import { ICategory } from '../../_models/category';
import { ImageService } from '../../_services/image.service';
import { NgForm } from '@angular/forms';

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
  selector: 'app-question-create-and-edit',
  templateUrl: './question-create-and-edit.component.html',
  styleUrls: ['./question-create-and-edit.component.css'],
})
export class QuestionCreateAndEditComponent implements OnInit {
  @ViewChild('questionForm') questionForm!: NgForm;
  question: IQuestionCreate = {
    title: '',
    text: '',
    category: '',
    tags: [],
    imageURL: [],
  };
  tags!: ITag[];
  categories!: ICategory[];
  loading = false;

  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any,
  ) {
    if (this.questionForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private imageService: ImageService) {}

  ngOnInit(): void {
    this.tags = TAGS;
    this.categories = CATEGORIES;
  }

  onImagePicked(event: Event) {
    if (!event || !event.target) return;
    const files = (event.target as HTMLInputElement).files;

    if (!files) return;
    this.loading = true;
    const file = files[0];

    this.imageService
      .addImage(file)
      .subscribe((response: { message: string; url: string }) => {
        this.question.imageURL.push(response.url);
        this.loading = false;
      });
  }

  createQuestion() {
    console.log(this.question);
  }
}

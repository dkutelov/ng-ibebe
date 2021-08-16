import { ToasterService } from './../../../toaster/toaster.service';
import { CategoriesService } from './../../../shared/_services/categories.service';
import { QuestionService } from './../../../shared/_services/question.service';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ITag } from '../../../shared/_models/tag';
import { IQuestionCreate } from '../../../shared/_models/question';
import { ICategory } from '../../../shared/_models/category';
import { ImageService } from '../../../shared/_services/image.service';
import { Router } from '@angular/router';

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
  categories!: ICategory[];
  loading = false;

  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any,
  ) {
    if (this.questionForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
    private questionService: QuestionService,
    private categoriesService: CategoriesService,
    private imageService: ImageService,
    private router: Router,
    private toasterService: ToasterService,
  ) {}

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
    });
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

  updateTagsHandler(tags: ITag[]) {
    this.question.tags = [...tags];
  }

  createQuestion() {
    if (this.questionForm.invalid) return;
    this.question = { ...this.question, ...this.questionForm.value };
    this.questionService.createQuestion(this.question).subscribe({
      next: () => {
        this.questionForm.resetForm();
        this.toasterService.success('Question created successfully!');
        this.router.navigate(['/']);
      },
    });
  }
}

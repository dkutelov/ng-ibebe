import { IQuestion } from './../../shared/interfaces/question';
import { switchMap, tap } from 'rxjs/operators';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ToasterService } from '../../core/services/toaster.service';
import { CategoriesService } from '../../core/services/categories.service';
import { QuestionService } from '../../core/services/question.service';
import { ImageService } from '../../core/services/image.service';

import { ITag } from '../../shared/interfaces/tag';
import { IQuestionCreate } from '../../shared/interfaces/question';
import { ICategory } from '../../shared/interfaces/category';

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
  isLoading = false;
  isEditMode = false;
  questionId = '';

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
    private activatedRoute: ActivatedRoute,
    private toasterService: ToasterService,
  ) {}

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
    });

    this.activatedRoute.params
      .pipe(
        tap(({ questionId }) => {
          if (questionId) {
            this.isEditMode = true;
            this.isLoading = true;
          }
        }),
        switchMap(({ questionId }) => {
          if (questionId) return this.questionService.loadQuestion(questionId);
          return of(null);
        }),
      )
      .subscribe((question) => {
        console.log(question);

        if (question) {
          this.question.title = question.title;
          this.question.text = question.text;
          this.question.category = question.category._id;
          this.question.tags = question.tags;
          this.question.imageURL = question.imageURL.map((i) => i.imageURL);
          this.questionId = question.id;
        }
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

  removeImage(imageURL: string) {
    this.question.imageURL = this.question.imageURL.filter(
      (i) => i !== imageURL,
    );
  }

  updateTagsHandler(tags: ITag[]) {
    this.question.tags = [...tags];
  }

  onQuestionFormSubmit() {
    if (this.questionForm.invalid) return;
    this.question = { ...this.question, ...this.questionForm.value };

    if (!this.isEditMode) {
      this.questionService.createQuestion(this.question).subscribe({
        next: () => {
          this.questionForm.resetForm();
          this.toasterService.success('Question created successfully!');
          this.router.navigate(['/']);
        },
      });
    } else {
      this.questionService
        .updateQuestion(this.question, this.questionId)
        .subscribe({
          next: () => {
            this.questionForm.resetForm();
            this.toasterService.success('Question updated successfully!');
            this.router.navigate(['/profile/questions']);
          },
        });
    }
  }
}

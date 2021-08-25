import { Router, ActivatedRoute } from '@angular/router';
import { IAnswer } from 'src/app/shared/interfaces/answer';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ToasterService } from '../../core/services/toaster.service';
import { ImageService } from 'src/app/core/services/image.service';
import { AnswersService } from 'src/app/core/services/answers.service';
import { switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-answer-edit',
  templateUrl: './answer-edit.component.html',
  styleUrls: ['./answer-edit.component.css'],
})
export class AnswerEditComponent implements OnInit {
  @ViewChild('answerForm')
  answerForm!: NgForm;
  answer: IAnswer | null = null;
  imageURL: string[] = [];
  loading = false;
  saving = false;
  isLoading = false;
  isEditMode = false;
  answerId = '';

  constructor(
    private imageService: ImageService,
    private toasterService: ToasterService,
    private answersService: AnswersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        tap(({ answerId }) => {
          if (answerId) {
            this.isEditMode = true;
            this.isLoading = true;
          }
        }),
        switchMap(({ answerId }) => {
          if (answerId) return this.answersService.loadAnswerById(answerId);
          return of(null);
        }),
      )
      .subscribe((answer) => {
        console.log(answer);

        this.answer = answer;
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
        if (!this.answer) return;
        if (!this.answer.imageURL) this.answer.imageURL = [];

        this.answer.imageURL.push({ imageURL: response.url });
        this.loading = false;
      });
  }

  removeImage(imageURL: string) {
    this.answer!.imageURL = this.answer!.imageURL.filter(
      (i) => i.imageURL !== imageURL,
    );
  }

  editAnswer() {
    console.log(this.answer);

    if (this.answerForm.invalid) return;
    this.saving = true;
    this.answer!.text = this.answerForm.value.text;

    this.answersService.updateAnswer(this.answer!).subscribe({
      next: () => {
        this.toasterService.success('You answer was updated successfully!');
        this.answerForm.resetForm();
        this.saving = false;
        this.router.navigate(['/profile/answers']);
      },
    });
  }
}

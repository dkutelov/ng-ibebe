import { ToasterService } from './../../toaster/toaster.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ImageService } from './../../shared/_services/image.service';
import { AnswersService } from 'src/app/shared/_services/answers.service';

@Component({
  selector: 'app-answer-create-and-edit',
  templateUrl: './answer-create-and-edit.component.html',
  styleUrls: ['./answer-create-and-edit.component.css'],
})
export class AnswerCreateAndEditComponent implements OnInit {
  @Input() questionData!: {
    questionId: string;
    userId: string;
    authorId: string;
  };

  @ViewChild('answerForm') answerForm!: NgForm;
  answer: any = {
    imageURL: [],
  };
  loading = false;
  saving = false;

  constructor(
    private imageService: ImageService,
    private toasterService: ToasterService,
    private answersService: AnswersService,
  ) {}

  ngOnInit(): void {
    console.log(this.questionData);
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
        this.answer.imageURL.push(response.url);
        this.loading = false;
      });
  }

  createAnswer() {
    const { questionId, userId, authorId } = this.questionData;

    if (userId === authorId) {
      this.toasterService.error('You can not answer your own questions!');
      this.answerForm.resetForm();
      return;
    }

    if (this.answerForm.invalid) return;

    this.answer = {
      ...this.answer,
      ...this.answerForm.value,
      questionId: this.questionData.questionId,
      userId: this.questionData.userId,
    };
    this.saving = true;
    this.answersService.createAnswer(this.answer).subscribe({
      next: () => {
        this.toasterService.success('Thank you for your answer!');
        this.answerForm.resetForm();
        this.answer.imageURL = [];
        this.saving = false;
      },
    });
  }
}

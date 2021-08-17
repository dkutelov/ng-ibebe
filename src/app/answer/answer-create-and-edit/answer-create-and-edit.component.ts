import { ToasterService } from './../../toaster/toaster.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ImageService } from './../../shared/_services/image.service';
import { AnswersService } from '../answers.service';

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
  imageURL: string[] = [];
  loading = false;
  saving = false;

  constructor(
    private imageService: ImageService,
    private toasterService: ToasterService,
    private answersService: AnswersService,
  ) {}

  ngOnInit(): void {}

  onImagePicked(event: Event) {
    if (!event || !event.target) return;
    const files = (event.target as HTMLInputElement).files;

    if (!files) return;
    this.loading = true;
    const file = files[0];

    this.imageService
      .addImage(file)
      .subscribe((response: { message: string; url: string }) => {
        this.imageURL.push(response.url);
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

    const answer = {
      ...this.answerForm.value,
      imageURL: this.imageURL,
      questionId: this.questionData.questionId,
      userId: this.questionData.userId,
    };
    this.saving = true;
    this.answersService.createAnswer(answer).subscribe({
      next: () => {
        this.toasterService.success('Thank you for your answer!');
        this.answerForm.resetForm();
        this.imageURL = [];
        this.saving = false;
      },
    });
  }
}

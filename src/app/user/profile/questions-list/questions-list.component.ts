import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { ToasterService } from 'src/app/core/services/toaster.service';
import { UserService } from 'src/app/core/services/user.service';
import { QuestionService } from './../../../core/services/question.service';
import { IQuestion } from 'src/app/shared/interfaces/question';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css'],
})
export class QuestionsListComponent implements OnInit {
  myQuestions: IQuestion[] | null = null;

  constructor(
    private questionService: QuestionService,
    private userService: UserService,
    private router: Router,
    private toasterService: ToasterService,
  ) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.userService
      .loadUserProfile()
      .pipe(
        switchMap((profile) => {
          return this.questionService.loadQuestionsByUserId(profile!._id);
        }),
      )
      .subscribe((questions) => {
        this.myQuestions = questions;
      });
  }

  editQuestion(questionId: string): void {
    this.router.navigate(['questions', questionId, 'edit']);
  }

  deleteQuestion(questionId: string): void {
    if (confirm('Are you sure that you want to delete this questions?')) {
      this.questionService
        .deleteQuestion(questionId)
        .subscribe((question: IQuestion) => {
          this.toasterService.error(
            `Question '${question.title}' was deleted!`,
          );
          this.loadQuestions();
        });
    }
  }
}

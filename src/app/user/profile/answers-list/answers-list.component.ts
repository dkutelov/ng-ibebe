import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { AnswersService } from './../../../core/services/answers.service';
import { UserService } from 'src/app/core/services/user.service';
import { ToasterService } from 'src/app/core/services/toaster.service';

import { CurrentUser } from 'src/app/shared/interfaces/user';
import { IAnswer } from './../../../shared/interfaces/answer';

@Component({
  selector: 'app-answers-list',
  templateUrl: './answers-list.component.html',
  styleUrls: ['./answers-list.component.css'],
})
export class AnswersListComponent implements OnInit {
  myAnswers: IAnswer[] | null = null;

  constructor(
    private answerService: AnswersService,
    private userService: UserService,
    private router: Router,
    private toasterService: ToasterService,
  ) {}

  ngOnInit(): void {
    this.loadAnswers();
  }

  loadAnswers(): void {
    this.userService
      .loadUserProfile()
      .pipe(
        switchMap((profile: CurrentUser) => {
          return this.answerService.loadAnswersByUserId(profile!._id);
        }),
      )
      .subscribe((answers) => {
        this.myAnswers = answers;
      });
  }

  editAnswer(answerId: string): void {
    this.router.navigate(['answers', answerId, 'edit']);
  }
  deleteAnswer(answerId: string): void {
    if (confirm('Are you sure that you want to delete this answer?')) {
      this.answerService.deleteAnswer(answerId).subscribe((answer: IAnswer) => {
        this.toasterService.error(`The answer was deleted!`);
        this.loadAnswers();
      });
    }
  }
}

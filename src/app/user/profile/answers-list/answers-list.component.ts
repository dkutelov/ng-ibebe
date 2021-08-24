import { CurrentUser } from 'src/app/shared/interfaces/user';
import { IAnswer } from './../../../shared/interfaces/answer';
import { AnswersService } from './../../../core/services/answers.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { switchMap } from 'rxjs/operators';

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

  editAnswer(answerId: string): void {}
  deleteAnswer(answerId: string): void {}
}

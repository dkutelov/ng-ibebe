import { Component, Input, OnInit } from '@angular/core';

import { ToasterService } from './../../../toaster/toaster.service';
import { AnswersService } from '../../answers.service';
import { AuthService } from './../../../auth/_services/auth.service';
import { IAnswer, IAnswerVote } from '../../answer.model';
import { CurrentUser } from 'src/app/auth/_models/auth.model';

@Component({
  selector: 'app-answer-list-item',
  templateUrl: './answer-list-item.component.html',
  styleUrls: ['./answer-list-item.component.css'],
})
export class AnswerListItemComponent implements OnInit {
  @Input() answerData!: IAnswer;
  answer: IAnswer | null = null;
  user: CurrentUser | null = null;

  constructor(
    public authService: AuthService,
    private answersService: AnswersService,
    private toasterService: ToasterService,
  ) {}

  ngOnInit(): void {
    this.answer = this.answerData;
    this.authService.currentUser$.subscribe((u) => (this.user = u));
  }

  vote(answerId: string, voteType: string) {
    this.answersService
      .vote(answerId, voteType, this.user!.id)
      .subscribe((response: IAnswerVote) => {
        this.toasterService.success(response.message);
        const { upVotesCount, downVotesCount } = response.updatedVotesCount;
        this.answer!.upVotesCount = upVotesCount;
        this.answer!.downVotesCount = downVotesCount;
      });
  }
}

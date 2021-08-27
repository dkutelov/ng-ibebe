import { IComment } from 'src/app/shared/interfaces/comment';
import { Component, Input, OnInit } from '@angular/core';

import { ToasterService } from 'src/app/core/services/toaster.service';
import { AnswersService } from 'src/app/core/services/answers.service';
import { UserService } from 'src/app/core/services/user.service';

import { IAnswer, IAnswerVote } from 'src/app/shared/interfaces/answer';
import { CurrentUser } from 'src/app/shared/interfaces/user';

@Component({
  selector: 'app-answer-list-item',
  templateUrl: './answer-list-item.component.html',
  styleUrls: ['./answer-list-item.component.css'],
})
export class AnswerListItemComponent implements OnInit {
  @Input() answerData!: IAnswer;
  answer: IAnswer | null = null;
  user: CurrentUser | null = null;
  isCommentOpen = false;
  comments!: IComment[];

  constructor(
    public userService: UserService,
    public answersService: AnswersService,
    private toasterService: ToasterService,
  ) {}

  ngOnInit(): void {
    this.answer = this.answerData;
    this.userService.currentUser$.subscribe((u) => (this.user = u));
    this.loadAnswerComments();
  }

  vote(answerId: string, voteType: string) {
    if (!this.user) return;

    this.answersService
      .vote(answerId, voteType, this.user!.id)
      .subscribe((response: IAnswerVote) => {
        this.toasterService.success(response.message);
        const { upVotesCount, downVotesCount } = response.updatedVotesCount;
        this.answer!.upVotesCount = upVotesCount;
        this.answer!.downVotesCount = downVotesCount;
      });
  }

  openComment() {
    this.isCommentOpen = true;
  }

  updateComments() {
    this.loadAnswerComments();
  }

  loadAnswerComments() {
    this.answersService
      .loadCommentsByAnswerId(this.answer!._id!)
      .subscribe((comments) => {
        this.comments = comments;
      });
  }
}

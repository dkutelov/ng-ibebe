import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ToasterService } from '../../core/services/toaster.service';
import { QuestionService } from '../../core/services/question.service';
import { UserService } from '../../core/services/user.service';

import { IQuestion, IQuestionVote } from '../../shared/interfaces/question';
import { CurrentUser } from '../../shared/interfaces/user';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css'],
})
export class QuestionDetailComponent implements OnInit {
  question!: IQuestion | null;
  user: CurrentUser | null = null;
  isCommentOpen = false;

  constructor(
    public questionService: QuestionService,
    private activatedRoute: ActivatedRoute,
    public userService: UserService,
    private toasterService: ToasterService,
  ) {}

  ngOnInit(): void {
    this.loadQuestion();
    this.userService.currentUser$.subscribe((u) => (this.user = u));
  }

  loadQuestion() {
    this.activatedRoute.params.subscribe(({ questionId }) => {
      this.questionService
        .loadQuestion(questionId)
        .subscribe((q: IQuestion) => {
          this.question = q;
        });
      this.questionService.loadCommentsByQuestionId(questionId);
    });
  }

  vote(questionId: string, voteType: string) {
    this.questionService
      .vote(questionId, voteType, this.user!.id)
      .subscribe((response: IQuestionVote) => {
        this.toasterService.success(response.message);
        this.question!.upVotesCount = response.updatedVotesCount.upVotesCount;
        this.question!.downVotesCount =
          response.updatedVotesCount.downVotesCount;
      });
  }

  openComment() {
    this.isCommentOpen = true;
  }

  updateComments() {
    this.questionService.loadCommentsByQuestionId(this.question!.id);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ToasterService } from '../../toaster/toaster.service';
import { QuestionService } from '../../shared/_services/question.service';
import { AuthService } from '../../auth/_services/auth.service';

import { IQuestion, IQuestionVote } from '../../shared/_models/question';
import { CurrentUser } from '../../auth/_models/auth.model';

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
    public authService: AuthService,
    private toasterService: ToasterService,
  ) {}

  ngOnInit(): void {
    this.loadQuestion();
    this.authService.currentUser$.subscribe((u) => (this.user = u));
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

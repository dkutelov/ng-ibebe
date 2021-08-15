import { CurrentUser } from './../../../auth/_models/auth.model';
import { AuthService } from './../../../auth/_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuestionService } from './../../../shared/_services/question.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css'],
})
export class QuestionDetailComponent implements OnInit {
  question$ = this.questionService.question$;
  user: CurrentUser | null = null;

  constructor(
    private questionService: QuestionService,
    private activatedRoute: ActivatedRoute,
    public authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loadQuestion();
    this.authService.currentUser$.subscribe((u) => (this.user = u));
  }

  loadQuestion() {
    this.activatedRoute.params.subscribe(({ questionId }) => {
      this.questionService.loadQuestion(questionId);
    });
  }

  vote(questionId: string, voteType: string) {
    this.questionService
      .vote(questionId, voteType, this.user!.id)
      .subscribe(() => {
        this.loadQuestion();
      });
  }

  downvote() {}
}

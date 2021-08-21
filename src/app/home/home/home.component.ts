import { Component, OnInit } from '@angular/core';

import { IQuestion } from './../../shared/interfaces/question';
import { QuestionService } from './../../core/services/question.service';

const QUESTIONS_PER_SECTION = 6;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private questionService: QuestionService) {}
  public latestQuestions!: IQuestion[];
  public viewedQuestions!: IQuestion[];
  public votedQuestions!: IQuestion[];

  ngOnInit(): void {
    this.loadLatestQuestions();
    this.loadMostViewedQuestions();
    this.loadVotedQuestions();
  }

  loadLatestQuestions() {
    let queryParams = {
      limit: `${QUESTIONS_PER_SECTION}`,
      sortBy: 'latest',
    };
    this.questionService.getQuestions(queryParams).subscribe((questions) => {
      this.latestQuestions = questions;
    });
  }

  loadMostViewedQuestions() {
    let queryParams = {
      limit: `${QUESTIONS_PER_SECTION}`,
      sortBy: 'views',
    };
    this.questionService.getQuestions(queryParams).subscribe((questions) => {
      this.viewedQuestions = questions;
    });
  }

  loadVotedQuestions() {
    let queryParams = {
      limit: `${QUESTIONS_PER_SECTION}`,
      sortBy: 'votes',
    };
    this.questionService.getQuestions(queryParams).subscribe((questions) => {
      this.votedQuestions = questions;
    });
  }
}

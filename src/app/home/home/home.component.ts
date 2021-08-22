import { ILinkItem } from './../../shared/interfaces/link-item';
import { TagsService } from './../../core/services/tags.service';
import { CategoriesService } from './../../core/services/categories.service';
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
  public latestQuestions!: IQuestion[];
  public viewedQuestions!: IQuestion[];
  public votedQuestions!: IQuestion[];

  constructor(
    private questionService: QuestionService,
    public categorieService: CategoriesService,
    public tagService: TagsService,
  ) {}

  ngOnInit(): void {
    this.categorieService.loadCategories();
    this.loadLatestQuestions();
    this.loadMostViewedQuestions();
    this.loadVotedQuestions();
  }

  loadLatestQuestions(): void {
    let queryParams = {
      limit: `${QUESTIONS_PER_SECTION}`,
      sortBy: 'latest',
    };
    this.questionService.getQuestions(queryParams).subscribe((questions) => {
      this.latestQuestions = questions;
    });
  }

  loadMostViewedQuestions(): void {
    let queryParams = {
      limit: `${QUESTIONS_PER_SECTION}`,
      sortBy: 'views',
    };
    this.questionService.getQuestions(queryParams).subscribe((questions) => {
      this.viewedQuestions = questions;
    });
  }

  loadVotedQuestions(): void {
    let queryParams = {
      limit: `${QUESTIONS_PER_SECTION}`,
      sortBy: 'votes',
    };
    this.questionService.getQuestions(queryParams).subscribe((questions) => {
      this.votedQuestions = questions;
    });
  }
}

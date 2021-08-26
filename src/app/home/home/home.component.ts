import { Component, OnInit } from '@angular/core';

import { QuestionService } from './../../core/services/question.service';
import { TagsService } from './../../core/services/tags.service';
import { CategoriesService } from './../../core/services/categories.service';

import { IQuestion } from './../../shared/interfaces/question';

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
    this.tagService.loadTags();
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

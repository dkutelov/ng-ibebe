import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';

import { TagsService } from './../../../core/services/tags.service';
import { CategoriesService } from './../../../core/services/categories.service';
import { QuestionService } from '../../../core/services/question.service';
import { IQueryMap } from 'src/app/shared/interfaces/query-map';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.3s .3s ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: 40, opacity: 1 }),
        animate('.3s ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class QuestionsListComponent implements OnInit {
  questions$ = this.questionService.questions$ || null;
  hasSelection = false;

  constructor(
    public questionService: QuestionService,
    public categoriesService: CategoriesService,
    public tagsService: TagsService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loadQuestions();
    this.categoriesService.loadCategories();
    this.tagsService.loadTags();
  }

  loadQuestions() {
    let queryParams: IQueryMap = {};

    const category = this.activatedRoute.snapshot.queryParamMap.get('category');
    if (category) queryParams.category = category;

    const tag = this.activatedRoute.snapshot.queryParamMap.get('tag');
    if (tag) queryParams.tag = tag;

    this.questionService.loadQuestions(queryParams);
  }

  categoryMenuItemSelected(event: string) {
    this.hasSelection = true;
    this.questionService.loadQuestions({ category: event });
  }

  tagMenuItemSelected(event: string) {
    this.hasSelection = true;
    this.questionService.loadQuestions({ tag: event });
  }

  clearSelection() {
    this.hasSelection = false;
    this.loadQuestions();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { trigger, style, animate, transition } from '@angular/animations';
import { Store } from '@ngrx/store';

import { TagsService } from './../../../core/services/tags.service';
import { CategoriesService } from './../../../core/services/categories.service';
import { QuestionService } from '../../../core/services/question.service';
import { IQueryMap } from 'src/app/shared/interfaces/query-map';
import { selectGlobalQuestions } from 'src/app/_store/selectors';
import { setQueryParams } from 'src/app/_store/actions';

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
  //questions$ = this.questionService.questions$ || null;
  questionsStore$ = this.store.select(selectGlobalQuestions);
  hasSelection = false;
  queryParams: IQueryMap = {
    pageIndex: '1',
    pageSize: '4',
    sortBy: '',
    tag: '',
    category: '',
  };
  questionCount = 0;

  constructor(
    public questionService: QuestionService,
    public categoriesService: CategoriesService,
    public tagsService: TagsService,
    private activatedRoute: ActivatedRoute,
    private store: Store<any>,
  ) {}

  ngOnInit(): void {
    //this.loadQuestions();
    this.loadQuestionStore();
    this.categoriesService.loadCategories();
    this.tagsService.loadTags();
  }

  loadQuestionStore() {
    const category = this.activatedRoute.snapshot.queryParamMap.get('category');
    if (category) this.queryParams.category = category;

    const tag = this.activatedRoute.snapshot.queryParamMap.get('tag');
    if (tag) this.queryParams.tag = tag;

    const search = this.activatedRoute.snapshot.queryParamMap.get('search');
    if (search) this.queryParams.search = search;

    this.questionCount = 0;
    this.store.dispatch(setQueryParams({ queryParams: this.queryParams }));
    this.updateQuestionsCount();
  }

  categoryMenuItemSelected(event: string) {
    this.hasSelection = true;
    this.queryParams = {
      ...this.queryParams,
      pageIndex: '1',
      category: event,
    };
    this.loadQuestionStore();
  }

  tagMenuItemSelected(event: string) {
    this.hasSelection = true;
    this.queryParams = {
      ...this.queryParams,
      pageIndex: '1',
      tag: event,
    };
    this.loadQuestionStore();
  }

  clearSelection() {
    this.hasSelection = false;
    this.queryParams = {
      ...this.queryParams,
      category: '',
      tag: '',
    };
    this.loadQuestionStore();
  }

  onNextPage() {
    this.queryParams = {
      ...this.queryParams,
      pageIndex: `${Number(this.queryParams.pageIndex) + 1}`,
    };
    this.loadQuestionStore();
  }

  onPreviousPage() {
    this.queryParams = {
      ...this.queryParams,
      pageIndex: `${Number(this.queryParams.pageIndex) - 1}`,
    };
    this.loadQuestionStore();
  }

  updateQuestionsCount(): void {
    this.questionService
      .getQuestionsCount(this.queryParams)
      .subscribe((count) => {
        this.questionCount = count;
      });
  }
}

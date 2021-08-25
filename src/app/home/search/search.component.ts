import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fromEvent, of, Observable, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';
import { Router } from '@angular/router';

import { QuestionService } from './../../core/services/question.service';
import { IQuestion } from './../../shared/interfaces/question';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  suggestedQuestions: IQuestion[] | null = null;
  inputEventSubscription!: Subscription;
  constructor(
    private questionService: QuestionService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.suggestedQuestions = null;
    this.inputEventSubscription = fromEvent(
      this.searchInput.nativeElement,
      'input',
    )
      .pipe(
        map((e) => (e.target as HTMLInputElement).value),
        debounceTime(1000),
        distinctUntilChanged(),
        switchMap((searchTerm) => {
          if (searchTerm !== '') {
            return this.questionService.getQuestions({ search: searchTerm });
          }
          return of(null);
        }),
      )
      .subscribe((questions) => {
        console.log(questions);
        if (questions) {
          this.suggestedQuestions = questions;
        }
      });
  }

  handleSearch(searchInput: HTMLInputElement): void {
    const searchText = searchInput.value;
    this.router.navigate(['questions'], {
      queryParams: { search: searchText },
    });
  }

  onSuggestionClick(questionId: string): void {
    this.router.navigate(['questions', questionId]);
  }

  ngOnDestroy(): void {
    this.inputEventSubscription.unsubscribe();
  }
}

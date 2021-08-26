import { QuestionService } from './../core/services/question.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadQuestions,
  loadQuestionsSuccess,
  loadQuestionsCancel,
  loadQuestionsFailure,
  setQueryParams,
} from './actions';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';

@Injectable()
export class GlobalEffects {
  loadQuestions = createEffect(() =>
    this.actions$.pipe(
      ofType(setQueryParams),
      switchMap((action) =>
        this.questionService.getQuestions(action.queryParams).pipe(
          takeUntil(this.actions$.pipe(ofType(loadQuestionsCancel))),
          map((questions) => loadQuestionsSuccess({ questions })),
          catchError((error) => [loadQuestionsFailure({ error })]),
        ),
      ),
    ),
  );
  // loadQuestions = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(loadQuestions),
  //     switchMap(() =>
  //       this.questionService.getQuestions().pipe(
  //         takeUntil(this.actions$.pipe(ofType(loadQuestionsCancel))),
  //         map((questions) => loadQuestionsSuccess({ questions })),
  //         catchError((error) => [loadQuestionsFailure({ error })]),
  //       ),
  //     ),
  //   ),
  // );

  constructor(
    private actions$: Actions,
    private questionService: QuestionService,
  ) {}
}

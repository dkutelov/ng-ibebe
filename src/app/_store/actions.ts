import { IQuestion } from './../shared/interfaces/question';
import { createAction, props } from '@ngrx/store';
import { IQueryMap } from '../shared/interfaces/query-map';

const namespace = '[GLOBAL]';

export const loadQuestions = createAction(`${namespace} load questions`);

export const loadQuestionsSuccess = createAction(
  `${namespace} load questions success`,
  props<{ questions: IQuestion[] }>(),
);

export const loadQuestionsFailure = createAction(
  `${namespace} load questions failure`,
  props<{ error: Error }>(),
);

export const loadQuestionsCancel = createAction(
  `${namespace} load questions cancel`,
);

export const setQueryParams = createAction(
  `${namespace} set questions query params`,
  props<{ queryParams: IQueryMap }>(),
);

export const clearQueryParams = createAction(
  `${namespace} set questions query params`,
);

export const clearGlobalState = createAction(`${namespace} clear global state`);

export const clearAppState = createAction(`${namespace} clear app state`);

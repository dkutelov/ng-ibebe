import { createSelector } from '@ngrx/store';
import { IState } from '.';

export const selectGlobal = (state: IState) => state.global;

export const selectGlobalQuestionsCount = createSelector(
  selectGlobal,
  (state) => state.questionsCount,
);

export const selectGlobalQueryParams = createSelector(
  selectGlobal,
  (state) => state.queryParams,
);

export const selectGlobalQuestions = createSelector(
  selectGlobal,
  (state) => state.questions,
);

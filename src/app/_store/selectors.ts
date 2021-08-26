import { createSelector } from '@ngrx/store';
import { IState } from '.';

export const selectGlobal = (state: IState) => state.global;

export const selectGlobalQueryParams = createSelector(
  selectGlobal,
  (state) => state.queryParams,
);

export const selectGlobalQuestions = createSelector(
  selectGlobal,
  (state) => state.questions,
);

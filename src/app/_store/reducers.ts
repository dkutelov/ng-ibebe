import { IQuestion } from './../shared/interfaces/question';
import { createReducer, on } from '@ngrx/store';
import {
  clearGlobalState,
  loadQuestionsSuccess,
  setQueryParams,
  clearQueryParams,
} from './actions';
import { IQueryMap } from '../shared/interfaces/query-map';

export interface IGlobalState {
  readonly questions: IQuestion[] | null;
  readonly queryParams: IQueryMap | null;
}

const initialState: IGlobalState = {
  questions: null,
  queryParams: null,
};

export const globalReducer = createReducer(
  initialState,
  on(setQueryParams, (state, { queryParams }) => {
    return {
      ...state,
      queryParams,
    };
  }),
  on(clearQueryParams, (state) => ({
    ...state,
    queryParams: initialState.queryParams,
  })),
  on(loadQuestionsSuccess, (state, { questions }) => ({ ...state, questions })),
  on(clearGlobalState, () => initialState),
);

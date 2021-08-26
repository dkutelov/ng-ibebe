import { IQuestion } from './../shared/interfaces/question';
import { createReducer, on } from '@ngrx/store';
import {
  clearGlobalState,
  loadQuestionsSuccess,
  setQuestionsCount,
  setQueryParams,
  clearQueryParams,
} from './actions';
import { IQueryMap } from '../shared/interfaces/query-map';

export interface IGlobalState {
  readonly questions: IQuestion[] | null;
  readonly queryParams: IQueryMap;
  readonly questionsCount: number;
}

const initialState: IGlobalState = {
  questions: null,
  questionsCount: 0,
  queryParams: {
    pageIndex: '1',
    pageSize: '3',
  },
};

export const globalReducer = createReducer(
  initialState,
  on(setQuestionsCount, (state, { count }) => ({ ...state, count })),
  on(setQueryParams, (state, { queryParams }) => ({
    ...state,
    queryParams: {
      ...state.queryParams,
      ...queryParams,
    },
  })),
  on(clearQueryParams, (state) => ({
    ...state,
    queryParams: initialState.queryParams,
  })),
  on(loadQuestionsSuccess, (state, { questions }) => ({ ...state, questions })),
  on(clearGlobalState, () => initialState),
);

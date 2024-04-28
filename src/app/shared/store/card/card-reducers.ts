import { createReducer, on } from '@ngrx/store';
import { ICardState } from './card-state';
import { loadCardsError, loadCardsSuccess } from './card-actions';

const initialState: ICardState = {
  cards: [],
  error: null,
  loading: false,
};

export const cardReducer = createReducer(
  initialState,
  on(loadCardsSuccess, (state, { cards }) => ({
    ...state,
    cards,
  })),
  on(loadCardsError, (state, { error }) => ({
    ...state,
    error,
  }))
);

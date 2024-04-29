import { createReducer, on } from '@ngrx/store';
import { ICardState } from './card-state';
import { loadCardsError, loadCardsSuccess, selectCard } from './card-actions';

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
  })),
  on(selectCard, (state, { id, selected }) => ({
    ...state,
    cards: state.cards.map((card) => {
      if (card.id == id) {
        card.selected = selected;
        return card;
      }

      return card;
    }),
  }))
);

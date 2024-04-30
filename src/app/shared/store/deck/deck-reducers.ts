import { createReducer, on } from '@ngrx/store';
import { DeckState } from './deck-state';
import { addDeck, removeDeck, updateDeck } from './deck-actions';

const initialState: DeckState = {
  decks: [],
};

export const deckReducer = createReducer(
  initialState,
  on(addDeck, (state, { name, cards }) => ({
    ...state,
    decks: [...state.decks, { id: state.decks.length + 1, name, cards }],
  })),
  on(removeDeck, (state, { id }) => ({
    ...state,
    decks: state.decks.filter((value) => value.id != id),
  })),
  on(updateDeck, (state, { id, name, cards }) => {
    const decks = state.decks.map((deck) => {
      if (deck.id == id) {
        return { id, name, cards };
      }
      return deck;
    });

    return { ...state, decks };
  })
);

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DeckState } from './deck-state';

const decks = createFeatureSelector<DeckState>('decksState');

export const userDecks = createSelector(decks, (state) => state.decks);

export const selectDeckById = (id: number) => createSelector(decks, (state) => state.decks.find((value) => value.id == id));

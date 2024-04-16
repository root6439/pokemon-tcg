import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DeckState } from './deck-state';

const decks = createFeatureSelector<DeckState>('decks');

export const userDecks = createSelector(decks, (state) => state.decks);

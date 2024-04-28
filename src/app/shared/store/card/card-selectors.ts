import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICardState } from './card-state';

const cardsFeature = createFeatureSelector<ICardState>('cardsState');

export const cards = createSelector(cardsFeature, (state) => state.cards);

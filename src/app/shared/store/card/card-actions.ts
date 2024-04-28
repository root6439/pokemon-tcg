import { createAction, props } from '@ngrx/store';
import { Card } from 'pokemon-tcg-sdk-typescript/dist/sdk';

export const loadCards = createAction('[Cards] Load Cards');

export const loadCardsSuccess = createAction('[Cards] Load Cards Success', props<{ cards: Card[] }>());

export const loadCardsError = createAction('[Cards] Load Cards Error', props<{ error: any }>());

import { createAction, props } from '@ngrx/store';
import { ICard } from '../../models/Card';

export const loadCards = createAction('[Cards] Load Cards');

export const loadCardsSuccess = createAction('[Cards] Load Cards Success', props<{ cards: ICard[] }>());

export const loadCardsError = createAction('[Cards] Load Cards Error', props<{ error: any }>());

export const selectCard = createAction('[Cards] Select Card', props<{ id: string, selected: boolean }>());

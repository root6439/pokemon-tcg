import { createAction, props } from '@ngrx/store';
import { Card } from 'pokemon-tcg-sdk-typescript/dist/sdk';

export const addDeck = createAction('[Deck] Add Deck', props<{ name: string; cards: Card[] }>());

export const removeDeck = createAction('[Deck] Remove Deck', props<{ id: number }>());

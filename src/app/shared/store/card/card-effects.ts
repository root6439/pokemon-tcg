import { Actions, ofType, createEffect } from '@ngrx/effects';
import { CardService } from '../../services/card.service';
import { loadCards, loadCardsError, loadCardsSuccess } from './card-actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class CardEffects {
  constructor(private actions$: Actions, private cardService: CardService) {}

  loadCards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCards),
      mergeMap(() =>
        this.cardService.searchCards().pipe(
          map((cards) => loadCardsSuccess({ cards })),
          catchError((error) => of(loadCardsError({ error })))
        )
      )
    )
  );
}

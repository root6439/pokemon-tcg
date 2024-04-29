import { Component } from '@angular/core';
import { Deck } from '../../shared/models/Deck';
import { DeckComponent } from '../../components/deck/deck.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Store, select } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { userDecks } from '../../shared/store/deck/deck-selectors';
import { AppState } from '../../shared/store/app-state';

@Component({
  selector: 'app-decks',
  standalone: true,
  imports: [DeckComponent, RouterModule, MatButtonModule, CommonModule],
  templateUrl: './decks.component.html',
  styleUrl: './decks.component.scss',
})
export class DecksComponent {
  constructor(private store: Store<AppState>) {
    this.decks$ = this.store.select(userDecks)

    this.store.pipe(select(state => console.log(state)))
  }

  decks$: Observable<Deck[]>;
}

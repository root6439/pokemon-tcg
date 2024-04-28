import { Component, OnInit } from '@angular/core';
import { Card } from 'pokemon-tcg-sdk-typescript/dist/sdk';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';
import { Store, select } from '@ngrx/store';
import { addDeck } from '../../shared/store/deck/deck-actions';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { loadCards } from '../../shared/store/card/card-actions';
import { AppState } from '../../shared/store/app-state';
import { cards } from '../../shared/store/card/card-selectors';

@Component({
  selector: 'app-new-deck',
  standalone: true,
  imports: [CommonModule, CardComponent, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './new-deck.component.html',
  styleUrl: './new-deck.component.scss',
})
export class NewDeckComponent implements OnInit {
  constructor(private store: Store<AppState>) {
    this.cards$ = this.store.select(cards);
  }

  cards$: Observable<Card[]>;

  selectedCards: Card[] = [];

  nameControl = new FormControl<string>('', [Validators.required]);

  ngOnInit(): void {
    this.store.dispatch(loadCards());

    this.cards$.subscribe((value) => console.log(value));
  }

  addCard(card: Card) {
    this.selectedCards.push(card);
  }

  createDeck() {
    this.store.dispatch(addDeck({ name: this.nameControl.value, cards: this.selectedCards }));
  }
}

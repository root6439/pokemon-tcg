import { Component, OnInit } from '@angular/core';
import { CardService } from '../../shared/services/card.service';
import { Card } from 'pokemon-tcg-sdk-typescript/dist/sdk';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';
import { Store } from '@ngrx/store';
import { addDeck } from '../../shared/store/deck/deck-actions';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-new-deck',
  standalone: true,
  imports: [CommonModule, CardComponent, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './new-deck.component.html',
  styleUrl: './new-deck.component.scss',
})
export class NewDeckComponent implements OnInit {
  constructor(private cardService: CardService, private store: Store) {}

  cards$: Observable<Card[]>;

  selectedCards: Card[] = [];

  nameControl = new FormControl<string>('', [Validators.required]);

  ngOnInit(): void {
    this.cards$ = this.cardService.searchCards();
  }

  addCard(card: Card) {
    this.selectedCards.push(card);
  }

  createDeck() {
    this.store.dispatch(addDeck({ name: this.nameControl.value, cards: this.selectedCards }));
  }
}

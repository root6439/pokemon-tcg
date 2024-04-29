import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';
import { Store } from '@ngrx/store';
import { addDeck } from '../../shared/store/deck/deck-actions';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { loadCards, selectCard } from '../../shared/store/card/card-actions';
import { AppState } from '../../shared/store/app-state';
import { cards } from '../../shared/store/card/card-selectors';
import { ICard } from '../../shared/models/Card';
import { Card } from 'pokemon-tcg-sdk-typescript/dist/sdk';

@Component({
  selector: 'app-new-deck',
  standalone: true,
  imports: [CommonModule, CardComponent, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './new-deck.component.html',
  styleUrl: './new-deck.component.scss',
})
export class NewDeckComponent implements OnInit {
  constructor(private store: Store<AppState>, private fb: FormBuilder) {
    this.cards$ = this.store.select(cards);
  }

  cards$: Observable<ICard[]>;

  deckForm = this.fb.group({
    name: ['', Validators.required],
    cards: this.fb.array([]),
  });

  ngOnInit(): void {
    this.store.dispatch(loadCards());
    this.cards$.subscribe((value) => console.log(value));
  }

  addCard(card: ICard) {
    this.formSelectedCards.push(new FormControl(card));
  }

  createDeck() {
    console.log(this.deckForm.value);

    // tentei usar {...this.deckForm.value} para passar meus dados para a action porém está dando erro de tipagem
    // como o prazo está apertado, passarei os valores manualmente e num momento posterior farei uma refatoração dessa parte
    this.store.dispatch(addDeck({ name: this.deckForm.get('name').value, cards: this.formSelectedCards.value }));
  }

  get formSelectedCards(): FormArray {
    return this.deckForm.get('cards') as FormArray;
  }

  getCardSelected(id: string): boolean {
    return (this.formSelectedCards.value as Card[]).some((card) => card.id == id);
  }
}

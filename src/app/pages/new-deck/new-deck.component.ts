import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';
import { Store } from '@ngrx/store';
import { addDeck, updateDeck } from '../../shared/store/deck/deck-actions';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { loadCards } from '../../shared/store/card/card-actions';
import { AppState } from '../../shared/store/app-state';
import { cards } from '../../shared/store/card/card-selectors';
import { ICard } from '../../shared/models/Card';
import { Card } from 'pokemon-tcg-sdk-typescript/dist/sdk';
import { ActivatedRoute } from '@angular/router';
import { selectDeckById } from '../../shared/store/deck/deck-selectors';
import { Deck } from '../../shared/models/Deck';

@Component({
  selector: 'app-new-deck',
  standalone: true,
  imports: [CommonModule, CardComponent, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './new-deck.component.html',
  styleUrl: './new-deck.component.scss',
})
export class NewDeckComponent implements OnInit, AfterViewInit {
  constructor(private store: Store<AppState>, private fb: FormBuilder, private route: ActivatedRoute) {
    this.cards$ = this.store.select(cards);
  }

  cards$: Observable<ICard[]>;

  deckForm = this.fb.group({
    name: ['', Validators.required],
    cards: this.fb.array([]),
  });

  deckId: number;

  ngOnInit(): void {
    this.store.dispatch(loadCards());
  }

  ngAfterViewInit(): void {
    this.verifyEditPage();
  }

  verifyEditPage() {
    this.deckId = this.route.snapshot.params['id'];

    if (this.deckId) {
      this.store
        .select(selectDeckById(this.deckId))
        .pipe(take(1))
        .subscribe((deck) => {
          this.deckForm.get('name').setValue(deck.name);
          const controls = deck.cards.map((value) => this.fb.control(value));
          controls.forEach((value) => this.formSelectedCards.push(value));
        });
    }
  }

  handleClickCard(card: ICard) {
    const index = this.formSelectedCards.value.findIndex((value: Card) => value.id == card.id);
    if (index == -1) {
      this.formSelectedCards.push(new FormControl(card));
    } else {
      this.formSelectedCards.removeAt(index);
    }
  }

  createDeck() {
    // tentei usar {...this.deckForm.value} para passar meus dados para a action porém está dando erro de tipagem
    // como o prazo está apertado, passarei os valores manualmente e num momento posterior farei uma refatoração dessa parte
    if (this.deckId) {
      this.store.dispatch(updateDeck({ id: this.deckId, name: this.deckForm.get('name').value, cards: this.formSelectedCards.value }));
    } else {
      this.store.dispatch(addDeck({ name: this.deckForm.get('name').value, cards: this.formSelectedCards.value }));
    }
  }

  get formSelectedCards(): FormArray {
    return this.deckForm.get('cards') as FormArray;
  }

  getCardSelected(id: string): boolean {
    return (this.formSelectedCards.value as Card[]).some((card) => card.id == id);
  }
}

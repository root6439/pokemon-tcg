import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Subscription, debounceTime, fromEvent, take } from 'rxjs';
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
import { ICard } from '../../shared/models/Card';
import { Card } from 'pokemon-tcg-sdk-typescript/dist/sdk';
import { ActivatedRoute, Router } from '@angular/router';
import { selectDeckById } from '../../shared/store/deck/deck-selectors';
import { ICardState } from '../../shared/store/card/card-state';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-new-deck',
  standalone: true,
  imports: [CommonModule, CardComponent, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule, LoadingComponent],
  templateUrl: './new-deck.component.html',
  styleUrl: './new-deck.component.scss',
})
export class NewDeckComponent implements OnInit, AfterViewInit {
  constructor(private store: Store<AppState>, private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.store.select((state) => state.cardsState).subscribe((value) => (this.cardState = value));
  }

  cardState: ICardState;

  deckForm = this.fb.group({
    name: ['', Validators.required],
    cards: this.fb.array([]),
  });

  deckId: number;
  scrollSubscription: Subscription;

  ngOnInit(): void {
    this.store.dispatch(loadCards());
  }

  ngAfterViewInit(): void {
    this.verifyEditPage();

    const div = document.getElementById('cardsDiv') as HTMLDivElement;
    this.scrollSubscription = fromEvent(div, 'scroll')
      .pipe(debounceTime(500)) // Tempo de debounce de 200ms
      .subscribe(() => this.onScroll(div));
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
    this.router.navigateByUrl('/');
  }

  get formSelectedCards(): FormArray {
    return this.deckForm.get('cards') as FormArray;
  }

  getCardSelected(id: string): boolean {
    return (this.formSelectedCards.value as Card[]).some((card) => card.id == id);
  }

  onScroll(element: HTMLDivElement) {
    const scrollPosition = element.scrollTop;
    const elementHeight = element.clientHeight;
    const scrollHeight = element.scrollHeight;

    if (scrollPosition + elementHeight >= scrollHeight) {
      // load more cards
      // this.store.dispatch()
    }
  }
}

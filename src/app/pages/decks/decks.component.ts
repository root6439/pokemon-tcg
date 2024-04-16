import { Component } from '@angular/core';
import { Deck } from '../../shared/models/Deck';
import { DeckComponent } from '../../components/deck/deck.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-decks',
  standalone: true,
  imports: [DeckComponent, RouterModule],
  templateUrl: './decks.component.html',
  styleUrl: './decks.component.scss',
})
export class DecksComponent {
  decks: Deck[] = [
    { id: 1, name: 'seila' },
    { id: 1, name: 'seila' },
    { id: 1, name: 'seila' },
    { id: 1, name: 'seila' },
    { id: 1, name: 'seila' },
  ];
}

import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Card } from 'pokemon-tcg-sdk-typescript/dist/sdk';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'deck',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.scss',
})
export class DeckComponent {
  @Input()
  id: number;

  @Input()
  name: string;

  @Input()
  cards: Card[] = [];

  removeDeck() {
    
  }
}

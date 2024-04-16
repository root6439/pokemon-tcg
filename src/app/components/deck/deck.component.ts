import { Component, Input } from '@angular/core';
import { Card } from 'pokemon-tcg-sdk-typescript/dist/sdk';

@Component({
  selector: 'deck',
  standalone: true,
  imports: [],
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
}

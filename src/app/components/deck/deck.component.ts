import { Component, Input } from '@angular/core';

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
}

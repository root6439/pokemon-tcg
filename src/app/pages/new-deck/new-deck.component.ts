import { Component, OnInit } from '@angular/core';
import { CardService } from '../../shared/services/card.service';
import { Card } from 'pokemon-tcg-sdk-typescript/dist/sdk';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-new-deck',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './new-deck.component.html',
  styleUrl: './new-deck.component.scss',
})
export class NewDeckComponent implements OnInit {
  constructor(private cardService: CardService) {}

  cards$: Observable<Card[]>;

  ngOnInit(): void {
    this.cards$ = this.cardService.searchCards();
  }
}

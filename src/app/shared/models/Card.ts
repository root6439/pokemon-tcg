import { Card } from 'pokemon-tcg-sdk-typescript/dist/sdk';

export interface ICard extends Card {
  selected?: boolean;
}

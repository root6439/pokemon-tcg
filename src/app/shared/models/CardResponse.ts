import { Card } from 'pokemon-tcg-sdk-typescript/dist/sdk';

export class CardResponse {
  data: Card[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
}

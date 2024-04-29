import { ICard } from './Card';

export class CardResponse {
  data: ICard[];
  page: number;
  pageSize: number;
  count: number;
  totalCount: number;
}

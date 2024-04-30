import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CardResponse } from '../models/CardResponse';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private serverUrl = 'https://api.pokemontcg.io/v2/cards';

  constructor(private http: HttpClient) {}

  getCards() {}

  searchCards(query: string = '', page: number = 1, pageSize: number = 12) {
    const params = new HttpParams({ fromObject: { q: query, page, pageSize } });
    return this.http.get<CardResponse>(this.serverUrl, { params: params }).pipe(map((value) => value.data));
  }
}

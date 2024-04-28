import { Card } from "pokemon-tcg-sdk-typescript/dist/sdk";

export interface ICardState {
    cards: Card[];
    loading: boolean;
    error: unknown;
}
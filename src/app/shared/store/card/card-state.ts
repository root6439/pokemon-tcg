import { ICard } from "../../models/Card";

export interface ICardState {
    cards: ICard[];
    loading: boolean;
    error: unknown;
}
import { ICardState } from "./card/card-state";
import { DeckState } from "./deck/deck-state";

export class AppState {
    decksState: DeckState;
    cardsState: ICardState;
}
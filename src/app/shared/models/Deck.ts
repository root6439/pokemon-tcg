import { Card } from "pokemon-tcg-sdk-typescript/dist/sdk";

export class Deck {
    id: number;
    name: string;
    cards?: Card[];
}
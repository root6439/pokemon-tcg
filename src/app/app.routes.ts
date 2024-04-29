import { Routes } from '@angular/router';
import { DecksComponent } from './pages/decks/decks.component';
import { NewDeckComponent } from './pages/new-deck/new-deck.component';

export const routes: Routes = [
  { path: '', component: DecksComponent },
  { path: 'new-deck', component: NewDeckComponent },
  { path: 'edit-deck/:id', component: NewDeckComponent },
];

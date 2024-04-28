import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { AuthInterceptor } from './shared/interceptors/auth.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { deckReducer } from './shared/store/deck/deck-reducers';
import { metaReducers } from './shared/store/localstorage-reducer';
import { provideEffects } from '@ngrx/effects';
import { CardEffects } from './shared/store/card/card-effects';
import { cardReducer } from './shared/store/card/card-reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideStore({
        decksState: deckReducer,
        cardsState: cardReducer
    }, { metaReducers }),
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true,
    },
    provideEffects(CardEffects),
    provideHttpClient(),
    provideAnimationsAsync(),
],
};

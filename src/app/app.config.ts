import { KeycloakService } from "keycloak-angular";
import { APP_INITIALIZER, ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { environment } from "../environments/environment";
import { provideHttpClient } from "@angular/common/http";
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { destinationsFeature } from "./store/reducers/destinations.reducer";
import { selectionFeature, selectionReducer } from "./store/reducers/selection.reducer";
import { loadDestinations$ } from "./store/effects/destinations.effects";
import { changeOriginSelection$, changeDestinationsSelections$} from "./store/effects/selection.effects";
const keycloakUrl:string= environment.keycloakUrl;
function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.keycloakUrl,
        realm: 'central',
        clientId: 'space-traveler',
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/silent-check-sso.html',
      },
    });
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(),
    provideState(destinationsFeature),
    provideState(selectionFeature),
    provideEffects({loadDestinations$}),
    provideEffects({changeOriginSelection$}),
    provideEffects({changeDestinationsSelections$}),
    provideStoreDevtools(),
    KeycloakService,
    {
        provide: APP_INITIALIZER,
        useFactory: initializeKeycloak,
        multi: true,
        deps: [KeycloakService],
    },
    { provide: LOCALE_ID, useValue: "fr-FR" },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    provideAnimationsAsync(),
]
};

import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withNavigationErrorHandler, RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withNavigationErrorHandler((err) => {
        console.error('Navigation error:', err);
        // you could redirect to a fallback page here
      })
    ),
    provideClientHydration(),
    importProvidersFrom([
      BrowserAnimationsModule,
      RouterModule,
    ])
  ]
};

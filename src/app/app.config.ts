import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withNavigationErrorHandler } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withNavigationErrorHandler((err: any) => {
        console.error('Navigation error:', err);
        // example redirect:
        // window.location.href = '/error';
      })
    ),
    provideClientHydration(),
    provideAnimations() // ✅ replaces BrowserAnimationsModule
  ]
};

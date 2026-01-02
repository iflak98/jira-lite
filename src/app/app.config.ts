import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideNgToast, ToastPosition } from 'ng-angular-popup';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideNgToast({
      duration: 3000,
      maxToasts: 3,
      position: "toaster-top-right" as ToastPosition, 
      width: 400,
      showProgress: true,
      dismissible: true,
      showIcon: true,
      enableAnimations: true
    }),
    provideRouter(routes),
    provideClientHydration(withEventReplay())
  ]
};

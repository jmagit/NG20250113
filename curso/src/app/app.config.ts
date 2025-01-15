import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { LoggerService } from '@my/core';

export const appConfig: ApplicationConfig = {
  providers: [
    // LoggerService,
    // { provide: LoggerService, useValue: new LoggerService() },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};

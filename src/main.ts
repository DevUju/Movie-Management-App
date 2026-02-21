import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { AuthInterceptor } from './app/auth/auth-interceptor';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([AuthInterceptor]), withFetch())
  ]
}).catch((err) => console.error(err));

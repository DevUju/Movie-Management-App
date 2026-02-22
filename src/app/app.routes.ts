import { Routes } from '@angular/router';
import { authGuard } from './auth/auth-guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./auth/login/login').then(m => m.Login)
    },
    {
        path: 'movies',
        canActivate: [authGuard],
        loadComponent: () => import('./movies/movie').then(m => m.Movies)
    },
    {
        path: 'movies/:id',
        canActivate: [authGuard],
        loadComponent: () => import('./movies/movie-detail/movie-detail').then(m => m.MovieDetail)
    },
    {
        path: 'favorites',
        canActivate: [authGuard],
        loadComponent: () => import('./favorites/favorite/favorites').then(m => m.Favorites)
    },
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];

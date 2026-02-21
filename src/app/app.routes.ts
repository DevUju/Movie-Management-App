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
        loadComponent: () => import('./movies/movie-list/movie-list').then(m => m.MovieList)
    },
    {
        path: 'movies/:id',
        canActivate: [authGuard],
        loadComponent: () => import('./movies/movie-detail/movie-detail').then(m => m.MovieDetail)
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

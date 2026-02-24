import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  private favoriteMovies: any[] = [];

  private favSubject = new BehaviorSubject<any[]>([]);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  favorite$ = this.favSubject.asObservable();

  constructor() {
    if (this.isBrowser) {
      const storedFavs = localStorage.getItem('favoriteMovies');
      if (storedFavs) {
        this.favoriteMovies = JSON.parse(storedFavs);
        this.favSubject.next(this.favoriteMovies);
      }
    }
  }

  private updateLocalStorage() {
    if (this.isBrowser) {
      localStorage.setItem('favoriteMovies', JSON.stringify(this.favoriteMovies));
    }
  }

  addToFavorite(movie: any) {
    const existingMovie = this.favoriteMovies.find((m) => m.id === movie.id);
    if (existingMovie) {
      existingMovie.quantity += 1;
    } else {
      this.favoriteMovies.push({ ...movie, quantity: 1 });
    }
    this.favSubject.next(this.favoriteMovies);
    this.updateLocalStorage();
  }

  getFavouriteMovies() {
    return this.favoriteMovies;
  }

  removeFromFavorite(movieId: number) {
    this.favoriteMovies = this.favoriteMovies.filter((m) => m.id !== movieId);
    this.favSubject.next(this.favoriteMovies);
    this.updateLocalStorage();
  }

  clearFavorites() {
    this.favoriteMovies = [];
    this.favSubject.next(this.favoriteMovies);
    this.updateLocalStorage();
  }

  getTotalFavoriteItems() {
    return this.favoriteMovies.reduce((total, movie) => total + movie.quantity, 0);
  }
}
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private favorites: any[] = [];

  add(movie: any) {
    this.favorites.push(movie);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  remove(id: number) {
    this.favorites = this.favorites.filter(m => m.id !== id);
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  getAll(): any[] {
    const stored = localStorage.getItem('favorites');
    this.favorites = stored ? JSON.parse(stored) : [];
    return this.favorites;
  }
}
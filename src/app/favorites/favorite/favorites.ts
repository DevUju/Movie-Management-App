import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FavoriteService } from '../favorites';
import { Router } from '@angular/router';
import { Navbar } from '../../header/navbar/navbar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites {
  favouriteCounter$!: Observable<number>;
  favoriteMovies: any[] = [];
  favoriteMovies$!: Observable<any[]>;

  constructor(
    private favoriteService: FavoriteService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.favoriteMovies$ = this.favoriteService.favorite$;
    this.favoriteService.favorite$.subscribe((movies) => {
      this.favoriteMovies = movies;
    });
    this.favouriteCounter$ = this.favoriteService.favorite$.pipe(
      map((movies) => movies.reduce((total: number, m: any) => total + (m.quantity || 0), 0))
    );
  }

  getTotalFavorites(): number {
    return this.favoriteMovies.length;
  }

  removeFromFavorites(movieId: any): void {
    this.favoriteService.removeFromFavorite(movieId);
  }

  clearFavorites(): void {
    this.favoriteService.clearFavorites();
  }

  goBackToMovie(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/movies']);
    });
  }
}

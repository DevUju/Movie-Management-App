import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { FavoriteService } from '../../favorites/favorites';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-list.html',
   styleUrls: ['./movie-list.css'],
})
export class MovieList implements OnInit {
  @Input() movies: any[] = [];
  favoriteMovies: any[] = [];
  favoriteMovies$!: Observable<any[]>;

  constructor(
    private movieService: MovieService,
    private cdr: ChangeDetectorRef,
    private favoriteService: FavoriteService,
  ) {}

  ngOnInit() {
    this.favoriteMovies$ = this.favoriteService.favorite$;
    this.favoriteService.favorite$.subscribe((movies) => {
      this.favoriteMovies = movies;
      this.cdr.markForCheck();
    });
  }

  addToFavorites(movie: any): void {
    this.favoriteService.addToFavorite(movie);
  }

  isFavorited(movieId: number): boolean {
    return this.favoriteMovies.some((m) => m.id === movieId);
  }
}
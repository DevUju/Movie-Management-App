import { Component, Input, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { FavoriteService } from '../../favorites/favorites';


@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-list.html',
   styleUrls: ['./movie-list.css'],
})
export class MovieList implements OnInit {
@Input() movies: any[] = [];

constructor(
  private movieService: MovieService,
  private cdr: ChangeDetectorRef,
  private favoriteService: FavoriteService,
) {}

ngOnInit() {}

addToFavorites(movie: any): void {
  this.favoriteService.addToFavorite(movie);
}
}
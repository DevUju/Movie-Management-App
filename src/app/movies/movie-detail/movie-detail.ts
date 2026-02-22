import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';
import { FavoriteService } from '../../favorites/favorites';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-detail.html',
  styleUrls: ['./movie-detail.css'],
})
export class MovieDetail implements OnInit {
  movie: any | null = null;
  addedToFavorites = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private favoriteService: FavoriteService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('MovieDetail init, id=', id);
    if (id) {
      this.movieService.getMovie(id).subscribe({
        next: (res) => {
          console.log('API response:', res);
          this.movie = res;
          this.errorMessage = '';
        },
        error: (err) => {
          console.error('Failed to load movie detail:', err);
          this.errorMessage = `Error: ${err}`;
        }
      });
    } else {
      console.warn('No movie id found on route');
      this.errorMessage = 'No movie ID in route';
    }
  }

  addToFavorites(movie: any): void {
    this.favoriteService.addToFavorite(movie);
    this.addedToFavorites = true;
    setTimeout(() => this.addedToFavorites = false, 2000);
  }

  goBack(): void {
    history.back();
  }
}

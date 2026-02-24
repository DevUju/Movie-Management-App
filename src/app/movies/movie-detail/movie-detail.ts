import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  loadingMessage: string = 'Loading movie details...';
  favoriteMovies: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private favoriteService: FavoriteService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      const timeoutId = setTimeout(() => {
        if (!this.movie && !this.errorMessage) {
          this.errorMessage = 'Request timeout. Please check your internet connection or try again.';
          this.cdr.markForCheck();
        }
      }, 10000);
      
      this.movieService.getMovie(id).subscribe({
        next: (res) => {
          clearTimeout(timeoutId);
          this.movie = res;
          this.errorMessage = '';
          this.cdr.markForCheck();
        },
        error: (err) => {
          clearTimeout(timeoutId);
          this.errorMessage = err?.message || String(err) || 'Unknown error loading movie';
          this.cdr.markForCheck();
        },
        complete: () => {
          clearTimeout(timeoutId);
        }
      });
    } else {
      this.errorMessage = 'No movie ID in route. Did you click "View Details" from the movie list?';
      this.cdr.markForCheck();
    }
  }

  goBack(): void {
    history.back();
  }
}

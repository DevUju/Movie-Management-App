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
  loadingMessage: string = 'Loading movie details...';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private favoriteService: FavoriteService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('[MovieDetail] Init with id=', id);
    
    if (id) {
      console.log('[MovieDetail] Calling getMovie service with id:', id);
      
      // Add a timeout to catch if request hangs
      const timeoutId = setTimeout(() => {
        if (!this.movie && !this.errorMessage) {
          console.warn('[MovieDetail] Request timeout after 10 seconds');
          this.errorMessage = 'Request timeout. Please check your internet connection or try again.';
        }
      }, 10000);
      
      this.movieService.getMovie(id).subscribe({
        next: (res) => {
          clearTimeout(timeoutId);
          console.log('[MovieDetail] Got response:', res);
          this.movie = res;
          this.errorMessage = '';
        },
        error: (err) => {
          clearTimeout(timeoutId);
          console.error('[MovieDetail] Got error:', err);
          this.errorMessage = err?.message || String(err) || 'Unknown error loading movie';
        },
        complete: () => {
          clearTimeout(timeoutId);
          console.log('[MovieDetail] Observable completed');
        }
      });
    } else {
      console.warn('[MovieDetail] No movie id found on route');
      this.errorMessage = 'No movie ID in route. Did you click "View Details" from the movie list?';
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

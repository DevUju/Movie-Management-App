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

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private favoriteService: FavoriteService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.movieService.getMovie(id).subscribe((res) => {
        this.movie = res;
      });
    }
  }

  addToFavorites(movie: any): void {
    this.favoriteService.addToFavorite(movie);
  }

  goBack(): void {
    history.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './movie-list.html',
})
export class MovieList implements OnInit {
  movies: any[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getMovies().subscribe({
      next: (res: any[]) => {
        console.log('Movies:', res); // ✅ check console
        this.movies = res;
      },
      error: (err: any) => console.error('Error fetching movies:', err) // ❌ check console
    });
  }
}
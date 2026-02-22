import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MovieService } from './movie.service';
import { MovieList } from './movie-list/movie-list';
import { Navbar } from '../header/navbar/navbar';
// FavoriteService and `Favorites` component removed from imports — not used here


@Component({
  selector: 'app-movie',
  standalone: true,
  imports: [RouterModule, MovieList, Navbar],
  templateUrl: './movie.html',
  styleUrls: ['./movie.css'],
})
export class Movies implements OnInit {
  moviesData: any[] = [];
  private allMovies: any[] = [];
  searchQuery: string = '';

  private _favouriteCounter = new BehaviorSubject<number>(0);
  favouriteCounter$: Observable<number> = this._favouriteCounter.asObservable();

  constructor(
    private movieService: MovieService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.getMovieData();
  }

  onSearchApp(query: string): void {
    this.searchQuery = query;
    if (query.length > 0) {
      const lowerQuery = query.toLowerCase();
      this.moviesData = this.allMovies.filter((movie) => 
        movie.original_title.toLowerCase().includes(lowerQuery) || 
        movie.overview.toLowerCase().includes(lowerQuery)
      );
    } else {
      this.moviesData = this.allMovies;
    }
    this.cdr.detectChanges();
  }


 getMovieData(){
    this.movieService.getMovies().subscribe({
      next: (res: any[]) => {
        this.allMovies = res;
        this.moviesData = res;
        this.cdr.detectChanges();
      },
      error: (err: any) => console.error('Error fetching movies:', err),
    });
 }

}
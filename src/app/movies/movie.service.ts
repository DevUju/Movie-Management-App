import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../environments/environment'; // ✅ correct path
import { ErrorHandler } from '../error-handling/error-handler';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private api = `${environment.baseUrl}/movie/popular?api_key=${environment.apiKey}`;

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandler,
  ) {}

  getMovies(): Observable<any[]> {
    return this.http.get<any>(this.api).pipe(
      // map(response => response.results),
      // catchError((err) => this.errorHandler.handleError(err))
      map((response) => {
        console.log('API response:', response);
        return response.results;
      }),
    );
  }

  getMovie(id: string): Observable<any> {
    return this.http
      .get<any>(`${environment.baseUrl}/movie/${id}?api_key=${environment.apiKey}`)
      .pipe(catchError((err) => this.errorHandler.handleError(err)));
  }
}

import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';  

@Injectable({
  providedIn: 'root',
})
export class ErrorHandler {

  handleError(error: HttpErrorResponse) {
    let errorMessage = "";

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Network Error: ${error.error.message}`;
    } else {
      switch (error.status){
        case 400:
          errorMessage = "Bad request. Please check your input.";
          break;
        case 401:
          errorMessage = "Unauthorised. Please log in again.";
          break;
        case 403:
          errorMessage = "Forbidden. You do not have access.";
          break;
        case 404:
          errorMessage = "Resource not found.";
          break;
        case 500:
          errorMessage = "Internal server error. Please try later.";
          break;
        default:
          errorMessage = `API Error: ${error.status} ${error.statusText}`;
      }
    }

    console.error('API Error:', errorMessage, error);

    return throwError(() => new Error(errorMessage));
  }
}
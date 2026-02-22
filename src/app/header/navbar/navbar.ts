import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Search } from './search/search';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, Search, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  @Input() favouriteCounter$?: Observable<number>;

  @Output() getSearchQueryNav = new EventEmitter<string>();

  onSearchNav(query: string): void {
    console.log('Received search query from Search component:', query);
    this.getSearchQueryNav.emit(query);
  } 

}

import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Search } from './search/search';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, Search, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  @Input() favouriteCounter$?: Observable<number>;

  @Output() getSearchQueryNav = new EventEmitter<string>();

  constructor(private authService: AuthService) {}

  onSearchNav(query: string): void {
    console.log('Received search query from Search component:', query);
    this.getSearchQueryNav.emit(query);
  }

  logout(): void {
    const confirmed = confirm('Are you sure you want to logout?');
    if (confirmed) {
      this.authService.logout();
    }
  }

}

import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  imports: [FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {

  searchTerm: string = '';
  @Output() searchQuery = new EventEmitter<string>();

  onSearch(query?: string): void {
    const term = ((query ?? this.searchTerm) || "").trim();
    if (term) {
      this.searchQuery.emit(term);
    }

  }
}

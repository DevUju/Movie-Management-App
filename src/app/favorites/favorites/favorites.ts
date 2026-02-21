import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../favorites';
import { CommonModule, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, SlicePipe],
  templateUrl: './favorites.html',
})
export class Favorites implements OnInit {
  favorites: any[] = [];

  constructor(private favService: FavoritesService) {}

  ngOnInit() {
    this.favorites = this.favService.getAll();
  }

  remove(id: number) {
    this.favService.remove(id);
    this.favorites = this.favService.getAll();
  }
}
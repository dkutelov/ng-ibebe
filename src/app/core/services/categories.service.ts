import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { ICategory } from 'src/app/shared/interfaces/category';
import { ILinkItem } from './../../shared/interfaces/link-item';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private categories = new BehaviorSubject<ILinkItem[] | null>(null);
  categories$ = this.categories.asObservable();

  constructor(private httpClient: HttpClient) {}

  getCategories() {
    return this.httpClient.get<ICategory[]>(`/api/categories`);
  }

  loadCategories(): void {
    this.categories.next(null);
    this.httpClient
      .get<ILinkItem[]>(`/api/categories`)
      .subscribe((categories) => {
        if (categories.length > 0) {
          this.categories.next(categories);
        }
      });
  }
}

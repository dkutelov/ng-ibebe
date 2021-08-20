import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ICategory } from 'src/app/shared/interfaces/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}

  getCategories() {
    return this.httpClient.get<ICategory[]>(`/api/categories`);
  }
}

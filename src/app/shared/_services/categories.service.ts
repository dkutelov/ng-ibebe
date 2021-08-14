import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICategory } from '../_models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}

  getCategories() {
    return this.httpClient.get<ICategory[]>(
      `${environment.baseApiUrl}/categories`,
    );
  }
}

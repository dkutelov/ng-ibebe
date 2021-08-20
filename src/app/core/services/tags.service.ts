import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ITag } from 'src/app/shared/interfaces/tag';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor(private httpClient: HttpClient) {}

  getTags(searchTerm: string = '') {
    return this.httpClient.get<ITag[]>(`/api/tags?search=${searchTerm}`);
  }
}

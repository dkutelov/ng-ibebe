import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { ITag } from '../_models/tag';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor(private httpClient: HttpClient) {}

  getTags(searchTerm: string = '') {
    return this.httpClient.get<ITag[]>(
      `${environment.baseApiUrl}/tags?search=${searchTerm}`,
    );
  }
}

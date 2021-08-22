import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ILinkItem } from 'src/app/shared/interfaces/link-item';

import { ITag } from 'src/app/shared/interfaces/tag';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  private tags = new BehaviorSubject<ILinkItem[] | null>(null);
  tags$ = this.tags.asObservable();

  constructor(private httpClient: HttpClient) {}

  getTags(searchTerm: string = '') {
    return this.httpClient.get<ITag[]>(`/api/tags?search=${searchTerm}`);
  }

  loadTags(): void {
    this.tags.next(null);
    this.httpClient.get<ILinkItem[]>(`/api/tags`).subscribe((tags) => {
      if (tags.length > 0) {
        this.tags.next(tags);
      }
    });
  }
}

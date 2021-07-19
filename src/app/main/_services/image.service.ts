import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private httpClient: HttpClient) {}

  addImage(file: File) {
    const fileName = 'ibebe-' + Date.now().toString();
    const data = new FormData();
    data.append('image', file, fileName);
    return this.httpClient.post<{ message: string; url: string }>(
      `${environment.baseApiUrl}/image`,
      data,
    );
  }
}

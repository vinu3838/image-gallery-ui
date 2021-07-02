import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class ImageGalleryService {
  constructor(private http: HttpClient) {}

  getImages(): Observable<object> {
    return this.http.get(`${environment.apiUrl}/image`);
  }

  uploadImage(image): Observable<object> {
    return this.http.post(`${environment.apiUrl}/image/upload`, image);
  }

  deleteImage(imageId): Observable<object> {
    return this.http.delete(`${environment.apiUrl}/image/${imageId}`);
  }
}

import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthInterceptor } from '../interceptors/auth-interceptors';
import { HttpErrorInterceptor } from '../interceptors/error-interceptor';

import { SharedMaterialModule } from '../shared/shared-material.module';
import { ImageGalleryService } from './image-gallery-service/image-gallery.service';

import { ImageGalleryComponent } from './image-gallery/image-gallery.component';

const routes: Routes = [
  {
    path: '',
    component: ImageGalleryComponent
  }
];

@NgModule({
  declarations: [ImageGalleryComponent],
  imports: [
    CommonModule,
    SharedMaterialModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    ImageGalleryService
  ]
})
export class ImageGalleryModule { }

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ImageGalleryService } from '../image-gallery-service/image-gallery.service';

import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss'],
})
export class ImageGalleryComponent implements OnInit, OnDestroy {
  notifier = new Subject();
  imageUploadPath: string = environment.imageUpladPath;
  constructor(private imageGalleryService: ImageGalleryService, private toastr: ToastrService) {}
  images$: Observable<any>;
  ngOnInit(): void {
    this.images$ = this.imageGalleryService.getImages();
  }

  uploadImages(event): void {
    let selectImage = event.target.files[0];
    let uploadData = new FormData();
    uploadData.append('image', selectImage, selectImage.name);
    this.imageGalleryService.uploadImage(uploadData)
    .pipe(takeUntil(this.notifier))
    .subscribe(
      (data) => {
        this.toastr.success('Image Upladed Successfully');
        this.images$ = this.imageGalleryService.getImages();
      },
      (err) => {
        console.log(err);
        selectImage = null;
        uploadData = null;
      }
    );
  }

  deleteImage(imageId): void {
    this.imageGalleryService.deleteImage(imageId)
    .pipe(takeUntil(this.notifier))
    .subscribe(
      (data) => {
        this.images$ = this.imageGalleryService.getImages();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
}
}

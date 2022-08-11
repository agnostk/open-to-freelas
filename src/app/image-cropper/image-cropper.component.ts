import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.css'],
})
export class ImageCropperComponent {
  @Input()
  file: any = undefined;
  @Output()
  imageCropEvent = new EventEmitter<string>();

  croppedImage: any = '';

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.imageCropEvent.emit(this.croppedImage);
  }
  imageLoaded(image: LoadedImage) {
    console.log(image);
  }
  cropperReady() {}
  loadImageFailed() {}
}

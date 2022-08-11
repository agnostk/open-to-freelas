import * as ngxCropper from 'ngx-image-cropper';

import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';

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
  loading = true;
  croppedImage: any = '';
  @ViewChild(ngxCropper.ImageCropperComponent)
  imageCropper!: ngxCropper.ImageCropperComponent;

  imageCropped(event: ngxCropper.ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.imageCropEvent.emit(this.croppedImage);
  }

  cropperReady() {
    this.loading = false;
  }

  public crop() {
    this.imageCropper.crop();
  }
}

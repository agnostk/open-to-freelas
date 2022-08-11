import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-image-builder',
  templateUrl: './image-builder.component.html',
  styleUrls: ['./image-builder.component.css'],
})
export class ImageBuilderComponent implements AfterViewInit {
  CANVAS_SIZE = 380;
  OUT_SIZE = 512;
  dragging = false;
  canDownload = false;
  showCropModal = false;
  loadedImageFile: any = undefined;
  croppedImageFile: any = undefined;
  @ViewChild('imgCanvas')
  imgCanvas!: ElementRef<HTMLCanvasElement>;
  context!: CanvasRenderingContext2D;
  placeholder!: HTMLImageElement;
  render = false;
  downloadUrl = '';

  @HostListener('dragover', ['$event']) onDragOver(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.dragging = true;
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.dragging = false;
  }

  @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.dragging = false;
    if (event.dataTransfer!.files && event.dataTransfer!.files[0]) {
      this.loadedImageFile = event.dataTransfer!.files[0];
      this.showCropModal = true;
    }
  }

  ngAfterViewInit() {
    this.context = this.imgCanvas.nativeElement.getContext('2d')!;
    this.updateCanvasSize(window);
    this.setupBadge();
  }

  updateCanvasSize(window: Window): void {
    this.CANVAS_SIZE = Math.ceil(Math.min(window.innerWidth * 0.8, 360));
    this.imgCanvas.nativeElement.width = this.CANVAS_SIZE;
    this.imgCanvas.nativeElement.height = this.CANVAS_SIZE;
  }

  onAddFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.loadedImageFile = event.target.files[0];
      this.showCropModal = true;
    }
  }

  setupBadge(): void {
    this.placeholder = new Image();
    this.placeholder.src = 'assets/images/person.jpg';
    this.placeholder.onload = () => {
      this.context.drawImage(
        this.placeholder,
        0,
        0,
        this.CANVAS_SIZE,
        this.CANVAS_SIZE
      );
      var badge = new Image();
      badge.src = 'assets/images/selo-open-to-freelas.png';
      badge.onload = () => {
        this.context.drawImage(badge, 0, 0, this.CANVAS_SIZE, this.CANVAS_SIZE);
      };
    };
  }

  setupPicture(): void {
    var picture = new Image();
    picture.src = this.croppedImageFile;
    picture.onload = () => {
      const pW = picture.width;
      const pH = picture.height;
      const targetSize =
        pW > pH ? (pW / pH) * this.CANVAS_SIZE : (pH / pW) * this.CANVAS_SIZE;
      this.placeholder.width = targetSize;
      this.placeholder.height = targetSize;
      this.placeholder.src = picture.src;
      setTimeout(() => this.setupExportableImage(), 300);
    };
  }

  setupExportableImage(): void {
    var outCanvas = document.createElement('canvas');
    outCanvas.width = this.OUT_SIZE;
    outCanvas.height = this.OUT_SIZE;
    outCanvas
      .getContext('2d')
      ?.drawImage(
        this.imgCanvas.nativeElement,
        0,
        0,
        this.CANVAS_SIZE,
        this.CANVAS_SIZE,
        0,
        0,
        outCanvas.width,
        outCanvas.height
      );
    this.downloadUrl = outCanvas.toDataURL();
    this.canDownload = true;
  }

  onImageCrop(event: any) {
    console.log(event);
    this.croppedImageFile = event;
  }

  crop() {
    this.showCropModal = false;
    this.setupPicture();
  }
}

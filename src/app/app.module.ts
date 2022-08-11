import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ImageCropperModule } from 'ngx-image-cropper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';
import { ImageBuilderComponent } from './image-builder/image-builder.component';

@NgModule({
  declarations: [AppComponent, ImageCropperComponent, ImageBuilderComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'open-to-freelas' }),
    ImageCropperModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

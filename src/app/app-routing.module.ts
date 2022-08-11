import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageBuilderComponent } from './image-builder/image-builder.component';

const routes: Routes = [{ path: '', component: ImageBuilderComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

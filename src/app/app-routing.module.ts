import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './auth-guard';

const routes: Routes = [
  {
    path: 'image-gallery',
    loadChildren: () =>
      import('./image-gallery/image-gallery.module').then(
        (m) => m.ImageGalleryModule
      ),
    canLoad: [AuthGuardService],
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

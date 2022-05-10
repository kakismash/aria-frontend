import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RequestInterceptor } from './auth/request-interceptor.service';
import { ResponseInterceptor } from './auth/response-interceptor.service';

const routes: Routes = [
  {
    path: 'panel/building',
    loadChildren: () => import('./building/building.module').then( m => m.BuildingModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor,  multi: true }
  ]
})
export class AppRoutingModule { }

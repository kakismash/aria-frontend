import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
    { path: 'home',       loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
    { path: 'user',       loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
    { path: 'role',       loadChildren: () => import('./role/role.module').then(m => m.RoleModule) },
    { path: 'document',   loadChildren: () => import('./document/document.module').then(m => m.DocumentModule) },
    { path: 'apartment',  loadChildren: () => import('./apartment/apartment.module').then(m => m.ApartmentModule) },
    { path: 'building',   loadChildren: () => import('./building/building.module').then(m => m.BuildingModule) },
    { path: 'floor',      loadChildren: () => import('./floor/floor.module').then(m => m.FloorModule) }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

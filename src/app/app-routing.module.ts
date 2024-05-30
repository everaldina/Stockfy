import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './modules/auth/components/auth/auth.component';
import { AuthGuard } from './modules/auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { ListProductsComponent } from './components/list-products/list-products.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'login', component: AuthComponent},
  { path: 'products', component: ListProductsComponent, canActivate: [AuthGuard]},
  { path:'lotes/:id', component: HomeComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

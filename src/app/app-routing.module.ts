import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './modules/auth/components/auth/auth.component';
import { AuthGuard } from './modules/auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { ListProductsComponent } from './components/list-products/list-products.component';

const routes: Routes = [
  { path: '', redirectTo: 'produtos', pathMatch: 'full'},
  { path: 'login', component: AuthComponent},
  { path: 'produtos', component: ListProductsComponent, canActivate: [AuthGuard]},
  { path: 'lotes/:id', component: HomeComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

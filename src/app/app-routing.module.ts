import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './modules/auth/components/auth/auth.component';
import { AuthGuard } from './modules/auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { ListagemComponent } from './pages/listagem/listagem.component';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'listagem', component: ListagemComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }

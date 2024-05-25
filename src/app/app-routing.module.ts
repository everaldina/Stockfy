import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './modules/auth/components/auth/auth.component';
import { AuthGuard } from './modules/auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: '', canActivate: [AuthGuard] 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

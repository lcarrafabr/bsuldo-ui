import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardInvestimentosComponent } from './dashboard-investimentos/dashboard-investimentos.component';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard-investimentos',
    component: DashboardInvestimentosComponent,
    canActivate: [AuthGuard],
    //data: { roles: ['ROLE_PESQUISAR_CATEGORIAS']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardInvestimentosRoutingModule { }

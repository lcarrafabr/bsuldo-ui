import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AvisosAutomaticosPesquisaComponent } from './avisos-automaticos-pesquisa/avisos-automaticos-pesquisa.component';
import { AuthGuard } from '../seguranca/auth.guard';

const routes: Routes = [
  {
    path: 'avisos-automaticos',
    component: AvisosAutomaticosPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CATEGORIAS']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvisosAutomaticosRoutingModule { }

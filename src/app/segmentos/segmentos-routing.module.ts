import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SegmentoPesquisaComponent } from './segmento-pesquisa/segmento-pesquisa.component';
import { AuthGuard } from '../seguranca/auth.guard';
import { SegmentoCadastroComponent } from './segmento-cadastro/segmento-cadastro.component';

const routes: Routes = [
  {
    path: 'segmentos',
    component: SegmentoPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CATEGORIAS']}
  },
  {
    path: 'segmentos/novo',
    component: SegmentoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_CATEGORIAS']}
  },
  {
    path: 'segmentos/:codigo',
    component: SegmentoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_EDITAR_CATEGORIAS']}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SegmentosRoutingModule { }

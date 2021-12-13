import { Table } from 'primeng/table/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { UsuarioFiltro, UsuariosService } from './../usuarios.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-usuario-pesquisa',
  templateUrl: './usuario-pesquisa.component.html',
  styleUrls: ['./usuario-pesquisa.component.css']
})
export class UsuarioPesquisaComponent implements OnInit {

  @ViewChild('tabela', {static: true}) grid: Table;

  usuarios = [];
  nomeUsuario: string;

  constructor(
    private usuarioService: UsuariosService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService
  ) { }

  ngOnInit(): void {

    this.pesquisarUsuarios();
  }


  pesquisarUsuarios() {

    const filtro: UsuarioFiltro = {
      nomeUsuario: this.nomeUsuario
    }

    this.usuarioService.listarUsuarios(filtro)
    .then(usuario => {

      this.usuarios = usuario;
    })

  }




}

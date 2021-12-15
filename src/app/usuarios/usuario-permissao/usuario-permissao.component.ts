import { ErrorHandlerService } from './../../core/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { UsuariosService } from './../usuarios.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario-permissao',
  templateUrl: './usuario-permissao.component.html',
  styleUrls: ['./usuario-permissao.component.css']
})
export class UsuarioPermissaoComponent implements OnInit {

  listSource = [];
  listTarget = [];

  idUsuario: number

  constructor(
    private usuarioService: UsuariosService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    const codigoUsuario = this.route.snapshot.params['codigo']
    this.idUsuario = codigoUsuario;

    console.log('codigo usuario: ' + codigoUsuario);

    this.carregarUsuarioPorIDPegarPermissoes(codigoUsuario);
    this.carregarPermissoesDisponiveis(codigoUsuario);
  }

  carregarUsuarioPorIDPegarPermissoes(codigo: number) {

    this.usuarioService.buscaPorIDPegarPermissoes(codigo)
    .then(usuario => {
      usuario.senha = '';
      this.listTarget = usuario.permissoes;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPermissoesDisponiveis(codigo: number) {

    this.usuarioService.buscaPermissoesDisponiveis(codigo)
    .then(permissoes => {
      this.listSource = permissoes;
      console.log(permissoes);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }


  verificaItem02() {

    let codigoPermissao: number;



      console.log(this.listTarget);



      this.usuarioService.adicionarPermissoesAoUsuario(this.listTarget, this.idUsuario)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Usuario cadastrado com sucesso', closable: false });
        //form.reset();

        //this.usuario = new Usuario;
      })
      .catch(erro => this.errorHandler.handle(erro));
    }



}

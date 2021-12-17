import { Table } from 'primeng/table/table';
import { Usuario } from './../../core/model';
import { UsuariosService } from './../usuarios.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuario-cadastro',
  templateUrl: './usuario-cadastro.component.html',
  styleUrls: ['./usuario-cadastro.component.css']
})
export class UsuarioCadastroComponent implements OnInit {
  @ViewChild('tabela', {static: true}) grid: Table;

  validaFormulario = false;
  resenha: string;
  usuario = new Usuario;
  usuarioPermissaoGrade = [];
  codigoUsuario: number;

  codigoPessoa = 0;
  nomePessoa = '';

  ocultaComboUsuario = false;

  displayModal: boolean;

  mensagemTela = 'Selecione o usuário no combo abaixo:';

  pessoas = [];

  constructor(
    private usuarioService: UsuariosService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    const codigoUsuario = this.route.snapshot.params['codigo']
    this.codigoUsuario = codigoUsuario;

    //console.log(codigoUsuario)

    this.pegaValorUsuario('');
    if (codigoUsuario != undefined && codigoUsuario != null && codigoUsuario != NaN && codigoUsuario) {
      this.carregarUsuarioPorID(codigoUsuario);
    }

    this.carregarPessoas();
    //this.pegaValorUsuario('');
    if(codigoUsuario != undefined && codigoUsuario != null && codigoUsuario != NaN && codigoUsuario) {
      this.carregarUsuarioPorIDPegarPermissoes(codigoUsuario);
    }

  }

  get editando() {
    return Boolean (this.usuario.usuarioId);
  }

  salvar(form: FormControl) {

    if(this.editando) {

     this.atualizarUsuario(form);

    } else {

      this.adicionar(form);
    }
  }


  adicionar(form: FormControl) {

    this.validaSenhas(this.usuario.senha, this.resenha);

    if(this.validaFormulario) {

      this.usuario.status = true;
      this.usuario.pessoa.pessoaID = this.codigoPessoa;

      this.usuarioService.adicionar(this.usuario)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Usuario cadastrado com sucesso', closable: false });
        form.reset();

        this.usuario = new Usuario;
      })
      .catch(erro => this.errorHandler.handle(erro));
    }

  }

  atualizarUsuario(form: FormControl) {

    this.usuarioService.atualizarUsuario(this.usuario)
    .then(usuario => {

      this.usuario = usuario;
      this.messageService.add({ severity: 'success', detail: 'Usuario atualizado com sucesso', closable: false });
    })
    .catch(erro => this.errorHandler.handle(erro));

  }


  carregarUsuarioPorID(codigo: number) {

    this.usuarioService.buscaPorID(codigo)
    .then(usuario => {
      usuario.senha = '';
      this.usuario = usuario;
      this.validaTelaEditando(true);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarUsuarioPorIDPegarPermissoes(codigo: number) {

    this.usuarioService.buscaPorIDPegarPermissoes(codigo)
    .then(usuario => {
      usuario.senha = '';
      this.usuarioPermissaoGrade = usuario.permissoes;
      this.validaTelaEditando(true);
    })
    .catch(erro => this.errorHandler.handle(erro));
  }


  validaSenhas(senha: string, repetirSenha: string) {

    if(senha != repetirSenha) {
      this.messageService.add({ severity: 'warn', detail: 'As senhas digitadas não são iguais', closable: false });
      this.validaFormulario = false;
      this.resenha = repetirSenha;
    }else {
      this.validaFormulario = true;
      this.resenha = repetirSenha
    }
  }

  carregarPessoas() {

    this.usuarioService.listarPessoas()
    .then(pessoas => {
      this.pessoas = pessoas.map(p => {
        return {label: p.nomePessoa, value: p.pessoaID}
      });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  pegaValorUsuario(valor: any){

    if(valor != null) {

      this.codigoPessoa = valor.value;
      this.nomePessoa = valor.label;
    }
    this.validaMensagemTela();
  }

  showModalDialog() {
    this.displayModal = true;
}

  private validaMensagemTela() {

    if(this.codigoPessoa == 0 || this.codigoPessoa == undefined) {

      this.mensagemTela = 'Selecione o usuário no combo abaixo:';
    } else {
      this.mensagemTela = this.nomePessoa;
    }
  }


  private validaTelaEditando(booleam) {

    if(booleam) {

      this.nomePessoa = this.usuario.pessoa.nomePessoa;
      this.mensagemTela = this.usuario.pessoa.nomePessoa;
      this.ocultaComboUsuario = true;
      this.codigoUsuario = this.usuario.usuarioId;
      this.codigoPessoa = this.usuario.pessoa.pessoaID
    }

  }

}

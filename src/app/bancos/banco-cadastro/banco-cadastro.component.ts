import { Component, OnInit } from '@angular/core';
import { BancoService } from '../banco.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormControl } from '@angular/forms';
import { Bancos } from 'src/app/core/model';

@Component({
  selector: 'app-banco-cadastro',
  templateUrl: './banco-cadastro.component.html',
  styleUrls: ['./banco-cadastro.component.css']
})
export class BancoCadastroComponent implements OnInit {

  codigoUsuarioLogado: string;
  bancos = new Bancos;

  constructor(
    private bancosService: BancoService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    //this.codigoUsuarioLogado = localStorage.getItem('IDS');
    this.codigoUsuarioLogado = localStorage.getItem('idToken');

    const codigoBanco = this.route.snapshot.params['codigo'];

    if(codigoBanco) {
      this.carregarPorId(codigoBanco);
    }
  }

  get editando() {

    return Boolean (this.bancos.bancoId);
  }

  salvar(form: FormControl) {

    if(this.editando) {

      this.atualizarBancos(form);

    } else {

      this.adicionar(form);
    }
  }

  adicionar(form: FormControl) {

    //this.bancos.pessoa.pessoaID = parseInt(this.codigoUsuarioLogado);

    this.bancosService.adicionar(this.bancos, this.codigoUsuarioLogado)
    .then(() => {
      this.messageService.add({ severity: 'success', detail: 'Banco cadastrado com sucesso!', closable: false});
      form.reset();
      this.bancos = new Bancos();
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  carregarPorId(codigo: number) {

    this.bancosService.buscarPorCodigo(codigo, this.codigoUsuarioLogado)
    .then(response => {
      this.bancos = response;

    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  atualizarBancos(form: FormControl) {

    //this.bancos.pessoa.pessoaID = parseInt(this.codigoUsuarioLogado);

    this.bancosService.atualizarBanco(this.bancos, this.codigoUsuarioLogado)
    .then(response => {
      this.bancos = response;
      this.messageService.add({ severity: 'success', detail: 'Banco atualizado com sucesso!', closable: false });
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

}

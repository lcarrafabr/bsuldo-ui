import { Component, OnInit } from '@angular/core';
import { Origens } from '../../core/model';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormControl } from '@angular/forms';
import { OrigemService } from '../origem.service';

@Component({
  selector: 'app-origem-cadastro',
  templateUrl: './origem-cadastro.component.html',
  styleUrls: ['./origem-cadastro.component.css']
})
export class OrigemCadastroComponent implements OnInit {

  codigoUsuarioLogado: string;
  origem = new Origens;

  constructor(
    private origenService: OrigemService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.codigoUsuarioLogado = localStorage.getItem('idToken') ?? '';

    const codigoBanco = this.route.snapshot.params['codigo'];

    if (codigoBanco) {
      this.carregarPorId(codigoBanco);
    }

  }

  get editando() {

    return Boolean(this.origem.codigoOrigem);
  }


  salvar(form: FormControl) {

    if (this.editando) {

      this.atualizarOrigem(form);

    } else {

      this.adicionar(form);
    }
  }


  adicionar(form: FormControl) {
    this.origenService.adicionar(this.origem, this.codigoUsuarioLogado)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Banco cadastrado com sucesso!', closable: false });
        form.reset();
        this.origem = new Origens();
      })
      .catch(erro => {
        if (erro.error.objects) {
          erro.error.objects.forEach((obj: any) => {
            this.messageService.add({ severity: 'error', detail: obj.userMessage });
          });
        } else {
          this.errorHandler.handle(erro.error.mensagemUsuario || 'Erro ao processar a solicitação.');
        }
      });
  }

  carregarPorId(codigo: string) {

    this.origenService.buscarPorCodigo(codigo, this.codigoUsuarioLogado)
      .then(response => {
        this.origem = response;

      })
      .catch(erro => this.errorHandler.handle(erro.error.mensagemUsuario));
  }


  atualizarOrigem(form: FormControl) {

    this.origenService.atualizarOrigem(this.origem, this.codigoUsuarioLogado)
      .then(response => {
        this.origem = response;
        this.messageService.add({ severity: 'success', detail: 'Origem atualizada com sucesso!', closable: false });
      })
      .catch(erro => {
        if (erro.error.objects) {
          erro.error.objects.forEach((obj: any) => {
            this.messageService.add({ severity: 'error', detail: obj.userMessage });
          });
        } else {
          this.errorHandler.handle(erro.error.mensagemUsuario || 'Erro ao processar a solicitação.');
        }
      });
  }

}

import { Component, OnInit } from '@angular/core';
import { BancoService } from '../banco.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormControl } from '@angular/forms';
import { Bancos } from '../../core/model';
import { ErrorHandlerService } from '../../core/error-handler.service';


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
    this.codigoUsuarioLogado = localStorage.getItem('idToken') ?? '';

    const codigoBanco = this.route.snapshot.params['codigo'];

    if(codigoBanco) {
      this.carregarPorId(codigoBanco);
    }
  }

  get editando() {

    return Boolean (this.bancos.codigoBanco);
  }

  salvar(form: FormControl) {

    if(this.editando) {

      this.atualizarBancos(form);

    } else {

      this.adicionar(form);
    }
  }


  adicionar(form: FormControl) {
    this.bancosService.adicionar(this.bancos, this.codigoUsuarioLogado)
      .then(() => {
        this.messageService.add({ severity: 'success', detail: 'Banco cadastrado com sucesso!', closable: false });
        form.reset();
        this.bancos = new Bancos();
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


/*

  adicionar(form: FormControl) {

    //this.bancos.pessoa.pessoaID = parseInt(this.codigoUsuarioLogado);

    this.bancosService.adicionar(this.bancos, this.codigoUsuarioLogado)
    .then(() => {
      this.messageService.add({ severity: 'success', detail: 'Banco cadastrado com sucesso!', closable: false});
      form.reset();
      this.bancos = new Bancos();
    })
    .catch(erro => this.errorHandler.handle(erro.error.mensagemUsuario));
  }

*/
  carregarPorId(codigo: string) {

    this.bancosService.buscarPorCodigo(codigo, this.codigoUsuarioLogado)
    .then(response => {
      this.bancos = response;

    })
    .catch(erro => this.errorHandler.handle(erro.error.mensagemUsuario));
  }

  atualizarBancos(form: FormControl) {

    //this.bancos.pessoa.pessoaID = parseInt(this.codigoUsuarioLogado);

    this.bancosService.atualizarBanco(this.bancos, this.codigoUsuarioLogado)
    .then(response => {
      this.bancos = response;
      this.messageService.add({ severity: 'success', detail: 'Banco atualizado com sucesso!', closable: false });
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

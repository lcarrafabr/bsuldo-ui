import { FormControl, NgForm } from '@angular/forms';
import { MetodoDeCobranca } from './../../core/model';
import { ErrorHandlerService } from './../../core/error-handler.service';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MetodoCobrancaService } from '../metodo-cobranca.service';

@Component({
  selector: 'app-metodo-cobranca-cadastro',
  templateUrl: './metodo-cobranca-cadastro.component.html',
  styleUrls: ['./metodo-cobranca-cadastro.component.css']
})
export class MetodoCobrancaCadastroComponent implements OnInit {

  metodoCobranca = new MetodoDeCobranca;

  status = [
    {label: 'ATIVO', value: 'true'},
    {label: 'INATIVO', value: 'false'}
  ]

  constructor(
    private metodoCobrancaService: MetodoCobrancaService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    const codigoMetodoCobranca = this.route.snapshot.params['codigo'];

    if(codigoMetodoCobranca) {

      this.carregaMetodoDeCobrancaPorId(codigoMetodoCobranca);
    }
  }

  get editando() {

    return Boolean (this.metodoCobranca.metodoCobrancaId);
  }


  salvar(form: FormControl) {

    if(this.editando) {
      this.atualizarMetodoCobranca(form);
    } else {
      this.cadastrarMetodoCobranca(form);
    }
  }

  cadastrarMetodoCobranca(form: FormControl) {

    this.metodoCobrancaService.cadastrarMetodoCobranca(this.metodoCobranca)
    .then(() => {
      this.messageService.add({ severity: 'success', detail: 'Método decobrança cadastrada com sucesso!', closable: false });
      form.reset();
      this.metodoCobranca = new MetodoDeCobranca();
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregaMetodoDeCobrancaPorId(codigo: number) {

    this.metodoCobrancaService.buscaPorId(codigo)
    .then(metodoCobranca => {
      this.metodoCobranca = metodoCobranca;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarMetodoCobranca(form: FormControl) {

    this.metodoCobrancaService.atualizarMetodoCobranca(this.metodoCobranca)
    .then(response => {
      this.metodoCobranca = response;
      this.messageService.add({ severity: 'success', detail: 'Método de cobrança atualizado com sucesso!', closable: false });
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: NgForm) {

    form.reset();

    setTimeout(function() {
      this.metodoCobranca = new MetodoDeCobranca();
    }.bind(this), 1);

    this.router.navigate(['/metodo-de-cobranca/novo']);
  }

}

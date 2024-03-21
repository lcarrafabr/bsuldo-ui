import { HistoricoRfService } from './../historico-rf.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { HistoricoRendimentoRF } from 'src/app/core/model';
import { OrdemRendaFixaServiceService } from 'src/app/ordem-renda-fixa/ordem-renda-fixa-service.service';

@Component({
  selector: 'app-historico-rf-cadastro',
  templateUrl: './historico-rf-cadastro.component.html',
  styleUrls: ['./historico-rf-cadastro.component.css']
})
export class HistoricoRfCadastroComponent implements OnInit {

  codigoUsuarioLogado: string;
  historicoRendimentoRF = new HistoricoRendimentoRF;

  constructor(
    private title: Title,
    private historicoRendimentoRFService: HistoricoRfService,
    private confirmation: ConfirmationService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.title.setTitle('Histórico Rendimentos RF');

    this.codigoUsuarioLogado = localStorage.getItem('IDS');
    const codigoOrdemRF = this.route.snapshot.params['codigo'];

    if(codigoOrdemRF) {
      this.carregarHistoricoPorId(codigoOrdemRF);
    }
  }

  get editando() {

    return Boolean (this.historicoRendimentoRF.histRentabilidadeRFId)
  }


  salvar(form: FormControl) {

    if(this.editando) {

      this.atualizarHistoricoRF(form);

    } else {
      this.adicionarOrdemRendaFixa(form);

    }
  }

  adicionarOrdemRendaFixa(form: FormControl) {

    this.historicoRendimentoRF.pessoa.pessoaID = parseInt(this.codigoUsuarioLogado);

    this.historicoRendimentoRFService.adicionar(this.historicoRendimentoRF)
    .then(() => {
      this.messageService.add({ severity: 'success', detail: 'Histórico cadastrado com sucesso!', closable: false});
      form.reset();
      this.historicoRendimentoRF = new HistoricoRendimentoRF();
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  carregarHistoricoPorId(codigo: number) {

    this.historicoRendimentoRFService.buscarPorCodigo(codigo)
    .then(response => {
      this.historicoRendimentoRF = response;

    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  atualizarHistoricoRF(form: FormControl) {

    this.historicoRendimentoRF.pessoa.pessoaID = parseInt(this.codigoUsuarioLogado);

    this.historicoRendimentoRFService.editarHistoricoRF(this.historicoRendimentoRF)
    .then(response => {
      this.historicoRendimentoRF = response;
      this.messageService.add({ severity: 'success', detail: 'Histórico Renda Fixa atualizado com sucesso!', closable: false });
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

}

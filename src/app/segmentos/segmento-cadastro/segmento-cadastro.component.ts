import { ErrorHandlerService } from './../../core/error-handler.service';
import { Component, OnInit } from '@angular/core';
import { SegmentoServiceService } from '../segmento-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormControl, NgForm } from '@angular/forms';
import { Segmentos } from '../../core/model';

@Component({
  selector: 'app-segmento-cadastro',
  templateUrl: './segmento-cadastro.component.html',
  styleUrls: ['./segmento-cadastro.component.css']
})
export class SegmentoCadastroComponent implements OnInit {

  codigoUsuarioLogado: string;
  segmentos = new Segmentos;
  status: boolean = true;

  constructor(
    private segmentoService: SegmentoServiceService,
    private errorHandler: ErrorHandlerService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    const codigoSegmento = this.route.snapshot.params['codigo'];
    this.codigoUsuarioLogado = localStorage.getItem('idToken') ?? '';

    if(codigoSegmento) {
      this.carregarSegmentoPorId(codigoSegmento);
    }
  }

  get editando() {

    return Boolean (this.segmentos.codigoSegmento);
  }

  salvar(form: FormControl) {

    if(this.editando) {

      this.atualizarSegmento(form);

    } else {

      this.cadastrarSegmento(form);
    }
  }

  cadastrarSegmento(form: FormControl) {

    this.segmentoService.cadastrarSegmento(this.segmentos, this.codigoUsuarioLogado)
    .then(() => {

      this.messageService.add({ severity: 'success', detail: 'Segmento cadastrado com sucesso!', closable: false });
      form.reset();
      this.segmentos = new Segmentos();
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

  carregarSegmentoPorId(codigo: number) {

    this.segmentoService.buscaSegmentoPorID(codigo, this.codigoUsuarioLogado)
    .then(segmento => {
      this.segmentos = segmento;
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

  atualizarSegmento(form: FormControl) {
    this.segmentoService.editarSegmento(this.segmentos, this.codigoUsuarioLogado)
    .then(response => {
      this.segmentos = response;
      this.messageService.add({ severity: 'success', detail: 'Segmento atualizado com sucesso!', closable: false });
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

  novo(form: NgForm) {

    form.reset();

    setTimeout(function() {
      this.pessoa = new Segmentos();
    }.bind(this), 1);

    this.router.navigate(['/segmentos/novo']);
  }

}

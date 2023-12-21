import { Component, OnInit } from '@angular/core';
import { SegmentoServiceService } from '../segmento-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Segmentos } from 'src/app/core/model';
import { FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-segmento-cadastro',
  templateUrl: './segmento-cadastro.component.html',
  styleUrls: ['./segmento-cadastro.component.css']
})
export class SegmentoCadastroComponent implements OnInit {

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

    if(codigoSegmento) {
      this.carregarSegmentoPorId(codigoSegmento);
    }
  }

  get editando() {

    return Boolean (this.segmentos.segmentoId);
  }

  salvar(form: FormControl) {

    if(this.editando) {

      this.atualizarSegmento(form);

    } else {

      this.cadastrarSegmento(form);
    }
  }

  cadastrarSegmento(form: FormControl) {

    this.segmentoService.cadastrarSegmento(this.segmentos)
    .then(() => {

      this.messageService.add({ severity: 'success', detail: 'Segmento cadastrado com sucesso!', closable: false });
      form.reset();
      this.segmentos = new Segmentos();
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  carregarSegmentoPorId(codigo: number) {

    this.segmentoService.buscaSegmentoPorID(codigo)
    .then(segmento => {
      this.segmentos = segmento;
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  atualizarSegmento(form: FormControl) {
    this.segmentoService.editarSegmento(this.segmentos)
    .then(response => {
      this.segmentos = response;
      this.messageService.add({ severity: 'success', detail: 'Setor atualizado com sucesso!', closable: false });
    })
    .catch(erro => this.errorHandler.handle(erro.error[0].mensagemUsuario));
  }

  novo(form: NgForm) {

    form.reset();

    setTimeout(function() {
      this.pessoa = new Segmentos();
    }.bind(this), 1);

    this.router.navigate(['/segmentos/novo']);
  }

}

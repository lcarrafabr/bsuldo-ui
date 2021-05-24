import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    private message: MessageService
  ) { }

  handle(errorResponse: any) {

    let msg: string;

    if(typeof errorResponse === 'string') {

      msg = errorResponse;

    } else {

      msg = 'Erro ao processar serviço remoto. Tente novamente ou contate o administrador.'
      console.log('Ocorreu um erro: ' + errorResponse);
    }

    this.message.add({ severity: 'error', detail: msg, closable: false});
  }
}

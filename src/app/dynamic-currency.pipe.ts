import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dynamicCurrency'
})
export class DynamicCurrencyPipe implements PipeTransform {

  transform(value: number, currencyCode: string = 'BRL'): string {
    if (value == null) return ''; // Se o valor for nulo, retorna vazio

    const minFractionDigits = value < 0.00 ? 8 : 2; // Se for menor que 0.01, usa 4 casas; senão, usa 2
    const maxFractionDigits = value < 0.01 ? 8 : 2; // Define o máximo de casas

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: minFractionDigits,
      maximumFractionDigits: maxFractionDigits
    }).format(value);
  }

}

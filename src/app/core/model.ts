export class Pessoa {
  pessoaID: number;
  nomePessoa: string;
  dataCadastro: Date;
  email: string;
}

export class Lancamento {

  lancamentoId: number;
  valor: number;
  datavencimento: Date;
  dataPagamento: Date;
  descricao: string;
  situacao: string = 'PENDENTE';
  parcelado: boolean;
  quantidadeParcelas: number;
  numeroParcela: number;
  chavePesquisa: string;
  pessoa = new Pessoa();
  categoria = new Categoria();
  metodoDeCobranca = new MetodoDeCobranca();
  lancRecorrente: boolean;
}

export class Categoria {

  categoriaId: number;
  nomeCategoria: string;
  status: string;
  descricao: string;
}

export class MetodoDeCobranca {

  metodoCobrancaId: number;
  nomeMetodoCob: string;
  status: string;
  descricao: string;
}

export class Usuario {

  usuarioId: number;
  nomeUsuario: string;
  senha: string;
  status: boolean;
  pessoa = new Pessoa();
  permissoes: any[];
}

export class Permissoes {

  permissaoId: number;
  descricao: string;
}

export class Emissores {

  emissorId: number;
  nomeEmissor: string;
  status: boolean;
  dataCadastro: Date;
}
export class ProdutoRendaFixa {
  produtoRendaFixaId: number;
  nomeProduto: string;
  sigla: string;
  dataVencimento: Date;
  temImposto: boolean;
  valorImposto: number;
  grauDeRiscoEnum: string;
  liquidezEnum: string;
  impostoDeRendaEnum: string;
  valorMinimo: number;
  rentabilidade: string;
  status: boolean;
  emissores = new Emissores();
}

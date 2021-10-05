import { ILancamento } from './lancamento.model';
import { IPessoa } from '../../pessoas/model/pessoa.model';
export class Lancamento implements ILancamento {
    id!: number;
    descricao!: string;
    dataVencimento!: Date;
    dataPagamento!: Date;
    valor!: number;
    observacao!: string;
    tipo = 'RECEITA';
    categoria = new Categoria();
    pessoa = new Pessoa();
}

export class Categoria  {
    id: number | undefined;
    nome: string | undefined;
}

export class Pessoa implements IPessoa {
    id!: number;
    nome!: string;
    endereco = new Endereco();
    ativo = true;
}

class Endereco {
    logradouro!: string;
    numero!: number;
    complemento!: string;
    bairro!: string;
    cep!: string;
    cidade!: string;
    estado!: string;
}
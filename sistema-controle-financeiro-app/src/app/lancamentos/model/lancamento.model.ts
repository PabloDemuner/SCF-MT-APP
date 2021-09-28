import { IPessoa } from "../../pessoas/model/pessoa.model";

export interface ILancamento {
    id: number,
    descricao: string,
    dataVencimento: Date,
    dataPagamento?: Date,
    valor: number,
    observacao: string,
    tipo: 'RECEITA' | 'DESPESA',
    pessoa: IPessoa,
    // categoria: ICategoria
}
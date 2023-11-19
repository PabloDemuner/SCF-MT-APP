import { ICategoria } from './../../categorias/model/categoria.model';
import { IPessoa } from "../../pessoas/model/pessoa.model";

export interface ILancamento {
    id: number;
    descricao: string;
    dataVencimento: Date;
    dataPagamento?: Date;
    valor: number;
    observacao: string;
    tipo: string;
    pessoa: IPessoa;
    categoria: ICategoria;
    anexo: string;
    urlAnexo: string;
}
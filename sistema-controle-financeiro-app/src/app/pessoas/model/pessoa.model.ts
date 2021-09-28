import { IEndereco } from './endereco.model';

export interface IPessoa {
    id: number,
    nome: string,
    endereco: IEndereco,
    ativo: boolean
}
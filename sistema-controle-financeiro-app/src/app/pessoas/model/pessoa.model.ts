import { IContato } from './contato.model';
import { IEndereco } from './endereco.model';

export class IPessoa {
    id: number;
    nome: string;
    endereco: IEndereco;
    ativo: boolean;
    contatos = new Array<IContato>();
}
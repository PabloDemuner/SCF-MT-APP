export interface IEndereco {
    logradouro: string,
    numero: number,
    complemento?: string,
    bairro: string,
    cep: string,
    cidade: string,
    estado: string
}
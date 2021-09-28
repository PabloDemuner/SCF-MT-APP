export interface ILancamentoFiltro {
    descricao?: string,
    dataVencimentoInicio?: Date,
    dataVencimentoFim?: Date,
    pagina: number,
    itensPorPagina: number
}
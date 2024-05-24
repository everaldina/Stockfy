export interface Lote {
  id: string | null;
  cod_lote: string;
  fornecedor: string;
  data_entrada: Date;
  data_saida: Date | null;
  data_fabricacao: Date;
  data_validade: Date;
  quantidade: number;
  status: 'Em estoque' | 'Transferido' | 'Descartado' | 'Vencido';
}

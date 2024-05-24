import { Component } from '@angular/core';
import { Produto } from './models/produto';
import { Lote } from './models/lote';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Stockify';

  produtos: Produto[] = [
    {
      id: null,
      nome: 'Arroz',
      marca: 'Tio João',
    },
    {
      id: null,
      nome: 'Feijão',
      marca: 'Camil',
    },
    // -NyfA-GuLTLf8oh55zMF
    {
      id: null,
      nome: 'Macarrão',
      marca: 'Renata',
    },
    {
      id: null,
      nome: 'Açúcar',
      marca: 'União',
    },
    //-NyfA-Gv3QuuuRqBpmZ8
    {
      id: null,
      nome: 'Óleo',
      marca: 'Liza',
    },
  ];

  lotes: Lote[] = [
    {
      id: null,
      cod_lote: '123456',
      fornecedor: 'Atacadão',
      data_entrada: new Date(),
      data_saida: null,
      data_fabricacao: new Date(
        new Date().getTime() - 30 * 24 * 60 * 60 * 1000
      ),
      data_validade: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
      quantidade: 200,
      status: 'Em estoque',
    },
    {
      id: null,
      cod_lote: '654321',
      fornecedor: 'Atacadão',
      data_entrada: new Date(),
      data_saida: null,
      data_fabricacao: new Date(
        new Date().getTime() - 30 * 24 * 60 * 60 * 1000
      ),
      data_validade: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000),
      quantidade: 100,
      status: 'Em estoque',
    },
  ];

  constructor(private db: DatabaseService) {
    // this.produtos.forEach((produto) => {
    //   this.db.addProduto(produto).subscribe();
    // });
    // this.db.getProdutos().subscribe((produtos) => {
    //   console.log(produtos);
    // });
    // this.db.getProduto('-Mj6J9Z9J9J9J9J9J9J9').subscribe((produto) => {
    //   console.log(produto);
    // });
    // // -NyfA-GzoU3GUdLMdAb0
    // this.db.getProduto('-NyfA-GzoU3GUdLMdAb0').subscribe((produto) => {
    //   console.log(produto);
    // });
    // this.db.deleteProduto('-NyfA-GzoU3GUdLMdAb0');
    // this.db.addLote('-NyfA-GuLTLf8oh55zMF', this.lotes[0]);
    // this.db.addLote('-NyfA-GuLTLf8oh55zMF', this.lotes[1]);
    // this.db.addLote('-NyfA-GuLTLf8oh55zMF', this.lotes[0]);
    // this.db.addLote('-NyfA-Gv3QuuuRqBpmZ8', this.lotes[1]);
    // this.db.addLote('-NyfA-Gv3QuuuRqBpmZ8', this.lotes[1]);
    // this.db.addLote('-NyfA-Gv3QuuuRqBpmZ8', this.lotes[0]);
    // this.db.getLotes('-NyfA-GuLTLf8oh55zMF').subscribe((lotes) => {
    //   console.log('Lote -NyfA-GuLTLf8oh55zMF' + lotes);
    // });
    // this.db.getLotes('-NyfA-Gv3QuuuRqBpmZ8').subscribe((lotes) => {
    //   console.log('Lote -NyfA-GuLTLf8oh55zMF' + lotes);
    // });
    // this.db.getLotes('-NyfA-GyvNfpCBZVM4nR').subscribe((lotes) => {
    //   console.log('Lote -NyfA-GuLTLf8oh55zMF' + lotes);
    // });
    // this.db.getLotes('-NyfA-H058yvw3i_rc2-').subscribe((lotes) => {
    //   console.log('Lote -NyfA-GuLTLf8oh55zMF' + lotes);
    // });
  }
}

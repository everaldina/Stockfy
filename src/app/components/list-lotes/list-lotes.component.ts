import { Component, OnInit, signal } from '@angular/core';
import { SharedModule } from '../../modules/shared/shared.module';
import { CommonModule } from '@angular/common';
import { Header, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DatabaseService } from '../../services/database.service';
import { Lote } from '../../models/lote';
import { Produto } from '../../models/produto';
import { Router } from '@angular/router';
import { AddLoteComponent } from '../add-lote/add-lote.component';

@Component({
  selector: 'app-list-lotes',
  standalone: true,
  imports: [SharedModule, CommonModule, AddLoteComponent],
  templateUrl: './list-lotes.component.html',
  styleUrl: './list-lotes.component.css',
  providers: [MessageService],
})
export class ListLotesComponent {
  productId: string = '';
  product: Produto = {};
  loteDialog: boolean = false;

  deleteLoteDialog: boolean = false;

  deleteLotesDialog: boolean = false;

  lotes: Lote[] = [];
  signalLotes = signal<Lote[]>([]);

  lote: Lote = {};

  selectedLotes: Lote[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  idProduto: string = '';

  constructor(
    private dbservice: DatabaseService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    let lotes: Lote[] = [];
    this.productId = this.router.url.split('/')[2];

    this.dbservice.getLotes(this.productId).subscribe((response) => {
      for (const key in response) {
        if (response.hasOwnProperty(key)) {
          lotes.push({ ...response[key], id: key });
        }
      }
      this.lotes = lotes;
      this.signalLotes.set(this.lotes);
    });

    this.cols = [
      { field: 'id', header: 'code' },
      { field: 'code_lote', header: 'code_lote' },
      { field: 'fornecedor', header: 'fornecedor' },
      { field: 'data_entrada', header: 'data_entrada' },
      { field: 'data_saida', header: 'data_saida' },
      { field: 'data_fabricacao', header: 'data_fabricacao' },
      { field: 'data_validade', header: 'data_validade' },
      { field: 'quantidade', header: 'quantidade' },
    ];

    this.dbservice.getProduto(this.productId).subscribe((response) => {
      this.product = response;
    });
  }

  openNew() {
    this.lote = {};

    this.submitted = false;
    this.loteDialog = true;
  }

  deleteSelectedLotes() {
    this.deleteLotesDialog = true;
  }

  editLote(lote: Lote) {
    this.lote = { ...lote };
    this.loteDialog = true;
  }

  deleteLote(lote: Lote) {
    this.deleteLoteDialog = true;
    this.lote = { ...lote };
  }

  confirmDeleteSelected() {
    this.deleteLotesDialog = false;

    for (const lote of this.selectedLotes) {
      if (lote.id) {
        this.dbservice.deleteLote(this.productId, lote.id);
      }
    }

    this.lotes = this.lotes.filter((val) => !this.selectedLotes.includes(val));
    this.signalLotes.set(this.lotes);

    if (this.lotes.length === 0) {
      this.product.status = 'OUTOFSTOCK';
    }

    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Lotes Deleted',
      life: 3000,
    });
    this.selectedLotes = [];
  }

  confirmDelete() {
    this.deleteLoteDialog = false;

    if (this.lote.id) {
      this.lotes = this.lotes.filter((val) => val.id !== this.lote.id);
      this.signalLotes.set(this.lotes);
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Lote Deleted',
        life: 3000,
      });

      this.dbservice.deleteLote(this.productId, this.lote.id);
    }

    if (this.lotes.length === 0) {
      this.product.status = 'OUTOFSTOCK';
    }

    this.lote = {};
  }

  hideDialog() {
    this.loteDialog = false;
    this.submitted = false;
  }

  onAddLote(loteAdicionado: Lote) {
    this.submitted = true;

    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Produto registrado',
      life: 3000,
    });
    this.hideDialog();

    this.signalLotes.update((currentItems) => [
      ...currentItems,
      loteAdicionado,
    ]);
  }

  onEditLote(loteEditado: Lote) {
    this.submitted = true;

    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Produto atualizado',
      life: 3000,
    });
    this.hideDialog();

    const signalCopia = this.signalLotes();

    const index = signalCopia.findIndex((item) => item.id === loteEditado.id);
    if (index !== 1) {
      const signalNovo = [...signalCopia];
      signalNovo[index] = { ...signalNovo[index], ...loteEditado };
      this.signalLotes.set(signalNovo);
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.signalLotes().length; i++) {
      if (this.signalLotes()[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  toProduct() {
    this.router.navigate(['products']);
  }
}

import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../modules/shared/shared.module';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DatabaseService } from '../../services/database.service';
import { Produto } from '../../models/produto';
import { AddItemComponent } from '../../components/add-item/add-item.component';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [SharedModule, CommonModule, AddItemComponent],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.css',
  providers: [MessageService],
})
export class ListProductsComponent {
  productDialog: boolean = false;

  deleteProductDialog: boolean = false;

  deleteProductsDialog: boolean = false;

  products: Produto[] = [];

  product: Produto = {
    nome: '',
    marca: '',
  };

  selectedProducts: Produto[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private dbservice: DatabaseService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.dbservice.getProdutos().subscribe((response) => {
      for (const key in response) {
        if (response.hasOwnProperty(key)) {
          this.products.push({ ...response[key], id: key });
        }
      }
    });

    this.cols = [
      { field: 'product', header: 'Product' },
      { field: 'price', header: 'Price' },
      { field: 'category', header: 'Category' },
      { field: 'rating', header: 'Reviews' },
      { field: 'inventoryStatus', header: 'Status' },
    ];
  }

  openNew() {
    this.product = {
      nome: '',
      marca: '',
    };

    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.deleteProductsDialog = true;
  }

  editProduct(product: Produto) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: Produto) {
    this.deleteProductDialog = true;
    if (product.id) {
      this.dbservice.deleteProduto(product.id);
    }
    this.product = { ...product };
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;
    this.products = this.products.filter(
      (val) => !this.selectedProducts.includes(val)
    );
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Products Deleted',
      life: 3000,
    });
    this.selectedProducts = [];
  }

  confirmDelete() {
    this.deleteProductDialog = false;
    this.products = this.products.filter((val) => val.id !== this.product.id);
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'Product Deleted',
      life: 3000,
    });
    this.product = {
      nome: '',
      marca: '',
    };
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  addProduct() {
    this.submitted = true;

    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Produto registrado',
      life: 3000,
    });
    this.hideDialog();
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  createId(): string {
    let id = '';
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }
}

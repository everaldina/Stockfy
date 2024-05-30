import { Component, OnInit, signal } from '@angular/core';
import { SharedModule } from '../../modules/shared/shared.module';
import { CommonModule } from '@angular/common';
import { Header, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DatabaseService } from '../../services/database.service';
import { Produto } from '../../models/produto';
import { AddItemComponent } from '../../components/add-item/add-item.component';
import { Router } from '@angular/router';

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
  signalProducts = signal<Produto[]>([]);

  product: Produto = {};

  selectedProducts: Produto[] = [];

  submitted: boolean = false;

  cols: any[] = [];

  statuses: any[] = [];

  rowsPerPageOptions = [5, 10, 20];

  constructor(
    private dbservice: DatabaseService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    let products: Produto[] = [];

    this.dbservice.getProdutos().subscribe((response) => {
      for (const key in response) {
        if (response.hasOwnProperty(key)) {
          products.push({ ...response[key], id: key });
        }
      }

      this.products = products;
      this.signalProducts.set(this.products);
    });

    this.cols = [
      { field: 'id', header: 'Code'},
      { field: 'nome', header: 'Nome' },
      { field: 'marca', header: 'Marca' },
    ];
  }

  teste(){
    
    //console.log(this.signalProducts());
    //this.products.push(this.signalProducts()[0]);
    //this.signalProducts.update(current => [...current, this.signalProducts()[0]]);
  }

  openNew() {
    this.product = {};

    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.deleteProductsDialog = true;
  }

  editProduct(product: Produto) {
    console.log(product);
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: Produto) {
    this.deleteProductDialog = true;
    this.product = { ...product };
  }

  confirmDeleteSelected() {
    this.deleteProductsDialog = false;

    for (const product of this.selectedProducts) {
      if (product.id) {
        this.dbservice.deleteProduto(product.id);
      }
    }

    this.products = this.products.filter(
      (val) => !this.selectedProducts.includes(val)
    );
    this.signalProducts.set(this.products);
    
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

    if (this.product.id) {
      this.products = this.products.filter((val) => val.id !== this.product.id);
      this.signalProducts.set(this.products);
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Product Deleted',
        life: 3000,
      });

      this.dbservice.deleteProduto(this.product.id);
    }

    this.product = {};
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  onAddProduct(produtoAdicionado: Produto) {
    this.submitted = true;

    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Produto registrado',
      life: 3000,
    });
    this.hideDialog();

    this.signalProducts.update(currentItems => [...currentItems, produtoAdicionado]);
  }

  onEditProduct(productEditado: Produto) {
    this.submitted = true;

    this.messageService.add({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Produto atualizado',
      life: 3000,
    });
    this.hideDialog();

    const signalCopia = this.signalProducts();

    const index = signalCopia.findIndex(item => item.id === productEditado.id)
    if(index !== 1){
      console.log(this.product);
      const signalNovo = [...signalCopia];
      signalNovo[index] =  { ...signalNovo[index], ...productEditado };
      this.signalProducts.set(signalNovo);
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.signalProducts().length; i++) {
      if (this.signalProducts()[i].id === id) {
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

  toLote(id: string){
    this.router.navigate(['/lote', id]);
  }
}

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../modules/shared/shared.module';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { Produto } from '../../models/produto';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    InputTextModule,
    ButtonModule,
  ],
})
export class AddItemComponent implements OnChanges {
  productForm: FormGroup;
  @Output() addProduct = new EventEmitter<Produto>();
  @Output() editProduct = new EventEmitter<Produto>();
  @Input() idProduto: Produto = {} as Produto;

  ngOnChanges() {
    if (this.idProduto.id) {
      this.dbservice.getProduto(this.idProduto.id).subscribe((res: any) => {
        this.productForm.patchValue({
          nome: res.nome,
          marca: res.marca,
        });
      });
    }
  }

  constructor(private fb: FormBuilder, private dbservice: DatabaseService) {
    this.productForm = this.fb.group({
      nome: ['', Validators.required],
      marca: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      if (this.idProduto.id) {
        // Update product
        let updatedProduct: Produto = {
          id: this.idProduto.id,
          nome: this.productForm.value.nome,
          marca: this.productForm.value.marca,
        };
        this.dbservice.updateProduto(updatedProduct);
        this.editProduct.emit(updatedProduct);
        this.productForm.reset();
      } else {
        // Add new product
        this.dbservice
          .addProduto(this.productForm.value)
          .subscribe((res: any) => {
            let product: Produto = {} as Produto;
            if (res.hasOwnProperty('name')) {
              product = {
                id: res['name'],
                nome: this.productForm.value.nome,
                marca: this.productForm.value.marca,
              };
            }
            this.productForm.reset();
            this.addProduct.emit(product);
          });
      }
    }
  }
}

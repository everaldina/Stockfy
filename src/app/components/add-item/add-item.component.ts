import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../modules/shared/shared.module';
import { Component, EventEmitter, Output } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
export class AddItemComponent {
  productForm: FormGroup;
  @Output() closeDialog = new EventEmitter<Produto>();

  constructor(private fb: FormBuilder, private dbservice: DatabaseService) {
    this.productForm = this.fb.group({
      nome: ['', Validators.required],
      marca: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
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
          this.closeDialog.emit(product);
        });
    }
  }
}

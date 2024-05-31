import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../modules/shared/shared.module';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatabaseService } from '../../services/database.service';
import { Lote } from '../../models/lote';

@Component({
  selector: 'app-add-lote',
  templateUrl: './add-lote.component.html',
  styleUrl: './add-lote.component.css',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    InputTextModule,
    ButtonModule,
  ],
})
export class AddLoteComponent {
  loteForm: FormGroup;
  @Output() addLote = new EventEmitter<Lote>();
  @Output() editLote = new EventEmitter<Lote>();
  @Input() idLote: Lote = {} as Lote;
  @Input() productId: string = '';


  ngOnChanges() {
    if (this.idLote.id) {
      this.dbservice.getProduto(this.idLote.id).subscribe((res: any) => {
        this.loteForm.patchValue({
          cod_lote: res.cod_lote,
          fornecedor: res.fornecedor,
          data_entrada: res.data_entrada,
          data_saida: res.data_saida,
          data_fabricacao: res.data_fabricacao,
          data_validade: res.data_validade,
          quantidade: res.quantidade
        });
      });
    }
  }

  constructor(private fb: FormBuilder, private dbservice: DatabaseService) {
    this.loteForm = this.fb.group({
      cod_lote: ['', Validators.required],
      fornecedor: ['', Validators.required],
      data_entrada: ['', Validators.required],
      data_saida: ['', Validators.required],
      data_fabricacao: ['', Validators.required],
      data_validade: ['', Validators.required],
      quantidade: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loteForm.valid) {
      if (this.idLote.id) {
        // Update lote
        let updatedLote: Lote = {
          id: this.idLote.id,
          cod_lote: this.loteForm.value.cod_lote,
          fornecedor: this.loteForm.value.fornecedor,
          data_entrada: this.loteForm.value.data_entrada,
          data_saida: this.loteForm.value.data_saida,
          data_fabricacao: this.loteForm.value.data_fabricacao,
          data_validade: this.loteForm.value.data_validade,
          quantidade: this.loteForm.value.quantidade,
        };
        this.dbservice.updateLote(this.productId, updatedLote);
        this.editLote.emit(updatedLote);
        this.loteForm.reset();
      } else {
        // Add new lote
        this.dbservice
          .addLote(this.productId, this.loteForm.value)
      }
    }
  }
}

import {
  AbstractControl,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
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
import { DatabaseService } from '../../services/database.service';
import { Lote } from '../../models/lote';
import { CalendarModule } from 'primeng/calendar';

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
    CalendarModule,
  ],
})
export class AddLoteComponent implements OnChanges {
  loteForm: FormGroup;
  @Output() addLote = new EventEmitter<Lote>();
  @Output() editLote = new EventEmitter<Lote>();
  @Input() idLote: Lote = {} as Lote;
  @Input() productId: string = '';
  statusOptions: string[] = ['Em estoque', 'Transferido', 'Descartado'];

  ngOnChanges() {
    if (this.idLote.id) {
      this.dbservice
        .getLote(this.productId, this.idLote.id)
        .subscribe((res: any) => {
          this.loteForm.patchValue({
            cod_lote: res.cod_lote,
            fornecedor: res.fornecedor,
            data_entrada: res.data_entrada,
            data_saida: res.data_saida,
            data_fabricacao: res.data_fabricacao,
            data_validade: res.data_validade,
            status: res.status,
            quantidade: res.quantidade,
          });
        });
    }
  }

  constructor(private fb: FormBuilder, private dbservice: DatabaseService) {
    this.loteForm = this.fb.group(
      {
        cod_lote: ['', Validators.required],
        fornecedor: ['', Validators.required],
        data_entrada: ['', Validators.required],
        data_saida: [''],
        data_fabricacao: ['', Validators.required],
        data_validade: ['', Validators.required],
        status: ['', Validators.required],
        quantidade: ['', Validators.pattern(/^\d+$/)],
      },
      {
        validators: [this.dateValidator, this.statusValidator],
      }
    );
  }

  dateValidator(control: AbstractControl): ValidationErrors | null {
    const dataEntrada = control.get('data_entrada')?.value;
    const dataSaida = control.get('data_saida')?.value;
    const dataFabricacao = control.get('data_fabricacao')?.value;
    const dataValidade = control.get('data_validade')?.value;

    const errors: any = {};

    if (dataEntrada && dataFabricacao && dataEntrada <= dataFabricacao) {
      errors.dataFabricacao =
        'Data de fabricação deve ser menor que a data de entrada';
    }

    if (dataFabricacao && dataValidade && dataFabricacao >= dataValidade) {
      errors.dataValidade =
        'Data de validade deve ser maior que a data de fabricação';
    }

    if (dataEntrada && dataSaida && dataEntrada >= dataSaida) {
      errors.dataSaida = 'Data de saída deve ser maior que a data de entrada';
    }

    return Object.keys(errors).length ? errors : null;
  }

  statusValidator(control: AbstractControl): ValidationErrors | null {
    const status = control.get('status')?.value;
    const data_saida = control.get('data_saida')?.value;

    const errors: any = {};

    if (status === 'Transferido' && !data_saida) {
      errors.dataSaida = 'Data de saída é obrigatória para status Transferido';
    }

    if (status === 'Descartado' && !data_saida) {
      errors.dataSaida = 'Data de saída é obrigatória para status Descartado';
    }

    if (status === 'Em estoque' && data_saida) {
      errors.dataSaida = 'Data de saída não é permitida para status Em estoque';
    }

    return Object.keys(errors).length ? errors : null;
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
          status: this.loteForm.value.status,
          quantidade: this.loteForm.value.quantidade,
        };
        this.dbservice.updateLote(this.productId, updatedLote);
        this.editLote.emit(updatedLote);
        this.loteForm.reset();
      } else {
        // Add new lote
        this.dbservice
          .addLote(this.productId, this.loteForm.value)
          .subscribe((res: any) => {
            let lote: Lote = {} as Lote;
            if (res.hasOwnProperty('name')) {
              lote = {
                id: res['name'],
                cod_lote: this.loteForm.value.cod_lote,
                fornecedor: this.loteForm.value.fornecedor,
                data_entrada: this.loteForm.value.data_entrada,
                data_saida: this.loteForm.value.data_saida,
                data_fabricacao: this.loteForm.value.data_fabricacao,
                data_validade: this.loteForm.value.data_validade,
                status: this.loteForm.value.status,
                quantidade: this.loteForm.value.quantidade,
              };
            }
            this.loteForm.reset();
            this.addLote.emit(lote);
          });
      }
    }
  }
}

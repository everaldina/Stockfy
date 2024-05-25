import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
  ],
  providers: [DatePipe],
})
export class SharedModule { }

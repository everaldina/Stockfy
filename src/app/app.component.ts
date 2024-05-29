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
}

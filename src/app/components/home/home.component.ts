import { Component } from '@angular/core';
import { OpcaoComponent } from '../opcao/opcao.component';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [OpcaoComponent, MenuComponent],
  standalone: true,
})
export class HomeComponent {


}

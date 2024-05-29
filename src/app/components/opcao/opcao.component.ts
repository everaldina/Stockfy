import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-opcao',
  templateUrl: './opcao.component.html',
  styleUrl: './opcao.component.css',
  standalone: true
})
export class OpcaoComponent {
  @Input() routerLink: string = '';
  @Input() title: string = '';
  // @Input() imgSource: string = '';
  @Input() description: string = '';
  @Input() link: string = '';
  @Input() icon: string = '';

}

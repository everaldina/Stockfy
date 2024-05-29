import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcaoComponent } from './opcao.component';

describe('OpcaoComponent', () => {
  let component: OpcaoComponent;
  let fixture: ComponentFixture<OpcaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpcaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpcaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

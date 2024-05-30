import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLoteComponent } from './add-lote.component';

describe('AddLoteComponent', () => {
  let component: AddLoteComponent;
  let fixture: ComponentFixture<AddLoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddLoteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

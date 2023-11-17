import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCadastroContatosComponent } from './form-cadastro-contatos.component';

describe('FormCadastroContatosComponent', () => {
  let component: FormCadastroContatosComponent;
  let fixture: ComponentFixture<FormCadastroContatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCadastroContatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCadastroContatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

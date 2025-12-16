import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAdm } from './login-adm';

describe('LoginAdm', () => {
  let component: LoginAdm;
  let fixture: ComponentFixture<LoginAdm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginAdm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginAdm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

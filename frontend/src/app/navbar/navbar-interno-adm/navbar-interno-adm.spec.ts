import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarInternoAdm } from './navbar-interno-adm';

describe('NavbarInternoAdm', () => {
  let component: NavbarInternoAdm;
  let fixture: ComponentFixture<NavbarInternoAdm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarInternoAdm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarInternoAdm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ServicePedido } from './service-pedido';

describe('ServicePedido', () => {
  let service: ServicePedido;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicePedido);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

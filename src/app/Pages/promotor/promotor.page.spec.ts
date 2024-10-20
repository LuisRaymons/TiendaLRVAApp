import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PromotorPage } from './promotor.page';

describe('PromotorPage', () => {
  let component: PromotorPage;
  let fixture: ComponentFixture<PromotorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PromotorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

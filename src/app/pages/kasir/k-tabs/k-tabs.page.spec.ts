import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KTabsPage } from './k-tabs.page';

describe('KTabsPage', () => {
  let component: KTabsPage;
  let fixture: ComponentFixture<KTabsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(KTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

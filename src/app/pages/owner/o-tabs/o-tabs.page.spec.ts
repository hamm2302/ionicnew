import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OTabsPage } from './o-tabs.page';

describe('OTabsPage', () => {
  let component: OTabsPage;
  let fixture: ComponentFixture<OTabsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OTabsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

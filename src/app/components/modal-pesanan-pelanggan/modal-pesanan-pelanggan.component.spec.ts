import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalPesananPelangganComponent } from './modal-pesanan-pelanggan.component';

describe('ModalPesananPelangganComponent', () => {
  let component: ModalPesananPelangganComponent;
  let fixture: ComponentFixture<ModalPesananPelangganComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPesananPelangganComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalPesananPelangganComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

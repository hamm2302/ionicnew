import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { KaryawanService } from '../../../../services/karyawan/karyawan.service';
import { ModalKaryawanComponent } from '../../../../components/modal-karyawan/modal-karyawan.component';

@Component({
  selector: 'app-karyawan',
  templateUrl: './karyawan.page.html',
  styleUrls: ['./karyawan.page.scss'],
})
export class KaryawanPage implements OnInit {

  karyawanList: any[] = []; // Inisialisasi sebagai array kosong

  constructor(
    private modalController: ModalController,
    private alertController: AlertController,
    private karyawanService: KaryawanService,
  ) {}

  ngOnInit() {
    this.loadKaryawan();
  }

  async loadKaryawan() {
    try {
      const karyawanData = await this.karyawanService.getKaryawan().toPromise();
      this.karyawanList = Array.isArray(karyawanData) ? karyawanData : []; // Memastikan karyawanList adalah array
    } catch (error) {
      console.error('Error fetching karyawan', error);
    }
  }

  async tambahKaryawan() {
    const modal = await this.modalController.create({
      component: ModalKaryawanComponent,
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data && data.reload) {
      this.loadKaryawan();
    }
  }

  async editKaryawan(id: number) {
    const modal = await this.modalController.create({
      component: ModalKaryawanComponent,
      componentProps: { karyawanId: id }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data && data.reload) {
      this.loadKaryawan();
    }
  }

  async hapusKaryawan(id: number) {
    const alert = await this.alertController.create({
      header: 'Konfirmasi',
      message: 'Anda yakin ingin menghapus karyawan ini?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
        },
        {
          text: 'Hapus',
          handler: async () => {
            try {
              await this.karyawanService.deleteKaryawan(id).toPromise();
              await this.presentAlert('Sukses', 'Karyawan berhasil dihapus.');
              this.loadKaryawan();
            } catch (error) {
              await this.presentAlert('Error', 'Terjadi kesalahan saat menghapus karyawan.');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

}

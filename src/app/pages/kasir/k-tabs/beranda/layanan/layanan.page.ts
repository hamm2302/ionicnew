import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LayananService } from '../../../../../../app/services/layanan/layanan.service';
import { TambahLayananComponent } from '../../../../../../app/components/tambah-layanan/tambah-layanan.component';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-layanan',
  templateUrl: './layanan.page.html',
  styleUrls: ['./layanan.page.scss'],
})
export class LayananPage implements OnInit {
  layanan: any[] = [];

  constructor(
    private layananService: LayananService,
    private modalCtrl: ModalController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadLayanan();
  }

  loadLayanan() {
    this.layananService.getLayanan().subscribe(
      data => {
        this.layanan = data;
      },
      error => {
        console.error('Error fetching layanan', error);
      }
    );
  }

  async tambahLayanan() {
    const modal = await this.modalCtrl.create({
      component: TambahLayananComponent
    });
    modal.onDidDismiss().then((data) => {
      if (data && data.data && data.data.reload) {
        this.loadLayanan();
      }
    });
    return await modal.present();
  }

  async editLayanan(id: number) {
    const modal = await this.modalCtrl.create({
      component: TambahLayananComponent,
      componentProps: {
        layananId: id
      }
    });
    modal.onDidDismiss().then((data) => {
      if (data && data.data && data.data.reload) {
        this.loadLayanan();
      }
    });
    return await modal.present();
  }

  async hapusLayanan(id: number) {
    const confirmAlert = await this.alertController.create({
      header: 'Konfirmasi',
      message: 'Apakah Anda yakin ingin menghapus layanan ini?',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel'
        },
        {
          text: 'Hapus',
          handler: async () => {
            try {
              await this.layananService.deleteLayanan(id).toPromise();
              await this.presentAlert('Sukses', 'Layanan berhasil dihapus.');
              this.loadLayanan(); // Auto refresh after deletion
            } catch (error) {
              await this.presentAlert('Error', 'Terjadi kesalahan saat menghapus layanan. Silakan coba lagi.');
            }
          }
        }
      ]
    });

    await confirmAlert.present();
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

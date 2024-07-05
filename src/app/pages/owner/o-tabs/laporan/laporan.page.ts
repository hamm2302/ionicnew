import { Component } from '@angular/core';
import { LaporanService } from '../../../../services/laporan/laporan.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-laporan',
  templateUrl: './laporan.page.html',
  styleUrls: ['./laporan.page.scss'],
})
export class LaporanPage {
  tanggal: string = ''; // Properti untuk menyimpan tanggal dari input
  laporanList: any[] = []; // Properti untuk menyimpan hasil pencarian laporan

  constructor(private laporanService: LaporanService, private alertController: AlertController) {}

  async cariLaporan() {
    const formattedTanggal = this.formatTanggal(this.tanggal);

    this.laporanService.getLaporanByTanggal(formattedTanggal).subscribe(
      data => {
        this.laporanList = [data]; // Simpan data laporan ke dalam laporanList
        this.showAlert('Laporan Ditemukan', 'Laporan untuk tanggal ' + formattedTanggal + ' berhasil ditemukan.');
      },
      error => {
        console.error('Error fetching laporan by tanggal', error);
        this.showAlert('Laporan Tidak Ditemukan', 'Tidak ada laporan untuk tanggal ' + formattedTanggal + '.');
      }
    );
  }

  formatTanggal(tanggal: string): string {
    const date = new Date(tanggal);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  doRefresh(event: any) {
    this.laporanService.getLaporan().subscribe(
      data => {
        this.laporanList = data;
        event.target.complete();
      },
      error => {
        console.error('Error fetching laporan', error);
        event.target.complete();
      }
    );
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}

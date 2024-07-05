import { Component } from '@angular/core';
import { LaporanService } from '../../../../../services/laporan/laporan.service';

@Component({
  selector: 'app-laporan',
  templateUrl: './laporan.page.html',
  styleUrls: ['./laporan.page.scss'],
})
export class LaporanPage {
  tanggal: string = '';

  constructor(private laporanService: LaporanService) {}

  submitLaporan(event: Event) {
    event.preventDefault();

    const formattedTanggal = this.formatTanggal(this.tanggal);

    const laporanData = { tanggal: formattedTanggal };

    this.laporanService.createLaporan(laporanData).subscribe(
      response => {
        alert(response.message);
      },
      error => {
        console.error('There was an error!', error);
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
}

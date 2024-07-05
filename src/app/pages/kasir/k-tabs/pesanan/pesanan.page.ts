import { Component, OnInit } from '@angular/core';
import { PesananService } from '../../../../services/pesanan/pesanan.service';

interface Layanan {
  id: number;
  nama: string;
}

interface Pelanggan {
  id: number;
  nama: string;
}

interface Pesanan {
  id: number;
  layanan: Layanan;
  pelanggan: Pelanggan;
  jumlah: number;
  tanggal_pemesanan: string;
  status: string;
  total_harga: number;
}

@Component({
  selector: 'app-pesanan',
  templateUrl: './pesanan.page.html',
  styleUrls: ['./pesanan.page.scss']
})
export class PesananPage implements OnInit {

  pesananBelumDiproses: Pesanan[] = [];
  pesananSudahDiproses: Pesanan[] = [];
  selectedSegment = 'belum-diproses'; // Default selected segment

  constructor(private pesananService: PesananService) { }

  ngOnInit(): void {
    this.loadPesananBelumDiproses();
    this.loadPesananSudahDiproses();
  }

  ionViewWillEnter() {
    this.loadPesananBelumDiproses();
    this.loadPesananSudahDiproses();
  }

  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  loadPesananBelumDiproses(): void {
    this.pesananService.getPesananProses()
      .subscribe(
        data => {
          this.pesananBelumDiproses = data;
          console.log('Pesanan belum diproses:', data);
        },
        error => {
          console.error('Error fetching pesanan belum diproses:', error);
          alert('Terjadi kesalahan saat mengambil data pesanan belum diproses. Silakan coba lagi.');
        }
      );
  }

  loadPesananSudahDiproses(): void {
    this.pesananService.getPesananSelesai()
      .subscribe(
        data => {
          this.pesananSudahDiproses = data;
          console.log('Pesanan sudah diproses:', data);
        },
        error => {
          console.error('Error fetching pesanan sudah diproses:', error);
          alert('Terjadi kesalahan saat mengambil data pesanan sudah diproses. Silakan coba lagi.');
        }
      );
  }

  updatePesananStatus(id: number): void {
    this.pesananService.updateStatus(id, 'selesai').subscribe(
      response => {
        alert(response.message);
        this.loadPesananBelumDiproses();
        this.loadPesananSudahDiproses(); // Refresh list pesanan setelah update
      },
      error => {
        console.error('Error updating pesanan status:', error);
        alert('Terjadi kesalahan saat mengubah status pesanan. Silakan coba lagi.');
      }
    );
  }

  refreshPesanan(): void {
    this.loadPesananBelumDiproses();
    this.loadPesananSudahDiproses();
  }
}

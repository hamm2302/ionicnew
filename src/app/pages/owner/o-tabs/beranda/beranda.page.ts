import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service'; // Sesuaikan dengan path yang benar
import { LaporanService } from '../../../../services/laporan/laporan.service'; // Sesuaikan dengan path yang benar
import { KaryawanService } from '../../../../services/karyawan/karyawan.service'; // Sesuaikan dengan path yang benar
import { PesananService } from '../../../../services/pesanan/pesanan.service';

@Component({
  selector: 'app-beranda',
  templateUrl: './beranda.page.html',
  styleUrls: ['./beranda.page.scss'],
})
export class BerandaPage implements OnInit {

  laporan: any;
  jumlahKaryawan: number = 0; // Variabel untuk menyimpan jumlah karyawan
  pesananList: any[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private laporanService: LaporanService,
    private karyawanService: KaryawanService, // Tambahkan KaryawanService
    private pesananService: PesananService
  ) { }

  async logout() {
    await this.authService.logout();
    localStorage.clear();
    this.router.navigateByUrl('/onboard', { replaceUrl: true });
  }

  ngOnInit() {
    this.loadLaporan();
    this.loadJumlahKaryawan(); // Panggil fungsi untuk mengambil jumlah karyawan saat inisialisasi komponen\
    this.getAllPesanan();
  }

  getAllPesanan(): void {
    this.pesananService.getAllPesanan()
      .subscribe(
        data => {
          // Filter pesanan yang sedang dalam proses
          this.pesananList = data.filter(pesanan => pesanan.status === 'selesai');
          console.log('Pesanan list:', this.pesananList);
        },
        error => {
          console.error('Error fetching pesanan:', error);
          alert('Terjadi kesalahan saat mengambil data pesanan. Silakan coba lagi.');
        }
      );
  }


  loadLaporan() {
    const today = new Date().toISOString().slice(0, 10); // Ambil tanggal hari ini dalam format YYYY-MM-DD
    this.laporanService.getLaporanByTanggal(today).subscribe(
      (response) => {
        this.laporan = response;
      },
      (error) => {
        console.log(error);
        // Handle error
      }
    );
  }

  loadJumlahKaryawan() {
    this.karyawanService.getKaryawan().subscribe(
      (data: any[]) => {
        this.jumlahKaryawan = data.length; // Menghitung jumlah karyawan dari array data yang diterima
      },
      (error) => {
        console.error('Error fetching employees:', error);
        // Handle error
      }
    );
  }

}

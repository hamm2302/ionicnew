import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalPesananComponent } from 'src/app/components/modal-pesanan/modal-pesanan.component';
import { Router } from '@angular/router';
import { PesananService } from '../../../../services/pesanan/pesanan.service';

@Component({
  selector: 'app-beranda',
  templateUrl: './beranda.page.html',
  styleUrls: ['./beranda.page.scss'],
})
export class BerandaPage implements OnInit {
  pesananList: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private router: Router,
    private pesananService: PesananService
  ) { }

  ngOnInit(): void {
    this.getAllPesanan();
  }

  async openOrderModal() {
    const modal = await this.modalCtrl.create({
      component: ModalPesananComponent
    });
    modal.present();
  }

  goLayanan() {
    this.router.navigateByUrl('k-tabs/beranda/layanan');
  }

  goLaporan() {
    this.router.navigateByUrl('k-tabs/beranda/laporan');
  }

  getAllPesanan(): void {
    this.pesananService.getAllPesanan()
      .subscribe(
        data => {
          // Filter pesanan yang sedang dalam proses
          this.pesananList = data.filter(pesanan => pesanan.status === 'proses');
          console.log('Pesanan list:', this.pesananList);
        },
        error => {
          console.error('Error fetching pesanan:', error);
          alert('Terjadi kesalahan saat mengambil data pesanan. Silakan coba lagi.');
        }
      );
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LayananService } from '../../../app/services/layanan/layanan.service';
import { AlertController } from '@ionic/angular';

// Enum untuk unit waktu
export enum Unit {
  PCS = 'pcs',
  KG = 'kg'
}

// Interface untuk model Laundry
export interface Laundry {
  id?: number;
  nama: string;
  deskripsi: string;
  durasi: number;
  harga: number;
  unit: Unit;
}

@Component({
  selector: 'app-add-laundry-modal',
  templateUrl: './tambah-layanan.component.html',
  styleUrls: ['./tambah-layanan.component.scss'],
  providers: [LayananService]
})
export class TambahLayananComponent implements OnInit {
  @Input() layananId: number = 0; // Input untuk ID layanan yang akan diedit

  layananForm: FormGroup;
  units = Object.values(Unit);

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private layananService: LayananService,
    private alertController: AlertController,
    private navParams: NavParams // Digunakan untuk mendapatkan parameter dari modal
  ) {
    this.layananForm = this.formBuilder.group({
      nama: ['', [Validators.required, Validators.minLength(1)]],
      deskripsi: ['', [Validators.required, Validators.minLength(1)]],
      durasi: ['', [Validators.required, Validators.min(1)]],
      harga: ['', [Validators.required, Validators.min(1)]],
      unit: [Unit.PCS, [Validators.required]]
    });
  }

  ngOnInit() {
    // Jika ada layananId yang diteruskan ke modal, artinya ini untuk mode edit
    if (this.layananId) {
      this.loadLayananToEdit(this.layananId);
    }
  }

  // Fungsi untuk mengambil data layanan yang akan diedit dari server
  async loadLayananToEdit(id: number) {
    try {
      const data = await this.layananService.getLayananById(id).toPromise();
      this.fillFormWithData(data); // Mengisi form dengan data layanan yang diambil
    } catch (error) {
      console.error('Error fetching layanan', error);
      this.dismiss(); // Tutup modal jika terjadi kesalahan
    }
  }

  // Mengisi form dengan data layanan yang akan diedit
  fillFormWithData(layanan: Laundry) {
    this.layananForm.patchValue({
      nama: layanan.nama,
      deskripsi: layanan.deskripsi,
      durasi: layanan.durasi,
      harga: layanan.harga,
      unit: layanan.unit
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  submitLayanan() {
    if (this.layananForm.valid) {
      if (this.layananId) {
        // Jika ada layananId, kirim sebagai update
        this.editLayanan(this.layananId, this.layananForm.value);
        this.dismiss();
      } else {
        // Jika tidak ada layananId, kirim sebagai penambahan baru
        this.addNewLayanan(this.layananForm.value);
      }
    }
  }

  autoRefreshFunction() {
    window.location.reload();
  }

  // Fungsi untuk menambah layanan baru
  async addNewLayanan(layananData: Laundry) {
    try {
      await this.layananService.addLayanan(layananData).toPromise();
      await this.presentAlert('Sukses', 'Layanan berhasil ditambahkan.');
      this.dismiss();
    } catch (error) {
      await this.presentAlert('Error', 'Terjadi kesalahan saat menambahkan layanan. Silakan coba lagi.');
    }
  }

  // Fungsi untuk mengedit layanan yang ada
  async editLayanan(id: number, layananData: Laundry) {
    try {
      await this.layananService.updateLayanan(id, layananData).toPromise();
      await this.presentAlert('Sukses', 'Layanan berhasil diperbarui.');
      this.dismiss();
    } catch (error) {
      await this.presentAlert('Error', 'Terjadi kesalahan saat memperbarui layanan. Silakan coba lagi.');
    }
  }
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();

    await alert.onDidDismiss();
    
    this.autoRefreshFunction();
  }
}

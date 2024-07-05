import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KaryawanService } from '../../../app/services/karyawan/karyawan.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-modal-karyawan',
  templateUrl: './modal-karyawan.component.html',
  styleUrls: ['./modal-karyawan.component.scss'],
  providers: [KaryawanService]
})
export class ModalKaryawanComponent  implements OnInit {

 @Input() karyawanId: number = 0; // Input untuk ID karyawan yang akan diedit

  karyawanForm: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private karyawanService: KaryawanService,
    private alertController: AlertController
  ) {
    this.karyawanForm = this.formBuilder.group({
      nama: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    // Jika ada karyawanId yang diteruskan ke modal, artinya ini untuk mode edit
    if (this.karyawanId) {
      this.loadKaryawanToEdit(this.karyawanId);
    }
  }

  // Fungsi untuk mengambil data karyawan yang akan diedit dari server
  async loadKaryawanToEdit(id: number) {
    try {
      const data = await this.karyawanService.getKaryawanById(id).toPromise();
      this.fillFormWithData(data); // Mengisi form dengan data karyawan yang diambil
    } catch (error) {
      console.error('Error fetching karyawan', error);
      this.dismiss(); // Tutup modal jika terjadi kesalahan
    }
  }

  // Mengisi form dengan data karyawan yang akan diedit
  fillFormWithData(karyawan: any) {
    this.karyawanForm.patchValue({
      nama: karyawan.nama,
      email: karyawan.email,
      password: '' // Password kosong saat edit
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  submitKaryawan() {
    if (this.karyawanForm.valid) {
      if (this.karyawanId) {
        // Jika ada karyawanId, kirim sebagai update
        this.editKaryawan(this.karyawanId, this.karyawanForm.value);
      } else {
        // Jika tidak ada karyawanId, kirim sebagai penambahan baru
        this.addNewKaryawan(this.karyawanForm.value);
      }
    }
  }

  // Fungsi untuk menambah karyawan baru
  async addNewKaryawan(karyawanData: any) {
    try {
      await this.karyawanService.addKaryawan(karyawanData).toPromise();
      await this.presentAlert('Sukses', 'Karyawan berhasil ditambahkan.');
      this.dismiss();
    } catch (error) {
      await this.presentAlert('Error', 'Terjadi kesalahan saat menambahkan karyawan. Silakan coba lagi.');
    }
  }

  // Fungsi untuk mengedit karyawan yang ada
  async editKaryawan(id: number, karyawanData: any) {
    try {
      await this.karyawanService.updateKaryawan(id, karyawanData).toPromise();
      await this.presentAlert('Sukses', 'Karyawan berhasil diperbarui.');
      this.dismiss();
    } catch (error) {
      await this.presentAlert('Error', 'Terjadi kesalahan saat memperbarui karyawan. Silakan coba lagi.');
    }
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

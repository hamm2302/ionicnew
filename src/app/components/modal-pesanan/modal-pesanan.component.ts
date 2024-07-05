import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LayananService } from '../../../app/services/layanan/layanan.service'; // Sesuaikan path jika perlu
import { environment } from 'src/environments/environment'; // Sesuaikan dengan path environment Anda
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-modal-pesanan',
  templateUrl: './modal-pesanan.component.html',
  styleUrls: ['./modal-pesanan.component.scss'],
  providers: [LayananService] // Registrasikan LayananService di dalam providers komponen
})
export class ModalPesananComponent implements OnInit {
  orderForm: FormGroup;
  layananOptions: any[] = []; // Deklarasi layananOptions disini
  totalHarga: number = 0;
  harga: number = 0;

  constructor(
    private modalCtrl: ModalController,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private layananService: LayananService, // Inject LayananService
    private alertController: AlertController

  ) {
    this.orderForm = this.formBuilder.group({
      nama: ['', [Validators.required, Validators.minLength(1)]],
      no_hp: ['', [Validators.required, Validators.pattern('^[0-9]{12}$')]],
      alamat: ['', [Validators.required, Validators.minLength(1)]],
      id_layanan: ['', [Validators.required]],
      jumlah: ['', [Validators.required, Validators.min(1)]],
    });

    // // Monitor perubahan pada form untuk menghitung total harga
    // this.orderForm.valueChanges.subscribe(value => {
    //   if (this.orderForm.valid) {
    //     this.calculateTotalPrice(value.id_layanan, value.jumlah);
    //   }
    // });
  }

  ngOnInit() {
    this.loadLayanan(); // Panggil metode untuk mengambil data layanan saat inisialisasi komponen
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  submitOrder() {
    if (this.orderForm.valid) {
      let token = localStorage.getItem('token');
      
      // URL endpoint API yang dituju
      let apiUrl = 'https://laundryin.gens.social/api/pesanan';

      // Atur header untuk mengirim token
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });

    this.http.post(apiUrl, this.orderForm.value, { headers })
      .subscribe(async response => {
        console.log('Pesanan berhasil dibuat', response);
        await this.presentAlert('Sukses', 'Pesanan berhasil dibuat.');
        this.dismiss();
      }, async error => {
        console.error('Error creating order', error);
        this.presentAlert('Error', 'Terjadi kesalahan saat membuat pesanan. Silakan coba lagi.');
      });
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

  // Metode untuk mengambil data layanan dari LayananService
  loadLayanan() {
    this.layananService.getLayanan()
      .subscribe(
        (data) => {
          console.log('Data layanan:', data); // Tambahkan log untuk memeriksa data yang diterima
          this.layananOptions = data; // Mengisi layananOptions dengan data dari API
        },
        (error) => {
          console.error('Error fetching layanan:', error);
          // Handle error fetching data if needed
        }
      );
  }

  calculateTotalPrice() {
    const id_layanan = this.orderForm.get('id_layanan')?.value;
    const jumlah = this.orderForm.get('jumlah')?.value;
    const layanan = this.layananOptions.find(l => l.id === id_layanan);
    if (layanan && jumlah) {
      this.totalHarga = layanan.harga * jumlah;
    } else {
      this.totalHarga = 0;
    }
  }
}

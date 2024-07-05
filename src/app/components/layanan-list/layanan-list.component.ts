import { Component, OnInit } from '@angular/core';
import { LayananService } from '../../../app/services/layanan/layanan.service';

@Component({
  selector: 'app-layanan-list',
  templateUrl: './layanan-list.component.html',
  styleUrls: ['./layanan-list.component.css']
})
export class LayananListComponent implements OnInit {

  layananList: any[] = [];
  error: any;

  constructor(private layananService: LayananService) { }

  ngOnInit(): void {
    this.fetchLayanan();
  }

  fetchLayanan() {
    this.layananService.getLayanan().subscribe(
      (data) => {
        this.layananList = data; // Assign fetched data to component property
      },
      (error) => {
        this.error = error; // Handle errors locally if needed
        console.error('Error fetching layanan:', error);
      }
    );
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LayananService {

  private apiUrl = 'https://laundryin.gens.social/api'; // Ganti dengan URL API Anda

  constructor(private http: HttpClient) { }

  // Metode untuk mengambil daftar layanan dari API
  getLayanan(): Observable<any[]> {
    console.log('Fetching layanan list');

    const token = localStorage.getItem('token'); // Ambil token dari localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any[]>(`${this.apiUrl}/layanan`, { headers: headers }).pipe(
      catchError(error => {
        console.error('Error fetching layanan', error);
        return throwError(error); // Rethrow error to handle in component
      })
    );
  }

  // Metode untuk mengambil satu layanan berdasarkan ID
  getLayananById(id: number): Observable<any> {
    const token = localStorage.getItem('token'); // Ambil token dari localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiUrl}/layanans/${id}`, { headers: headers }).pipe(
      catchError(error => {
        console.error('Error fetching layanan by ID', error);
        return throwError(error); // Rethrow error to handle in component
      })
    );
  }

  // Metode untuk menambah layanan baru
  addLayanan(laundry: any): Observable<any> {
    const token = localStorage.getItem('token'); // Ambil token dari localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<any>(`${this.apiUrl}/layanan`, laundry, { headers: headers }).pipe(
      catchError(error => {
        console.error('Error adding layanan', error);
        return throwError(error); // Rethrow error to handle in component
      })
    );
  }

  // Metode untuk memperbarui layanan yang ada
  updateLayanan(id: number, laundry: any): Observable<any> {
    const token = localStorage.getItem('token'); // Ambil token dari localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.put<any>(`${this.apiUrl}/layanan/${id}`, laundry, { headers: headers }).pipe(
      catchError(error => {
        console.error('Error updating layanan', error);
        return throwError(error); // Rethrow error to handle in component
      })
    );
  }

  // Metode untuk menghapus layanan
  deleteLayanan(id: number): Observable<any> {
    const token = localStorage.getItem('token'); // Ambil token dari localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<any>(`${this.apiUrl}/layanan/${id}`,{ headers: headers }).pipe(
      catchError(error => {
        console.error('Error deleting layanan', error);
        return throwError(error); // Rethrow error to handle in component
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class KaryawanService {

  private apiUrl = 'https://laundryin.gens.social/api';

  constructor(private http: HttpClient) { }
  
  getKaryawan(): Observable<any[]> {
    const token = localStorage.getItem('token'); // Ambil token dari localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.get<any[]>(`${this.apiUrl}/karyawan`, { headers: headers }).pipe(
      catchError(error => {
        console.error('Error fetching karyawan', error);
        return throwError(error);
      })
    );
  }

  getKaryawanById(id: number): Observable<any> {
    const token = localStorage.getItem('token'); // Ambil token dari localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiUrl}/karyawan/${id}`, { headers: headers }).pipe(
      catchError(error => {
        console.error(`Error fetching karyawan with ID ${id}`, error);
        return throwError(error);
      })
    );
  }

  addKaryawan(karyawan: any): Observable<any> {
    const token = localStorage.getItem('token'); // Ambil token dari localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(`${this.apiUrl}/register/karyawan`, karyawan, { headers: headers }).pipe(
      catchError(error => {
        console.error('Error adding karyawan', error);
        return throwError(error);
      })
    );
  }

  updateKaryawan(id: number, karyawan: any): Observable<any> {
    const token = localStorage.getItem('token'); // Ambil token dari localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put<any>(`${this.apiUrl}/karyawan/${id}`, karyawan, { headers: headers }).pipe(
      catchError(error => {
        console.error(`Error updating karyawan with ID ${id}`, error);
        return throwError(error);
      })
    );
  }

  deleteKaryawan(id: number): Observable<any> {
    const token = localStorage.getItem('token'); // Ambil token dari localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(`${this.apiUrl}/karyawan/${id}`, { headers: headers }).pipe(
      catchError(error => {
        console.error(`Error deleting karyawan with ID ${id}`, error);
        return throwError(error);
      })
    );
  }
}

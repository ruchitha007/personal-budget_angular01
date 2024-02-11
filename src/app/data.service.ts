import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private data: any[] = [];
  private dataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {}

  fetchDataIfNeeded(): void {
    if (this.data.length === 0) {
      this.http.get('http://localhost:3000/data').subscribe((response: any) => {
        this.data = response;
        this.dataSubject.next(this.data);
      });
    }
  }

  getData(): Observable<any[]> {
    return this.dataSubject.asObservable();
  }
}

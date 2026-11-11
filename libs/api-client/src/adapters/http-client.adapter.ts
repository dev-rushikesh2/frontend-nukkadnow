import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpClientAdapter {
  private http = inject(HttpClient);

  get<T>(url: string, params?: Record<string, string | number | boolean>): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.entries(params).forEach(([key, val]) => {
        httpParams = httpParams.set(key, String(val));
      });
    }
    return this.http.get<T>(url, { params: httpParams });
  }

  post<T>(url: string, body: unknown, headers?: Record<string, string>): Observable<T> {
    const httpHeaders = new HttpHeaders(headers);
    return this.http.post<T>(url, body, { headers: httpHeaders });
  }

  put<T>(url: string, body: unknown): Observable<T> {
    return this.http.put<T>(url, body);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InfoUsuario } from '../interfaces/InfoUsuario';

@Injectable({
  providedIn: 'root',
})
export class InfoUsuarioService {
  private myUrl = 'https://localhost:7007/';
  private myApiUrl = 'api/info/';

  constructor(private http: HttpClient) {}

  getInfo(): Observable<any> {
    return this.http.get(this.myUrl + this.myApiUrl);
  }

  saveInfo(infoUsuario: InfoUsuario): Observable<any> {
    return this.http.post(this.myUrl + this.myApiUrl, infoUsuario);
  }

  getEditInfo(id: number): Observable<any> {
    return this.http.get(this.myUrl + this.myApiUrl + id);
  }

  editInfo(id: number, infoUsuario: InfoUsuario): Observable<any> {
    return this.http.put(this.myUrl + this.myApiUrl + id, infoUsuario);
  }

  deleteInfo(id: number): Observable<any> {
    return this.http.delete(this.myUrl + this.myApiUrl + id);
  }
}

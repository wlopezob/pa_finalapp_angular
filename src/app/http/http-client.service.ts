import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { VentaModel } from './../models/ventaModel';
import { ResultModel } from './../models/resultModel';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  private url = environment.url;
  constructor(
    private httpClient: HttpClient
  ) { }
  listar(): Observable<VentaModel[]> {
    return this.httpClient.get<VentaModel[]>(`${this.url}listar`).pipe(
      map(rs => {
        return rs;
      })
    );
  }
  guardar(ventaModel: VentaModel): Observable<ResultModel> {
    return this.httpClient.post<ResultModel>(`${this.url}guardar`, ventaModel).pipe(
      map(rs => {
        return rs;
      })
    );
  }
}

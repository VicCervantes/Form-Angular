import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {
  private formularios = new BehaviorSubject<any[]>([]);
  formularios$ = this.formularios.asObservable();
  public url: string = '';

  constructor(private _http: HttpClient) {
    this.url = 'https://www.limpiezamexico.mx/ApiRest/APIPaginaIndustrial/v1/paginaIndustrial/';
  }

  sp_Form_vic(objLogin: any): Observable<any> {
    return this._http.post(this.url + 'sp_Form_vic', objLogin);
  }

  agregarFormulario(formulario: any): Observable<any> {
    // Llamada HTTP para agregar el formulario
    return this._http.post(this.url + 'ruta_del_endpoint_para_agregar_formulario', formulario).pipe(
      // Aquí puedes realizar más transformaciones o manejar errores si es necesario
    );
  }
}

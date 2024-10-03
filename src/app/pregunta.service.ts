import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PreguntaService {
  private formularios = new BehaviorSubject<any[]>([]);
  formularios$ = this.formularios.asObservable();
  public url:string = '';

constructor(private _http: HttpClient){
  this.url='https://www.limpiezamexico.mx/ApiRest/APIPaginaIndustrial/v1/paginaIndustrial/';
}
  
sp_Form_vic(objLogin:any):Observable<any>{
  return this._http.post(this.url+'sp_Form_vic',objLogin);
}

  agregarFormulario(formulario: any) {
    const formulariosActuales = this.formularios.getValue();
    formulariosActuales.push(formulario);
    this.formularios.next(formulariosActuales);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PreguntaService } from '../pregunta.service'; 

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
})
export class OpcionesComponent implements OnInit {
  formularios: any = [];
  messages: string[] = [];
  public strUsuario: any = "";
  public strUrl: any = "";
  public strNombreFormulario: any = "";
  public strEstatus: any = "";
  public strFechaCreacion: any = "";
  public intIDFormulario: any = "";

  constructor(private preguntaService: PreguntaService, private router: Router) {}

  ngOnInit(): void {
    this.fnGetFormulario()
    this.preguntaService.formularios$.subscribe(data => {
      this.formularios = data.map(formulario => ({
        ...formulario,
        activo: formulario.activo !== undefined ? formulario.activo : true,
        estatus: formulario.activo ? 'Activo' : 'Baja' 
      }));
    });
  }

  toggleStatus(formulario: any) {
    formulario.activo = !formulario.activo;
    formulario.estatus = formulario.activo ? 'Activo' : 'Baja'; 
  }

  addMessage(message: string) {
    this.messages.push(message);
    setTimeout(() => {
      this.dismissAlert(message);
    }, 1500);
  }

  dismissAlert(message: string) {
    const index = this.messages.indexOf(message);
    if (index > -1) {
      this.messages.splice(index, 1);
    }
  }

  fnPreguntas(id: number) {
    this.router.navigate(['/crear-formulario', id]);
  }

  compartirFormulario(formularioId: string) {
    const url = `${window.location.origin}/responder/${this.intIDFormulario}`;
    this.copiarAlPortapapeles(url);
    alert('Enlace copiado: ' + url);
  }

  copiarAlPortapapeles(text: string) {
    const input = document.createElement('textarea');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  }
  
 fnInsertFormulario() { 
    this.preguntaService.sp_Form_vic({
      strAccion: 'INSERT_FORMULARIO', 
      strUsuario: 'JGuzman',
      strFechaCreacion: this.strFechaCreacion,
      strNombreFormulario: this.strNombreFormulario,
      strEstatus: this.strEstatus,
      strUrl: this.strUrl
    }).subscribe(
      result => {
        this.fnGetFormulario()
        console.log(result); 

        this.strNombreFormulario = "";
        this.strEstatus = "";
        this.strUrl = "";
      },
      error => {
        var error = <any>error;
        console.log(error);
      }
    );
  }

  fnChangeEstatus(estatus: any, id: any) {
    console.log(id)
    estatus = (estatus == 'alta')? 'baja': 'alta'
    this.preguntaService.sp_Form_vic({
      strAccion: 'CAMBIAR_ESTATUS_FORM', 
      strEstatus: estatus,
      intIDFormulario: id,
    }).subscribe(
      result => {
        this.fnGetFormulario()
        console.log(result)
      },
      error => {
        var error = <any>error;
        console.log(error);
      }
    );
  }

  fnGetFormulario() {
   
    this.preguntaService.sp_Form_vic({
      strAccion: 'GET_FORMULARIOS', 
    }).subscribe(
      result => { 
        console.log(result)
        this.formularios = result
      },
      error => {
        var error = <any>error;
        console.log(error);
      }
    );
  }

  fnDeleteForm(id: any) {
   
    this.preguntaService.sp_Form_vic({
      strAccion: 'BORRAR_FORMULARIO', 
      intIDFormulario: id, 
    }).subscribe(
      result => {
        this.fnGetFormulario()
        console.log(result)
      },
      error => {
        var error = <any>error;
        console.log(error);
      }
    );
  }


  logout(): void {
    this.router.navigate(['/login']);
  }
}
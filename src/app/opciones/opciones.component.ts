import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PreguntaService } from '../pregunta.service'; 

@Component({
  selector: 'app-opciones',
  templateUrl: './opciones.component.html',
})
export class OpcionesComponent implements OnInit {
  formularios: any[] = [];
  messages: string[] = [];
  public strUsuario: string = "";
  public strUrl: string = "";
  public strNombreFormulario = "";
  public strEstatus= "";

  constructor(private preguntaService: PreguntaService, private router: Router) {}

  ngOnInit(): void {
    this.fnGetFormulario()
    this.preguntaService.formularios$.subscribe(data => {
      this.formularios = data.map(formulario => ({
        ...formulario,
        activo: formulario.activo !== undefined ? formulario.activo : true, // Por defecto, activo es true si no está definido
        estatus: formulario.activo ? 'Activo' : 'Baja' // Inicializa el estatus acorde al estado activo
      }));
    });
  }

  // Lógica para cambiar el estatus del formulario al marcar/desmarcar el checkbox
  toggleStatus(formulario: any) {
    formulario.activo = !formulario.activo;
    formulario.estatus = formulario.activo ? 'Activo' : 'Baja'; // Cambia el estatus acorde al estado activo
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

  compartirFormulario(formularioId: string) {
    const url = `${window.location.origin}/responder/${formularioId}`;
    this.copiarAlPortapapeles(url);
    alert('Enlace copiado: ' + url);
  }

  // Función para copiar el texto al portapapeles
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
      strNombreFormulario: this.strNombreFormulario,
      strEstatus: this.strEstatus,
      strUrl: this.strUrl
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

  logout(): void {
    this.router.navigate(['/login']);
  }
}
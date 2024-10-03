import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { PreguntaService } from '../pregunta.service'; // Cambiar a PreguntasService

@Component({
  selector: 'app-crear-formulario',
  templateUrl: './crear-formulario.component.html',
})
export class CrearFormularioComponent {
  formularioForm: FormGroup;
  messages: string[] = [];

  constructor(private fb: FormBuilder, private preguntaService: PreguntaService) { 
    this.formularioForm = this.fb.group({
      nombre: [''], 
      estatus: ['Activo'], 
      preguntas: this.fb.array([]),
    });
  }

  ngOnInit(): void{
    this.fngetPreguntas()
  }

  get preguntas() {
    return this.formularioForm.get('preguntas') as FormArray;
  }

  fngetPreguntas() {
   
    this.preguntaService.sp_Form_vic({
      strAccion: 'getPreguntas', 
    }).subscribe(
      result => {
       
        console.log(result)
      },
      error => {
        var error = <any>error;
        console.log(error);
      }
    );
  }

  agregarPregunta() {
    const preguntaGroup = this.fb.group({
      pregunta: [''],
      tipo: ['']
    });
    this.preguntas.push(preguntaGroup);
  }

  eliminarPregunta(index: number) {
    this.preguntas.removeAt(index);
  }

  onSubmit() {
    const formularioData = {
      nombre: this.formularioForm.value.nombre,
      estatus: this.formularioForm.value.estatus,
      preguntas: this.preguntas.controls.map(p => p.value),
      usuarioCreador: 'Nombre del usuario', // Cambiar según cómo obtengas el nombre del usuario
      fecha: new Date(),
    };

    // Enviar los datos del formulario al servicio
    this.preguntaService.agregarFormulario(formularioData);
    
    this.addMessage('Formulario creado exitosamente');
    this.resetFormulario();
  }

  resetFormulario(): void {
    this.formularioForm.reset();
    while (this.preguntas.length) {
      this.preguntas.removeAt(0);
    }
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

  logout() {
    console.log('Cerrando sesión...');
  }
}

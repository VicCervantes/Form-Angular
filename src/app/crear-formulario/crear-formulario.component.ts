import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { PreguntaService } from '../pregunta.service'; 

@Component({
  selector: 'app-crear-formulario',
  templateUrl: './crear-formulario.component.html',
})
export class CrearFormularioComponent implements OnInit {
  formularioForm: FormGroup;
  messages: string[] = [];
  public strEstatus: any = "";
  public strintIDFormulario: any = "";
  public strUrl: any = "";
  public strNombreFormulario: any = "";

  constructor(private fb: FormBuilder, private preguntaService: PreguntaService) { 
    this.formularioForm = this.fb.group({
      nombre: [''], 
      estatus: ['Activo'], 
      preguntas: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.fngetPreguntas(); 
  }

  get preguntas() {
    return this.formularioForm.get('preguntas') as FormArray;
  }

  fngetPreguntas() {
    this.preguntaService.sp_Form_vic({ strAccion: 'getPreguntas' }).subscribe(
      result => {
        result.forEach((pregunta: any) => {
          const preguntaGroup = this.fb.group({
            pregunta: [pregunta.texto || ''], 
            tipo: [pregunta.tipo || ''] 
          });
          this.preguntas.push(preguntaGroup);
        });
      },
      error => {
        console.error('Error al obtener preguntas:', error);
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

  fnonSubmit(id: any) {
    const formularioData = {
      strAccion: 'crearFormulario', 
      strUsuario: 'JGuzman', 
      strNombreFormulario: this.strNombreFormulario,
      strEstatus: this.strEstatus,
      strUrl: this.strUrl,
      preguntas: this.preguntas.controls.map((p) => ({
        strPregunta: p.get('pregunta')?.value,
        strTipo: p.get('tipo')?.value,
        intIDFormulario: id,
      })),
    };

    this.preguntaService.agregarFormulario(formularioData).subscribe(
      response => {
        this.preguntaService.agregarFormulario(formularioData); 
        this.addMessage('Formulario creado exitosamente');
        this.resetFormulario();
      },
      error => {
        console.error('Error al crear formulario:', error);
        this.addMessage('Error al crear el formulario.');
      }
    );
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

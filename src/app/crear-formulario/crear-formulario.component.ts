import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { PreguntaService } from '../pregunta.service'; 
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crear-formulario',
  templateUrl: './crear-formulario.component.html',
  })
  export class CrearFormularioComponent implements OnInit {
    formularioForm: FormGroup;
    messages: string[] = [];

  public strEstatus: any = "";
  public array: any = [];
  public strintIDFormulario: any = "";
  public strUrl: any = "";
  public strNombreFormulario: any = "";

  constructor(private fb: FormBuilder, private preguntaService: PreguntaService, public route: ActivatedRoute) { 
  this.formularioForm = this.fb.group({
    nombre: [''], 
    estatus: [''], 
    preguntas: this.fb.array([]),
  });
    this.strintIDFormulario = this.route.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this.fngetPreguntas(); 
  }

  get preguntas() {
    return this.formularioForm.get('preguntas') as FormArray;
  }

  fngetPreguntas() {
    this.preguntaService.sp_Form_vic({
    strAccion: 'GET_PREGUNTAS',
    intIDFormulario: this.strintIDFormulario
    }).subscribe((data: any) => {
     console.log(data)
     this.array=data
    },
      error => {
        var error = <any>error;
        console.log(error);
      }
    )
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

  fnonSubmit(id: number) {
    const formularioData = {
      strAccion: 'crearFormulario', 
      strUsuario: 'JGuzman', 
      strNombreFormulario: this.strNombreFormulario,
      strEstatus: this.strEstatus,
      strUrl: this.strUrl,
      preguntas: this.preguntas.value.map((p: any) => ({
        strPregunta: p.pregunta,
        strTipo: p.tipo,
        intIDFormulario: id,
      })),
    };

    this.preguntaService.agregarFormulario(formularioData).subscribe(
      response => {
        this.addMessage('Formulario creado exitosamente');
      },
      error => {
        console.error('Error al crear formulario:', error);
        this.addMessage('Error al crear el formulario.');
      }
    );
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
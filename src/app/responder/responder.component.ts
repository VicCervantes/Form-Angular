import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { PreguntaService } from '../pregunta.service';

@Component({
  selector: 'app-responder',
  templateUrl: './responder.component.html',
  styleUrls: ['./responder.component.css']
})
export class ResponderComponent implements OnInit {
  formularioForm: FormGroup;
  questions: any[] = [];
  messages: { text: string, category: string }[] = [];

  constructor(private fb: FormBuilder, private preguntaService: PreguntaService) {
    this.formularioForm = this.fb.group({
      respuestas: this.fb.array([])
    });
  }

  ngOnInit() {

  }

  initializeForm() {
    const respuestas = this.fb.array(
      this.questions.map(question => this.fb.group({
        pregunta: [question.pregunta],  
        respuesta: ['']                    
      }))
    );
    this.formularioForm.setControl('respuestas', respuestas);
  }

  get respuestas() {
    return this.formularioForm.get('respuestas') as FormArray;
  }

  onSubmit() {
    if (this.formularioForm.valid) {
      const respuestas = this.formularioForm.value.respuestas;
      console.log('Respuestas enviadas:', respuestas);
      const successMessage = { text: 'Respuestas enviadas exitosamente!', category: 'success' };
      this.messages.push(successMessage);
      this.autoDismissAlert(successMessage);
    } else {
      const dangerMessage = { text: 'Por favor completa todos los campos.', category: 'danger' };
      this.messages.push(dangerMessage);
      this.autoDismissAlert(dangerMessage); 
    }
  }

  autoDismissAlert(message: { text: string, category: string }) {
    setTimeout(() => {
      this.dismissAlert(message);
    }, 1500); 
  }

  dismissAlert(message: { text: string, category: string }) {
    const index = this.messages.indexOf(message);
    if (index > -1) {
      this.messages.splice(index, 1);
    }
  }
}

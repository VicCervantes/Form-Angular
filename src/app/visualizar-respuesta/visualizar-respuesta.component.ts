import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visualizar-respuestas',
  templateUrl: './visualizar-respuesta.component.html',
  styleUrls: ['./visualizar-respuesta.component.css']
})
export class VisualizarRespuestaComponent implements OnInit {
  respuestas: { nombre: string, pregunta: string, respuesta: string }[] = []; 

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadRespuestas();
  }

  loadRespuestas() {
    this.respuestas
  }

  goBack() {
    this.router.navigate(['/opciones']);  
  }
}
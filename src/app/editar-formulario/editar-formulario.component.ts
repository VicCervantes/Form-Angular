import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PreguntaService } from '../pregunta.service';

@Component({
  selector: 'app-editar-formulario',
  templateUrl: './editar-formulario.component.html',
})
export class EditarFormularioComponent implements OnInit {
  formularioActual: any;

  constructor(
    private route: ActivatedRoute,
    private preguntaService: PreguntaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const formularioId = this.route.snapshot.paramMap.get('id');
    this.preguntaService.formularios$.subscribe((formularios) => {
      this.formularioActual = formularios.find(f => f.id === formularioId);
    });
  }

  guardarCambios() {
    
  }

  cancelar() {
    this.router.navigate(['/opciones']); // Redirige de vuelta a opciones
  }
}

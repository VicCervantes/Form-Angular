import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpcionesComponent } from './opciones/opciones.component';
import { CrearFormularioComponent } from './crear-formulario/crear-formulario.component';
import { ResponderComponent } from './responder/responder.component';
import { VisualizarRespuestaComponent } from './visualizar-respuesta/visualizar-respuesta.component';
import { EditarFormularioComponent } from './editar-formulario/editar-formulario.component';

const routes: Routes = [
  { path: 'opciones', component: OpcionesComponent },
  { path: 'crear-formulario/:id', component: CrearFormularioComponent},
  { path: 'responder', component: ResponderComponent},
  { path: 'visualizar-respuesta', component: VisualizarRespuestaComponent},
  { path: 'editar-formulario', component: EditarFormularioComponent },
  { path: '', redirectTo: '/opciones', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
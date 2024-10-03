import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { OpcionesComponent } from './opciones/opciones.component';
import { CrearFormularioComponent } from './crear-formulario/crear-formulario.component';
import { ResponderComponent } from './responder/responder.component';
import { VisualizarRespuestaComponent } from './visualizar-respuesta/visualizar-respuesta.component';
import { EditarFormularioComponent } from './editar-formulario/editar-formulario.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'crear-usuario', component: CrearUsuarioComponent },
  { path: 'opciones', component: OpcionesComponent },
  { path: 'crear-formulario', component: CrearFormularioComponent},
  { path: 'responder', component: ResponderComponent},
  { path: 'visualizar-respuesta', component: VisualizarRespuestaComponent},
  { path: 'editar-formulario', component: EditarFormularioComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
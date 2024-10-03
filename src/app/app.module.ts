import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { OpcionesComponent } from './opciones/opciones.component';
import { ResponderComponent } from './responder/responder.component';
import { VisualizarRespuestaComponent } from './visualizar-respuesta/visualizar-respuesta.component';
import { CrearFormularioComponent } from './crear-formulario/crear-formulario.component';
import { PreguntaService } from './pregunta.service';
import { FormsModule } from '@angular/forms';
import { EditarFormularioComponent } from './editar-formulario/editar-formulario.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CrearUsuarioComponent,
    OpcionesComponent,
    ResponderComponent,
    VisualizarRespuestaComponent,
    CrearFormularioComponent,
    EditarFormularioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [    PreguntaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

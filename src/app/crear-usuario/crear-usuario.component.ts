import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
})
export class CrearUsuarioComponent {
  createUserForm: FormGroup;
  message: string | null = null;
  messageType: string = 'success';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.createUserForm = this.fb.group({
      usuario: ['', Validators.required],
      contraseña: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.createUserForm.valid) {
      const { usuario, contraseña } = this.createUserForm.value;
      this.usuarioService.crearUsuario(usuario, contraseña);
      this.message = 'Usuario creado exitosamente';
      this.messageType = 'success';

      this.createUserForm.reset();

      setTimeout(() => {
        this.message = null;
      }, 2000);

      this.router.navigate(['/crear-usuario']);
    } else {
      this.message = 'Por favor complete todos los campos';
      this.messageType = 'danger';

      setTimeout(() => {
        this.message = null;
      }, 1500);
    }
  }
}

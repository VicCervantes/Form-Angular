import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  message: string | null = null;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      usuario: ['', Validators.required],
      contraseña: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { usuario, contraseña } = this.loginForm.value;
      const success = this.usuarioService.verificarUsuario(usuario, contraseña);
      if (success) {
        this.router.navigate(['/opciones']); 
      } else {
        this.message = 'Usuario o contraseña incorrectos';

        setTimeout(() => {
          this.message = null;
        }, 1500);
      }
    }
  }
}

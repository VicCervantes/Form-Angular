import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarios: { usuario: string; contraseña: string }[] = [];
  private isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor() {}

  crearUsuario(usuario: string, contraseña: string) {
    this.usuarios.push({ usuario, contraseña });
    console.log(this.usuarios)
  }

  verificarUsuario(usuario: string, contraseña: string): boolean {
    const user = this.usuarios.find(u => u.usuario === usuario && u.contraseña === contraseña);
    if (user) {
      this.isLoggedIn.next(true);
      return true;
    }
    return false;
  }

  estaLogueado() {
    return this.isLoggedIn.asObservable();
  }
}

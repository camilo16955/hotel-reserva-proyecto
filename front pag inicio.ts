// user-management.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  usuarios: Usuario[] = [];
  userForm: FormGroup;
  modoEdicion = false;
  usuarioActual: Usuario | null = null;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      nombre: [''],
      correo: [''],
      rol: ['']
    });
  }

  ngOnInit(): void {
    this.usuarios = [
      { id: 1, nombre: 'Juan Pérez', correo: 'juan@correo.cl', rol: 'Administrador' },
      { id: 2, nombre: 'Ana Díaz', correo: 'ana@correo.cl', rol: 'Cliente' }
    ];
  }

  guardarUsuario() {
    if (this.modoEdicion && this.usuarioActual) {
      this.usuarioActual.nombre = this.userForm.value.nombre;
      this.usuarioActual.correo = this.userForm.value.correo;
      this.usuarioActual.rol = this.userForm.value.rol;
      this.modoEdicion = false;
      this.usuarioActual = null;
    } else {
      const nuevoUsuario: Usuario = {
        id: Date.now(),
        ...this.userForm.value
      };
      this.usuarios.push(nuevoUsuario);
    }
    this.userForm.reset();
  }

  editarUsuario(usuario: Usuario) {
    this.modoEdicion = true;
    this.usuarioActual = usuario;
    this.userForm.setValue({
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol
    });
  }

  eliminarUsuario(id: number) {
    this.usuarios = this.usuarios.filter(u => u.id !== id);
  }

  cancelarEdicion() {
    this.modoEdicion = false;
    this.usuarioActual = null;
    this.userForm.reset();
  }
}

// user-management.component.html
<div class="container">
  <h2>Administración de Usuarios</h2>
  <form [formGroup]="userForm" (ngSubmit)="guardarUsuario()">
    <input formControlName="nombre" placeholder="Nombre" required>
    <input formControlName="correo" placeholder="Correo" required>
    <input formControlName="rol" placeholder="Rol" required>
    <button type="submit">{{ modoEdicion ? 'Actualizar' : 'Crear' }}</button>
    <button type="button" *ngIf="modoEdicion" (click)="cancelarEdicion()">Cancelar</button>
  </form>

  <ul>
    <li *ngFor="let usuario of usuarios">
      {{ usuario.nombre }} - {{ usuario.correo }} - {{ usuario.rol }}
      <button (click)="editarUsuario(usuario)">Editar</button>
      <button (click)="eliminarUsuario(usuario.id)">Eliminar</button>
    </li>
  </ul>
</div>

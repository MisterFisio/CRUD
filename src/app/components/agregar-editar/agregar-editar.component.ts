import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InfoUsuario } from '../../interfaces/InfoUsuario';
import { CommonModule } from '@angular/common';
import { InfoComponent } from '../info/info.component';
import { InfoUsuarioService } from '../../services/info-usuario.service';

@Component({
  selector: 'app-agregar-editar',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './agregar-editar.component.html',
  styleUrl: './agregar-editar.component.scss',
})
export class AgregarEditarComponent {
  agregarForm: FormGroup;
  titulo = 'Agregar usuario';
  id = 0;
  infoUsuario: InfoUsuario | undefined;

  constructor(
    private fb: FormBuilder,
    private _infoUsuarioService: InfoUsuarioService,
    private router: Router,
    private aRoute: ActivatedRoute
  ) {
    this.agregarForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      edad: ['', Validators.required],
    });

    this.id = +this.aRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.editar();
  }

  editar() {
    if (this.id != 0) {
      this.titulo = 'Editar usuario';
      this._infoUsuarioService.getEditInfo(this.id).subscribe({
        next: (data) => {
          console.log(data);
          this.infoUsuario = data;
          this.agregarForm.patchValue({
            nombre: data.nombre,
            apellido: data.apellido,
            edad: data.edad,
          });
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  agregarEditar() {
    if (this.infoUsuario == undefined) {
      const info: InfoUsuario = {
        nombre: this.agregarForm.get('nombre')?.value,
        apellido: this.agregarForm.get('apellido')?.value,
        edad: this.agregarForm.get('edad')?.value,
        fechaCreacion: new Date(),
      };

      this._infoUsuarioService.saveInfo(info).subscribe({
        next: (data) => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.log(error);
        },
      });
    } else {
      const info: InfoUsuario = {
        id: this.infoUsuario.id,
        nombre: this.agregarForm.get('nombre')?.value,
        apellido: this.agregarForm.get('apellido')?.value,
        edad: this.agregarForm.get('edad')?.value,
        fechaCreacion: this.infoUsuario.fechaCreacion,
      };

      this._infoUsuarioService.editInfo(this.id, info).subscribe({
        next: (data) => {
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}

import { Component } from '@angular/core';
import { InfoUsuario } from '../../interfaces/InfoUsuario';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { InfoUsuarioService } from '../../services/info-usuario.service';


@Component({
  selector: 'app-info',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './info.component.html',
  styleUrl: './info.component.scss',
})
export class InfoComponent {
  listInfoUsuario: InfoUsuario[] = [];

  constructor(private _infoUsuarioService: InfoUsuarioService) {}

  ngOnInit() {
    this.getInfo();
  }

  getInfo() {
    this._infoUsuarioService.getInfo().subscribe({
      next: (data) => {
        console.log(data);
        this.listInfoUsuario = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  eliminar(id: any) {
    this._infoUsuarioService.deleteInfo(id).subscribe({
      next: (data) => {
        this.getInfo();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}

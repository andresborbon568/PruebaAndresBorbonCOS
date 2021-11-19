import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PruebaCosAndresBorbon';
  public codigoGenerado: number;
  public codigoIngresado: string;
  public inputActivo: boolean;
  public enPartida: boolean;

  constructor() {
    this.codigoGenerado = Math.floor(Math.random()*(100+400));
    this.codigoIngresado = '';
    this.inputActivo = false;
    this.enPartida = false;
  }

  showInputCodigo() {
    this.inputActivo = true;
  }

  ocultarBotones() {
    this.enPartida = true;
  }
}

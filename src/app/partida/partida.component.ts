import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router, UrlTree } from '@angular/router';

@Component({
  selector: 'app-partida',
  templateUrl: './partida.component.html',
  styleUrls: ['./partida.component.css']
})
export class PartidaComponent implements OnInit {

  public simboloJugador: string;
  public simboloOponente: string;
  public nombreJugador: string;
  public movimientosJugadorPrincipal: string[] = [];
  public movimientosJugadorPrincipalTexto: string = '';
  public movimientosOponente: string[] = [];
  public tipoDePartida = "";
  private url: any;
  private parametroPartidaNueva: string = "";
  private parametroPartidaExistente: string = "";
  public mensaje = '';
  public existeGanador: boolean = false;

  constructor(private activatedRoute: ActivatedRoute) {
    this.simboloJugador = "X";
    this.simboloOponente = "O";
    this.nombreJugador = '';
   }

  ngOnInit(): void {
    this.seleccionarTipoDePartida();
    this.verificarGanador();
  }

  seleccionarTipoDePartida() {
    this.activatedRoute.params.subscribe((params: Params) => {      
      this.url = params;
      this.parametroPartidaNueva = params.codigoN;
      this.parametroPartidaExistente = params.codigoA;
    });
    console.log('Partida nueva: ', this.parametroPartidaNueva);
    console.log('Partida existente: ', this.parametroPartidaExistente);
    console.log('Partida URL: ', this.url);
    if (this.parametroPartidaNueva != undefined) {
      this.tipoDePartida = "Nueva";
      return false;
    } else if (this.parametroPartidaExistente != undefined) {
      this.tipoDePartida = "Existente";
      return false;
    }
    return true;
  }

  registrarMovimiento(casilla: HTMLElement, numeroCasilla: number) {
    let verificadorMovimientoOponente = this.movimientosOponente.find(movimiento => movimiento == numeroCasilla.toString())
    let verificadorMovimientoJugadorPrincipal = this.movimientosJugadorPrincipal.find(movimiento => movimiento == numeroCasilla.toString())
    console.log('Movimientos verificado: ', verificadorMovimientoOponente);
    if (verificadorMovimientoOponente == undefined && verificadorMovimientoJugadorPrincipal == undefined) {
      this.movimientosJugadorPrincipal.push(numeroCasilla.toString());
      this.movimientosJugadorPrincipalTexto = this.movimientosJugadorPrincipal.toString();
      console.log('Movimientos P1: ', this.movimientosJugadorPrincipalTexto);
      this.verificarGanador();
    } else {
      this.mensaje = 'Ya se ha realizado ese movimiento.';
    }
  }

  verificarGanador() : void {
    let filtroMovimientoOponente = this.movimientosOponente.sort();
    let filtroMovimientoJugadorPrincipal = this.movimientosJugadorPrincipal.sort();
    //console.log('Movimientos verificado: ', filtroMovimientoOponente);
    //console.log('Movimientos verificado: ', filtroMovimientoJugadorPrincipal);
    const triquis = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7]
  ];

  for (let index = 0; index < 7; index++) {
    const condicion = triquis[index];
    //console.log('CONDICION: ', condicion);
    const a = filtroMovimientoJugadorPrincipal.find(x => x == [condicion[0]].toString());
    //console.log('CONDICION A: ', a);
    const b = filtroMovimientoJugadorPrincipal.find(x => x == [condicion[1]].toString());
    //console.log('CONDICION B: ', b);
    const c = filtroMovimientoJugadorPrincipal.find(x => x == [condicion[2]].toString());
    //console.log('CONDICION C: ', c);
    if (a == condicion[0].toString() && b == condicion[1].toString() && c == condicion[2].toString()) {
      this.existeGanador = true;
      alert('Ha ganado el jugador 1.');
      break;
    }

    const aOponent = filtroMovimientoOponente.find(x => x == [condicion[0]].toString());
    //console.log('CONDICION A: ', a);
    const bOponent = filtroMovimientoOponente.find(x => x == [condicion[1]].toString());
    //console.log('CONDICION B: ', b);
    const cOponent = filtroMovimientoOponente.find(x => x == [condicion[2]].toString());
    //console.log('CONDICION C: ', c);
    if (aOponent == condicion[0].toString() && bOponent == condicion[1].toString() && cOponent == condicion[2].toString()) {
      this.existeGanador = true;
      alert('Ha ganado el jugador 2.');
      break;
    }
  } 
}
}

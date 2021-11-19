import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PartidaComponent } from './partida/partida.component';

const routes: Routes = [
  //codigoN es el parametro de un codigo nuevo 
  {path: "PartidaNueva/:codigoN", component: PartidaComponent},
  //codigoN es el parametro de un codigo que ya fue creado por otro jugador 
  {path: "PartidaConectar/:codigoA", component: PartidaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

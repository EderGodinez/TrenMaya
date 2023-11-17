import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  template: `
    <div class="w-screen relative">
      <p-button label="Ir a reservar"(onClick)="GoReservations()" [style]="{'padding':'10px','background':'green'}" [classList]="'boton'"></p-button>
      <img src="assets/Mapa.png" alt="Mapa tren maya" class="w-full">
    </div>

    `,
  styleUrls: ['./MapPage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapPageComponent {
  constructor(private Router:Router){}
  GoReservations(){
    this.Router.navigateByUrl('TrenMaya/Reservations')
  }
}

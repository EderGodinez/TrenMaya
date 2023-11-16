import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.scss']
})
export class LayoutPageComponent {
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  ngOnInit() {
      this.items = [
          { label: 'Inicio', icon: 'pi pi-fw pi-home',routerLink:'Home' },
          { label: 'Mapa', icon: 'pi pi-map-marker',routerLink:'Map' },
          { label: 'Reservaciones', icon: 'pi pi-fw pi-calendar',routerLink:'Reservations' },
          { label: 'Iniciar sesion', icon: 'pi pi-user',routerLink:'Login' },
          { label: 'Crear cuenta', icon: 'pi pi-fw pi-cog',routerLink:'Register' }
      ];
      this.activeItem = this.items[0];
  }
  onActiveItemChange(event: MenuItem) {
      this.activeItem = event;
  }
}

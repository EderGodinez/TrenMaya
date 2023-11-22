import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
@Component({
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.scss']
})
export class LayoutPageComponent {
  items: MenuItem[] | undefined;
  activeItem: MenuItem | undefined;
  constructor(private AuthService:AuthService){
    const token=localStorage.getItem('token')??''
    if(token)
    this.validateToken(token)
    this.islog=token?true:false
    if (this.islog) {
     this.getUserInfo(token!)
    }
    else
    localStorage.setItem('Userid','1')

  }
  ngOnInit() {
      this.items = [
          { label: 'Inicio', icon: 'pi pi-fw pi-home',routerLink:'Home'},
          { label: 'Mapa', icon: 'pi pi-map-marker',routerLink:'Map' },
          { label: 'Reservaciones', icon: 'pi pi-fw pi-calendar',routerLink:'Reservations' },
          { label: 'Iniciar sesion', icon: 'pi pi-user',routerLink:'Login' },
          { label: 'Crear cuenta', icon: 'pi pi-fw pi-cog',routerLink:'Register' }
      ];
      if (this.islog) {
        this.items.splice(-2);
      }
      this.activeItem = this.items[0];
  }
  islog:boolean
  Username?:string
  onActiveItemChange(event: MenuItem) {
      this.activeItem = event;
  }
  getUserInfo(Token:string){
    this.AuthService.getUserInfoByToken(Token).subscribe((info)=>{
      this.Username=info.rest.userName.split(' ')[0]
      localStorage.setItem('UserState',info.rest.Estado.toString())
      localStorage.setItem('Useremail',info.rest.email)
      localStorage.setItem('Userid',info.rest.id.toString())
     })
  }
  validateToken(Token:string){
    this.AuthService.validateToken(Token).subscribe(
      response => {
        if (response.message==='Token inválido') {
          localStorage.removeItem('token')
        }
      });
  }
  logOut(){
    localStorage.clear()
    location.reload()
  }
}

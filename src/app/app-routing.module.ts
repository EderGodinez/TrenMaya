import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ReservationsLayoutComponent } from './pages/reservations-layout/reservations-layout.component';
import { ViewReservationsComponent } from './pages/view-reservations/view-reservations.component';
import { NewReservationPageComponent } from './pages/new-reservation-page/new-reservation-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MapPageComponent } from './pages/MapPage/MapPage.component';

const routes: Routes = [
{path:'TrenMaya',component:LayoutPageComponent,children:[
  {path:'Home',component:HomePageComponent},
  {path:'Map',component:MapPageComponent},
  {path:'Login',component:LoginPageComponent},
  {path:'Register',component:RegisterPageComponent},
  {path:'Reservations',component:ReservationsLayoutComponent,children:[
    {path:'View',component:ViewReservationsComponent},
    {path:'NewReservation',component:NewReservationPageComponent},
    {path:'**',redirectTo:'View'}
  ]},
  {path:'**',redirectTo:'Home'}
]},
{path:'**',redirectTo:'TrenMaya'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

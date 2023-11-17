import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ReservationsLayoutComponent } from './pages/reservations-layout/reservations-layout.component';
import { ViewReservationsComponent } from './pages/view-reservations/view-reservations.component';
import { NewReservationPageComponent } from './pages/new-reservation-page/new-reservation-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PrimeModule } from './prime/prime.module';
import { MapPageComponent } from './pages/MapPage/MapPage.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ReservationsLayoutComponent,
    ViewReservationsComponent,
    NewReservationPageComponent,
    HomePageComponent,
    MapPageComponent
  ],
  imports: [
    PrimeModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

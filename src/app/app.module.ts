import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidatorService } from './validators/validator.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReservationService } from './services/reserve.service';
import { AuthService } from './services/auth.service';
import { RegisterService } from './services/register.service';
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
    CommonModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PrimeModule,
    FormsModule,
  ],
  providers: [ValidatorService,ReservationService,AuthService,RegisterService],
  bootstrap: [AppComponent]
})
export class AppModule { }

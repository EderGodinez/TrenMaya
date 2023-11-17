import { NgModule } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
@NgModule({
  declarations: [],
  exports:[
    TabMenuModule,
    CarouselModule,
    CardModule,
    ButtonModule
  ]
})
export class PrimeModule { }

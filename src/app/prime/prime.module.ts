import { NgModule } from '@angular/core';
import { TabMenuModule } from 'primeng/tabmenu';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [],
  exports:[
    TabMenuModule,
    CarouselModule,
    CardModule,
    ButtonModule,
    PasswordModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    FileUploadModule,
    ToastModule
  ],

})
export class PrimeModule { }

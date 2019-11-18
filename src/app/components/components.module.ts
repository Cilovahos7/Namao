import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';
import { PopoverComponent } from './popover/popover.component';



@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    PopoverComponent
  ],
  entryComponents: [
    PopoverComponent
  ],
  exports: [
    HeaderComponent,
    MenuComponent,
    PopoverComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }

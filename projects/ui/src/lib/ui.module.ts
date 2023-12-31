import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { UiComponent } from './ui.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { AlertComponent } from './alert/alert.component';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    UiComponent,
    DropdownComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    MatIconModule,
    MatButtonModule, MatMenuModule
  ],
  exports: [
    UiComponent,
    DropdownComponent,
    AlertComponent
  ]
})
export class UiModule { }

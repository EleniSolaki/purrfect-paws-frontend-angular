import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MyServiceService } from '../my-service.service';
import { PrivateService } from './private.service';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';





@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule
  ],
  providers:[
    MyServiceService,
    PrivateService
  ]
})
export class PrivateModule { }

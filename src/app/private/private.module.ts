import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyServiceService } from '../my-service.service';
import { PrivateService } from './private.service';
import { FavoritesComponent } from './favorites/favorites.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';





@NgModule({
  declarations: [
    // FavoritesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule
   // FavoritesComponent,
    //RouterModule.forChild(routes)
  ],
  providers:[
    MyServiceService,
    PrivateService
  ]
})
export class PrivateModule { }

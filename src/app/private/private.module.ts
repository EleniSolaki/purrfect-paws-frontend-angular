import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyServiceService } from '../my-service.service';
import { IgxButtonModule } from 'igniteui-angular';
import { PrivateService } from './private.service';
import { FavoritesComponent } from './favorites/favorites.component';







@NgModule({
  declarations: [
    // FavoritesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
   // FavoritesComponent,
    IgxButtonModule
    //RouterModule.forChild(routes)
  ],
  providers:[
    MyServiceService,
    PrivateService
  ]
})
export class PrivateModule { }

import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MyServiceService } from '../my-service.service';
import { FavoritesComponent } from '../favorites/favorites.component';
import { IgxButtonModule } from 'igniteui-angular';
import { PrivateService } from './private.service';







@NgModule({
  declarations: [
    FavoritesComponent
  ],
  imports: [
    CommonModule,
    IgxButtonModule,
    //RouterModule.forChild(routes)
  ],
  providers:[
    MyServiceService,
    PrivateService
  ]
})
export class PrivateModule { }

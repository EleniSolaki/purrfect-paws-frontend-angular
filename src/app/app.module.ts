import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './private/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { PublicModule } from './public/public.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MyServiceService } from './my-service.service';
import { NgxPopper } from 'angular-popper';


import { SharedModule } from 'shared';
import { UiModule } from 'ui';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { 
	IgxButtonModule,
	IgxIconModule,
	IgxRippleModule
 } from "igniteui-angular";
import { PrivateService } from './private/private.service';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './private/favorites/favorites.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { StartInquiryComponent } from './private/start-inquiry/start-inquiry.component';




//I keep the new line
// const routes: Routes =[
//   // {
//   //   path: 'favorites', loadChildren:()=> import('./users/users.module').then((m)=> m.UsersModule)
//   // },
//   // {
//   //   path: 'home', loadChildren:()=> import('./products/products.module').then((m)=> m.ProductsModule)
//   // },
//     {
//     path: '', loadChildren:()=> import('./public/public.module').then((m)=> m.PublicModule)
//   },
//   // { path: 'home', component:HomeComponent },
//  // { path: '', component:WelcomeComponent },
//   // { path: '**', component:PageNotFoundComponent }
// ]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FavoritesComponent,
    PageNotFoundComponent,
    StartInquiryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    PublicModule,
    SharedModule,
    UiModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    IgxButtonModule,
    BrowserModule,
	  BrowserAnimationsModule,
    IgxIconModule,
	  IgxRippleModule,
    NgxPopper,
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [
    MyServiceService,
    PrivateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

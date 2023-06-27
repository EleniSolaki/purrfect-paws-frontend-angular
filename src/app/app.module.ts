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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrivateService } from './private/private.service';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './private/favorites/favorites.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StartInquiryComponent } from './private/start-inquiry/start-inquiry.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


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
    BrowserModule,
    BrowserAnimationsModule,
    NgxPopper,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatIconModule,
    MatMenuModule,
    MatSlideToggleModule
  ],
  providers: [
    MyServiceService,
    PrivateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

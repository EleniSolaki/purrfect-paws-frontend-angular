import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, Routes} from '@angular/router';
import { MyServiceService } from '../my-service.service';
import { tap } from 'rxjs';
import { HomeComponent } from '../private/home/home.component';
import { AppRoutingModule } from '../app-routing.module';
import { MatIconModule } from '@angular/material/icon';





// const routes: Routes = [
// {path: 'login', component: LoginComponent},
// {path: 'register', component: RegisterComponent},
//   {path: '', component: WelcomeComponent}
// ]

// const routes: Routes = [
//   { path: 'login', component: LoginComponent },
//   {path: 'register', component: RegisterComponent},
//   { path: '', redirectTo: '/welcome', pathMatch: 'full' }, // Redirect to WelcomeComponent
//   { path: 'welcome', component: WelcomeComponent }
// ];




@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatIconModule
   // RouterModule.forChild(routes)
  ],
  providers: [
    MyServiceService
  ]
})
export class PublicModule { }

import { NgModule, inject } from "@angular/core";
import {Router, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './private/home/home.component';
import { LoginComponent } from "./public/login/login.component";
import { RegisterComponent } from "./public/register/register.component";
import { WelcomeComponent } from "./public/welcome/welcome.component";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { tap } from 'rxjs';
import { MyServiceService } from "./my-service.service";
import { FavoritesComponent } from "./private/favorites/favorites.component";



const userGuard = () => {
  const router = inject(Router);
  const service = inject(MyServiceService);
  return service.isLoggedIn$.pipe(
    tap((isLoggedIn) => {
      console.log(isLoggedIn)
      if (!isLoggedIn) router.navigate(['/login']);
    })
  );
};



const routes: Routes = [
  // {path: '', loadChildren:()=> import('./public/public.module').then((m)=> m.PublicModule)
  // },
  {path: '', component: WelcomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
    {path :'home', component: HomeComponent},
        // {path :'home', component: HomeComponent, canActivate: [userGuard]},
// {path: 'favorites', component: FavoritesComponent, canActivate: [userGuard]},
    {path: 'favorites', component: FavoritesComponent},
  { path: '**', component:PageNotFoundComponent }


];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
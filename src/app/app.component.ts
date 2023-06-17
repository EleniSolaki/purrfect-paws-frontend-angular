import { Component } from '@angular/core';
import { menu } from 'shared';
import { UiService } from 'ui';
import { MyServiceService } from './my-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Animal Adoption Logo';
  menu = menu;
  
  isLoggedIn$ = this.service.isLoggedIn$;
  loggedInUsername$ = this.service.loggedInUsername$
  isLoading$ = this.service.isLoading$;

  alerts = this.uiService.alerts;

  constructor( private service: MyServiceService, private uiService: UiService){}

  onlogout(){
    this.service.logout()
  }

  onAlertDismiss(index: number){
    this.uiService.alertDismiss(index)
  }
}

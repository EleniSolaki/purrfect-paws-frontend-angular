import { Component } from '@angular/core';
import { menu } from 'shared';
import { UiService } from 'ui';
import { MyServiceService } from './my-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menu = menu;
  FormData: FormGroup;

  linkedinLink = 'https://www.linkedin.com/in/eleni-solaki/'
  githubLink= 'https://github.com/EleniSolaki';
    
  isLoggedIn$ = this.service.isLoggedIn$;
  loggedInUsername$ = this.service.loggedInUsername$
  isLoading$ = this.service.isLoading$;

  alerts = this.uiService.alerts;

constructor( private service: MyServiceService, private uiService: UiService, private builder: FormBuilder){
this.FormData = builder.group({
Fullname: new FormControl('', [Validators.required]),
Email: new FormControl('', [Validators.required, Validators.email]),
Message: new FormControl('', [Validators.required])
  })
}


onSubmit(FormData: any) {
this.service.contactEmail(FormData)
.subscribe({
  next:(response)=>{
      this.uiService.newAlert({
            type: 'success',
            text: 'Your email to us was sent successfully',
            autoDismiss: true,
          });
      this.FormData.reset();
    location.href = 'https://mailthis.to/confirm'
  },
  error:(error)=>{
    console.log(error)
  }
})}

  onlogout(){
    this.service.logout()
  }

  onAlertDismiss(index: number){
    this.uiService.alertDismiss(index)
  }
}

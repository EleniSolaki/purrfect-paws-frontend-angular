import { Component } from '@angular/core';
import { MyServiceService } from 'src/app/my-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginDTO } from 'shared';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private service: MyServiceService) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }


onSubmit(): void {
      const loginDTO: LoginDTO = {
      email: this.form.get('email')!.value,
      password: this.form.get('password')!.value
    };
  this.service.login(loginDTO);
}

}
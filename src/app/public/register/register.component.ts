import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MyServiceService } from '../../my-service.service';
import { RegisterDTO } from 'shared';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
form: FormGroup;



constructor(private formBuilder: FormBuilder, private service: MyServiceService) {
  this.form = this.formBuilder.group({
        firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })
}

save() {
    const registerDTO: RegisterDTO = {
      firstname: this.form.get('firstname')!.value,
      lastname: this.form.get('lastname')!.value,
      username: this.form.get('username')!.value,
      email: this.form.get('email')!.value,
      password: this.form.get('password')!.value
    };

    this.service.save(registerDTO);
    this.form.reset();
  }


}


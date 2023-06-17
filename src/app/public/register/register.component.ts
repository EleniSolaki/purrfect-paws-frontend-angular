import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyServiceService } from '../../my-service.service';
import { RegisterDTO, UserDTO } from 'shared';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
form: FormGroup;

constructor(private formBuilder: FormBuilder, private service: MyServiceService) {
  this.form = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
}

save() {
    const registerDTO: RegisterDTO = {
      username: this.form.get('username')!.value,
      email: this.form.get('email')!.value,
      password: this.form.get('password')!.value
    };

    this.service.save(registerDTO);
    this.form.reset();
  }
  // save()
  // {
  
  //   let bodyData = {
  //     "username" : this.username,
  //     "email" : this.email,
  //     "password" : this.password
  //   };
  //   this.http.post("http://localhost:8080/api/user/save",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
  //   {
  //       console.log(resultData);
  //       alert("User Registered Successfully");

  //   });
  // }

}

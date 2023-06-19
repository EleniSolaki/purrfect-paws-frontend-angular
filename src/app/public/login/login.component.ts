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


// loginUser(email: string, password: string): void {
//     this.service.login(email, password);
//   }


  // constructor(private router: Router,private http: HttpClient) {}


//   Login() {
//     console.log(this.email);
//     console.log(this.password);
//     let bodyData = {
//       email: this.email,
//       password: this.password,
//     };
//         this.http.post("http://localhost:8080/api/user/login", bodyData).subscribe(  (resultData: any) => {
//         console.log(resultData);
//         if (resultData.message == "Email does not exits")
//         {
      
//           alert("Email does not exits");
    
//         }
//         else if(resultData.message == "Login Success")
    
//         {
//           this.router.navigateByUrl('/home');
//         }
//         else
//         {
//           alert("Incorrect Email and Password.");
//         }

//       });
//     }

}
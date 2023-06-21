import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { UiService } from 'ui';
import { Router } from '@angular/router';
import { LoginDTO, RegisterDTO, UserDTO } from 'shared';
import { LoginMessage } from 'shared';


const LOGIN_API = "http://localhost:8080/api/user/login"
const REGISTER_API = "http://localhost:8080/api/user/save"


@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  private currentUser : UserDTO | undefined;

  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable();

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedInSubject.asObservable();

  private loggedInUsernameSubject = new BehaviorSubject<string>('');
  loggedInUsername$ = this.loggedInUsernameSubject.asObservable()

  private loggedInEmailSubject = new BehaviorSubject<string>('');
  loggedInEmail$ = this.loggedInEmailSubject.asObservable()

  constructor(
    private http: HttpClient,
    private alertService: UiService,
    private router: Router
  ) { }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  getCurrentUser(): UserDTO {
    return this.currentUser as UserDTO;
  }


  save(registerDTO: RegisterDTO) {
    this.http.post(`${REGISTER_API}`, registerDTO, { responseType: 'text' }).subscribe((resultData: any) => {
      alert("You have signed up successfully, we will redirect you to login");
      this.router.navigate(['/login']);
    });
  }

login(loginDTO: LoginDTO): void {
  this.setIsLoading(true);
  this.http.post<any>(`${LOGIN_API}`, loginDTO)
      .subscribe({
        next: (response) => {
          const loginMessage: LoginMessage = response;
          if (loginMessage.status) {
            this.loggedInSubject.next(true);
            this.alertService.newAlert({
              type: 'success',
              heading: `Welcome ${response.userUsername}`,
              text: 'Nice to see you!',
            });
            this.loggedInUsernameSubject.next(`${response.userUsername}`);
            this.loggedInEmailSubject.next(`${response.userEmail}`);
            this.currentUser = {
            id: response.userid,  
            username: response.userUsername,
            email: response.userEmail,
            
          };
            this.router.navigate(['/home']);
            this.setIsLoading(false);
          } else {
            this.alertService.newAlert({
              type: 'danger',
              heading: 'Authentication Error',
              text: 'An error occurred during login',
            });
          }
          this.setIsLoading(false);
        },
        error: (error) => {
          this.alertService.newAlert({
            type: 'danger',
            heading: 'Authentication Error',
            text: 'An error occurred during login.',
          });
          this.setIsLoading(false);
        }
      });
  }

  logout() {
    this.loggedInSubject.next(false);
    this.loggedInUsernameSubject.next('');
    this.router.navigate(['']);
  }

  setIsLoading(isLoading: boolean) {
    this.isLoadingSubject.next(isLoading);
  }
}

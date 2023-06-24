import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
import { UiService } from 'ui';
import { Router } from '@angular/router';
import { LoginDTO, RegisterDTO, UserDTO } from 'shared';
import { LoginMessage } from 'shared';


const LOGIN_API = "http://localhost:8080/api/user/login"
const REGISTER_API = "http://localhost:8080/api/user/save"
const CONTACT_MAIL = "https://mailthis.to/purrfectpaws"

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


  save(registerDTO: RegisterDTO): Observable<any> {
    return new Observable((observer) => {
      this.http.post(`${REGISTER_API}`, registerDTO, { responseType: 'text' })
        .subscribe({
          next: (resultData: any) => {
            this.setIsLoading(true);
              this.alertService.newAlert({
              type: 'success',
              heading: `You have signed up successfully!`,
              text: 'You are being redirected to the login page.',
              autoDismiss: true,
            });
            observer.next(resultData);
            observer.complete();
            setTimeout(() =>{
              this.router.navigate(['/login']), this.setIsLoading(false);           
            }, 3000);
            
          },
          error: (error: any) => {
            if (error.status === 400) {
              alert("There is already an account with this email. Please choose a different email.");
            } else {
              alert("An error occurred while signing up. Please try again later.");
            }
          }
        });
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
              heading: `Welcome ${response.userUsername}.`,
              text: 'Nice to see you!',
              autoDismiss: true,
            });
            this.loggedInUsernameSubject.next(`${response.userUsername}`);
            this.loggedInEmailSubject.next(`${response.userEmail}`);
            this.currentUser = {
            id: response.userid,  
            username: response.userUsername,
            email: response.userEmail,
            
          };
            this.router.navigate(['/home']);
          } else {
            this.alertService.newAlert({
              type: 'danger',
              heading: 'Authentication Error',
              text: 'An error occurred during login',
              autoDismiss: true,
            });
          }
        },
        error: (error) => {
          this.alertService.newAlert({
            type: 'danger',
            heading: 'Authentication Error',
            text: 'An error occurred during login.',
            autoDismiss: true,
          });
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

contactEmail(input: any) {
  return this.http.post(`${CONTACT_MAIL}`, input, { responseType: 'text' }).pipe(
    (map(
      (response) => {
        if (response) {
          return response;
        }
        throw new Error('No response received.');
      })
    ),
    catchError((error: any) => {
      return error;
    })
  );
}
}
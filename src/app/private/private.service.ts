import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, delay, firstValueFrom, map, tap, throwError } from 'rxjs';
import { Animal, ClaimInterestRequest, EmailDetails} from 'shared';
import { MyServiceService } from '../my-service.service';
import { UiService } from 'ui';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


const ANIMAL_API = 'http://localhost:8080/api/animal'
const FAVORITES_API = 'http://localhost:8080/api/favorite-animals'
const ANIMALS_GENDER_API = 'http://localhost:8080/api/animal/animalsgender'
const ANIMAS_BY_AGE_API = 'http://localhost:8080/api/animal/animalage'
const ANIMALS_BY_BREED_API = 'http://localhost:8080/api/animal/animalbreed'
const FORM_API = "http://localhost:8080/api/claim-interest" 
const EMAIL_API = "http://localhost:8080/api/mail/sendMail"

@Injectable({
  providedIn: 'root'
})
export class PrivateService {
  
private loggedInEmailSubject = new BehaviorSubject<string>('');
  loggedInEmail$ = this.loggedInEmailSubject.asObservable();

  private recipient: string ='';

  constructor(private http: HttpClient, private appService: MyServiceService, private alertService: UiService, private router: Router, private route: ActivatedRoute) { }

  setRecipient(recipient: string): void {
    this.recipient = recipient;
  }

getAllAnimals(): Observable<Animal[]> {
  return this.http.get<Animal[]>(`${ANIMAL_API}/animals`).pipe(
    delay(1000)
  );
}


getByGender(gender: string): Observable<Animal[]> {
  return this.http.get<Animal[]>(`${ANIMALS_GENDER_API}/${gender}`).pipe(
    delay(1000)
  );
}

getByAge(age: string): Observable<Animal[]> {
  return this.http.get<Animal[]>(`${ANIMAS_BY_AGE_API}/${age}`).pipe(
    delay(1000)
  );
}

getByBreed(breed: string): Observable<Animal[]> {
  return this.http.get<Animal[]>(`${ANIMALS_BY_BREED_API}/${breed}`).pipe(
    delay(1000)
  );
}

saveFavoriteAnimal(animalId: number, userId: number): Observable<any> {
  if (this.appService.isLoggedIn()) {
    userId = this.appService.getCurrentUser().id;
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('animalId', animalId.toString());

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post<any>(`${FAVORITES_API}`, null, { headers, params }).pipe(
      map(response => {
        this.alertService.newAlert({
          type: 'success',
          text: 'Cat saved successfully',
          autoDismiss: true,
        });
        return response.data;
      }),
      catchError((error) => {
        if (error.status === 403) {
          this.alertService.newAlert({
            type: 'warning',
            text: 'This cat is already saved',
            autoDismiss: true,
          });
        }
        return throwError(() => error);
      })
    );
  } else {
    this.alertService.newAlert({
      type: 'danger',
      text: 'You must be logged in to save favorite animals.',
      autoDismiss: true,
    });
    return throwError(() => new Error('Error saving favorite animals. Please try again.')) as Observable<any>;
  }
}

getAllFavoriteAnimals(): Observable<Animal[]> {
    const userId = this.appService.getCurrentUser()?.id;
    if (!userId) {
      return throwError(() => new Error('User is not available.')) as Observable<Animal[]>;
    }

    return this.http.get<Animal[]>(`${FAVORITES_API}/${userId}`).pipe(
      catchError((error) => {
        return throwError(() => new Error('Error fetching favorite animals. Please try again.')) as Observable<Animal[]>;
      })
      );
  }


deleteFromFavorites(userId:number, animalId:number){
  userId = this.appService.getCurrentUser()?.id;
      return this.http.delete<any>(`${FAVORITES_API}/${userId}/animals/${animalId}`).pipe(
    tap(() => {
      this.alertService.newAlert({
        type: 'success',
        text: 'The cat has been successfully deleted from favorites.',
        autoDismiss: true,
      });
    }),
    catchError((error) => {
      return throwError(() => new Error('Error deleting favorite animal. Please try again.'));
    })
  );
}


inquireAnAnimal(animalId:number){
  this.router.navigate(['start-inquiry'],  { queryParams: { pet: `${animalId}` } });
}


getAnimalNameById(id: number): Observable<{ name: string }> {
  return this.http.get<{ name: string }>(`${ANIMAL_API}/${id}/name`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Unknown error occurred';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(() => new Error(errorMessage));
      })
    );
}


checkClaimInterestExists(userId: number, animalId: number): Promise<boolean | undefined> {
  return firstValueFrom(
    this.http
      .get<boolean>(`${FORM_API}/exists`, { params: { userId: userId.toString(), animalId: animalId.toString() } })
  ).catch((error) => {
    console.error('Error checking inquiry existence:', error);
    return undefined;
  });
}
async inquiryExists(userId: number, animalId: number): Promise<boolean> {
  try {
    const claimInterestExists = await this.checkClaimInterestExists(userId, animalId);
    if (claimInterestExists) {
      this.alertService.newAlert({
        type: 'danger',
        text: 'You have already claimed interest for this cat.',
        autoDismiss: true,
      });
    }
    return claimInterestExists ?? false;
  } catch (error) {
    console.error('Error checking inquiry existence:', error);
    return false; 
  }
}

adoptionInquiry(claimInterest: ClaimInterestRequest): Observable<void> {
  return this.http.post<void>(`${FORM_API}`, claimInterest).pipe(
    tap(() => {
      this.alertService.newAlert({
        type: 'success',
        text: 'We have received your interest in adopting this Purrfect Paw. Check your email.',
        autoDismiss: true,
      });
      //this.sendEmail()
      this.router.navigate(['favorites']);
    }),
    catchError((error) => {
      this.alertService.newAlert({
        type: 'danger',
        text: 'Error submitting your claim of interest. Inquiry for this cat already submited.',
        autoDismiss: true,
      });
      return throwError(() => error);
    })
  );
}

sendEmail(): void {
const animalID = this.route.snapshot.queryParams['pet'];

    this.getAnimalNameById(animalID).subscribe(
      (response) => {
        const animalName = response.name;

  const emailDetails: EmailDetails = {
    recipient: this.recipient,
    msgBody: `Dear cat lover.

We are happy to inform you that we have received your recent inquiry regarding the adoption of ${animalName}. We appreciate your interest in providing a forever home. We understand the excitement and anticipation that comes with adopting a Purrfect Paw, and we assure you that we will be in touch with you soon to discuss the next steps. 
    
If you have any additional questions or concerns in the meantime, please do not hesitate to reach out to us. We are more than happy to assist you and provide any necessary information.
    
Thank you for your patience and understanding. 
    
Best regards,
    
Purrfect Paws team`,
    subject: `Inquiry for Adoption of ${animalName} Received`,
  };

this.http.post(`${EMAIL_API}`, emailDetails, { responseType: 'text' }).subscribe({
    next: () => {
      console.log("Email sent successfully");      
    },
    error: (error) => {
      console.error("Error sending email", error);
          },
          });
      },
    );
}


}







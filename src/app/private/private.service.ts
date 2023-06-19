import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, tap, throwError } from 'rxjs';
import { Animal, ClaimInterestRequest, FavoriteAnimal, UserAnimalData, UserDTO } from 'shared';
import { MyServiceService } from '../my-service.service';
import { UiService } from 'ui';
import { Router } from '@angular/router';

const ANIMAL_API = 'http://localhost:8080/api'
const FAVORITES_API = 'http://localhost:8080/api/favorite-animals'
const ANIMALS_GENDER_API = 'http://localhost:8080/api/animalsgender'
const ANIMAS_BY_AGE_API = 'http://localhost:8080/api/animalage'
const ANIMALS_BY_BREED_API = 'http://localhost:8080/api/animalbreed'
const FORM_API = "http://localhost:8080/api/claim-interest" 



@Injectable({
  providedIn: 'root'
})
export class PrivateService {
  

  constructor(private http: HttpClient, private appService: MyServiceService, private alertService: UiService, private router: Router) { }

  

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
    console.log("userid save favorites:", userId);
    console.log("animalid save favorites:", animalId);
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
        });
        return response.data;
      }),
      catchError((error) => {
        if (error.status === 403) {
          console.log('Animal already exists.');
          this.alertService.newAlert({
            type: 'warning',
            text: 'This cat is already saved',
          });
        }
        return throwError(() => error);
      })
    );
  } else {
    this.alertService.newAlert({
      type: 'danger',
      text: 'You must be logged in to save favorite animals.',
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
        console.error('Error fetching favorite animals:', error);
        return throwError(() => new Error('Error fetching favorite animals. Please try again.')) as Observable<Animal[]>;
      })
      );
  }


deleteFromFavorites(userId:number, animalId:number){
  userId = this.appService.getCurrentUser()?.id;
      return this.http.delete<any>(`${FAVORITES_API}/${userId}/animals/${animalId}`).pipe(
      catchError((error) => {
        console.error('Error deleting favorite animals:', error);
        return throwError(() => new Error('Error deleting favorite animals. Please try again.')) 
      })
      );
}  


inquireAnAnimal(animalId:number){
  this.router.navigate(['start-inquiry'],  { queryParams: { pet: `${animalId}` } });
}

initiateForm(userId: number, animalId: number): Observable<UserAnimalData[]>{
  return this.http.get<UserAnimalData[]>(`${FORM_API}?userId=${userId}&animalId=${animalId}`).pipe(
    tap(response => {
      console.log('Response:', response);  })
  );
}


adoptionInquiry(claimInterest: ClaimInterestRequest): Observable<void> {
  return this.http.post<void>(`${FORM_API}`, claimInterest).pipe(
    tap(() => {
      this.alertService.newAlert({
        type: 'success',
        text: 'We have received your interest in adopting this Purrfect Paw. We will contact you soon.',
      });
    }),
    catchError((error) => {
      console.error(error, 'error in inquiry');
      this.alertService.newAlert({
        type: 'danger',
        text: 'Error submitting your claim of interest. Please try again.',
      });
      return throwError(() => error);
    })
  );
}



}






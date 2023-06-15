import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, throwError } from 'rxjs';
import { Animal, UserDTO } from 'shared';
import { MyServiceService } from '../my-service.service';

const ANIMAL_API = 'http://localhost:8080/api'
const FAVORITES_API = 'http://localhost:8080/api/favorite-animals'



@Injectable({
  providedIn: 'root'
})
export class PrivateService {
  private user : UserDTO | null = null;

  animal?: Animal;

  constructor(private http: HttpClient, private appService: MyServiceService) { }

  private SAVE_TO_FAVS_API = 'http://localhost:8080/api/favorite-animals'



getAllAnimals(): Observable<Animal[]> {
  return this.http.get<Animal[]>(`${ANIMAL_API}/animals`).pipe(
    delay(1000)
  );
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


//  saveFavoriteAnimal(animalId: number): Observable<any> {
//     if (this.appService.isLoggedIn()) {
//       const userId = this.user.id;
//       const animalId = this.animal.id;
      
//       const body = new HttpParams()
//         .set('userId', userId.toString())
//         .set('animalId', animalId.toString());

//       const headers = new HttpHeaders()
//         .set('Content-Type', 'application/x-www-form-urlencoded');

//       return this.http.post<any>(this.apiUrl, body.toString(), { headers });
//     }
//     // Handle case when user is not logged in
//     return Observable.throw('User is not logged in.');
//   }

}

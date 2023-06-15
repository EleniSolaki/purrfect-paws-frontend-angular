import { Component, OnDestroy, OnInit } from '@angular/core';
import{ Subscription } from 'rxjs'
//import {orderBy} from 'lodash-es'
import { MyServiceService } from 'src/app/my-service.service';
import { PrivateService } from '../private.service';
import { Animal, UserDTO } from 'shared';
import { Router } from '@angular/router';
import { IgxButtonModule } from 'igniteui-angular';
import {orderBy} from 'lodash-es'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{

  //user :UserDTO;
  constructor(private service: PrivateService,  private appService: MyServiceService, private router: Router){}

  loading = false;
  animals : Animal[] = [];
  subscription: Subscription | undefined

ageSortType: 'asc' | 'desc' = 'asc';
breedSortType: 'asc' | 'desc' = 'asc';


ngOnInit(): void {
  console.log('Starting "findAllAnimals" API call');
  // this.loading = true;
  this.appService.setIsLoading(true);
  this.subscription = this.service.getAllAnimals().subscribe({
    next: (animalList: Animal[]) => {
      this.animals = animalList;
      console.log(this.animals);
    },
    error: (error) => {
      // this.loading = false; 
      this.appService.setIsLoading(false);
      console.log(error);
    },
    complete: () => {
      // this.loading = false; 
      this.appService.setIsLoading(false);
      console.log("API call completed");
    }
  });
}
addToFavorites(): void {}
  // addToFavorites(): void {
  //   const userId = getCurrentUserId(); // Replace with your logic to get the current user ID
  //   const animalId = getAnimalId(); // Replace with your logic to get the animal ID

  //   this.service.saveFavoriteAnimal(userId, animalId)
  //     .subscribe(
  //       response => {
  //         console.log('Animal added to favorites successfully:', response);
  //         // Handle success
  //       },
  //       error => {
  //         console.error('Failed to add animal to favorites:', error);
  //         // Handle error
  //       }
  //     )

//isPressed = false;

  // togglePress() {
  //   this.isPressed = !this.isPressed;
  // }



  ngOnDestroy(): void {
  this.subscription?.unsubscribe();
}




toggleSort(key:string){
  switch (key) {
    case 'age':
      this.ageSortType = this.ageSortType === 'asc' ? 'desc' : 'asc';
      this.animals = orderBy(this.animals, [key], [this.ageSortType])
      break;
      case 'breed':
      this.breedSortType = this.breedSortType === 'asc' ? 'desc' : 'asc';
      this.animals = orderBy(this.animals, [key], [this.breedSortType])
      break;  
      default:
      break;
  }
}



  
}




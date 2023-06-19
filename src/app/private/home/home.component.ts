import { Component, OnDestroy, OnInit } from '@angular/core';
import{ Subscription } from 'rxjs'
import { MyServiceService } from 'src/app/my-service.service';
import { PrivateService } from '../private.service';
import { Animal } from 'shared';
import { Router } from '@angular/router';
import {orderBy} from 'lodash-es'


enum AgeEnum {
  TwoYearsOld = '2 years old',
  ThreeYearsOld = '3 years old',
  NineYearsOld = '9 years old'
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{

constructor(private service: PrivateService,  private appService: MyServiceService, private router: Router, ){}

animals : Animal[] = [];
subscription: Subscription | undefined


ageSortType: 'asc' | 'desc' = 'asc';
breedSortType: 'asc' | 'desc' = 'asc';


ngOnInit(): void {
  this.getData();
}

getData(): void {
    console.log('Starting "findAllAnimals" API call');
  this.appService.setIsLoading(true);
  this.subscription = this.service.getAllAnimals().subscribe({
    next: (animalList: Animal[]) => {
      this.animals = animalList;
      console.log(this.animals);
    },
    error: (error) => {
      this.appService.setIsLoading(false);
      console.log(error);
    },
    complete: () => {
      this.appService.setIsLoading(false);
      console.log("API call completed");
    }
  });
}


addToFavorites(animal:number): void {
    const userId = this.appService.getCurrentUser().id; 

    console.log("component, userid, animalid",userId, animal);

    this.service.saveFavoriteAnimal(animal, userId).subscribe({
    next: (animalList: Animal[]) => {
      this.animals = animalList;
      console.log("animals component",this.animals);
    },
    error: (error) => {
      this.appService.setIsLoading(false);
      console.log("Error adding to favorites",error);
    },
    complete: () => {
      this.appService.setIsLoading(false);
      console.log("API call completed");
      this.getData();
    }
  });

}

handleGenderSelection(gender: string) {
  const trimmedGender = gender.trim();
  console.log('Selected gender:', trimmedGender);
  this.appService.setIsLoading(true); 
  this.subscription = this.service.getByGender(trimmedGender).subscribe({
    next: (animalList: Animal[]) => {
      this.animals = animalList;
      console.log(this.animals);
    },
    error: (error) => {
      console.log(error);
    },
    complete: () => {
      this.appService.setIsLoading(false); 
      console.log("API call completed");
    }
  });
}

handleAgeSelection(age: string) {
  const trimmedAge = age.trim();
  console.log('Selected age:', trimmedAge);
  this.appService.setIsLoading(true); 

  this.subscription = this.service.getByAge(trimmedAge).subscribe({
    next: (animalList: Animal[]) => {
      this.animals = animalList;
      console.log(this.animals);
    },
    error: (error) => {
      console.log(error);
    },
    complete: () => {
      this.appService.setIsLoading(false); 
      console.log("API call completed");
    }
  });
}

handleBreedSelection(breed: string) {
  console.log('Selected breed:', breed);
  this.appService.setIsLoading(true); 

  this.subscription = this.service.getByBreed(breed).subscribe({
    next: (animalList: Animal[]) => {
      this.animals = animalList;
      console.log(this.animals);
    },
    error: (error) => {
      console.log(error);
    },
    complete: () => {
      this.appService.setIsLoading(false); 
      console.log("API call completed");
    }
  });
}


  ngOnDestroy(): void {
  this.subscription?.unsubscribe();
}




// toggleSort(key:string){
//   switch (key) {
//     case 'age':
//       this.ageSortType = this.ageSortType === 'asc' ? 'desc' : 'asc';
//       this.animals = orderBy(this.animals, [key], [this.ageSortType])
//       break;
//       case 'breed':
//       this.breedSortType = this.breedSortType === 'asc' ? 'desc' : 'asc';
//       this.animals = orderBy(this.animals, [key], [this.breedSortType])
//       break;  
//       default:
//       break;
//   }
// }

toggleSort(key: string) {
  switch (key) {
    case 'age':
      this.ageSortType = this.ageSortType === 'asc' ? 'desc' : 'asc';
      this.animals = orderBy(this.animals, [(animal: any) => {
        switch (animal.age) {
          case AgeEnum.TwoYearsOld:
            return 2;
          case AgeEnum.ThreeYearsOld:
            return 3;
          case AgeEnum.NineYearsOld:
            return 9;
          default:
            return 0;
        }
      }], [this.ageSortType]);
      break;
    case 'breed':
      this.breedSortType = this.breedSortType === 'asc' ? 'desc' : 'asc';
      this.animals = orderBy(this.animals, [key], [this.breedSortType]);
      break;
    default:
      break;
  }
}




  
}




import { Component, OnDestroy, OnInit } from '@angular/core';
import{ Subscription } from 'rxjs'
import { MyServiceService } from 'src/app/my-service.service';
import { PrivateService } from '../private.service';
import { Animal } from 'shared';
import {orderBy} from 'lodash-es'


enum AgeEnum {
  OneYearsOld = '1 years old',
  TwoYearsOld = '2 years old',
  ThreeYearsOld = '3 years old',
  SevenYearsOld = '7 years old',
  NineYearsOld = '9 years old',
  ThirteenYearsOld = '13 years old',
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{

constructor(private service: PrivateService,  private appService: MyServiceService){}

animals : Animal[] = [];
subscription: Subscription | undefined


ageSortType: 'asc' | 'desc' = 'asc';
breedSortType: 'asc' | 'desc' = 'asc';


ngOnInit(): void {
  this.getData();
}

getData(): void {
  this.appService.setIsLoading(true);
  this.subscription = this.service.getAllAnimals().subscribe({
    next: (animalList: Animal[]) => {
      this.animals = animalList;
    },
    error: (error) => {
      this.appService.setIsLoading(false);
      console.log(error);
    },
    complete: () => {
      this.appService.setIsLoading(false);
    }
  });
}

addToFavorites(animal:number): void {
    const userId = this.appService.getCurrentUser().id; 

    this.service.saveFavoriteAnimal(animal, userId).subscribe({
    next: (animalList: Animal[]) => {
      this.animals = animalList;
    },
    error: (error) => {
      this.appService.setIsLoading(false);
      console.log("Error adding to favorites",error);
    },
    complete: () => {
      this.appService.setIsLoading(false);
      this.getData();
    }
  });

}

handleGenderSelection(gender: string) {
  const trimmedGender = gender.trim();
  this.appService.setIsLoading(true); 
  this.subscription = this.service.getByGender(trimmedGender).subscribe({
    next: (animalList: Animal[]) => {
      this.animals = animalList;
    },
    error: (error) => {
      console.log(error);
    },
    complete: () => {
      this.appService.setIsLoading(false); 
    }
  });
}

handleAgeSelection(age: string) {
  this.appService.setIsLoading(true); 

  this.subscription = this.service.getByAge(age).subscribe({
    next: (animalList: Animal[]) => {
      this.animals = animalList;
    },
    error: (error) => {
      console.log(error);
    },
    complete: () => {
      this.appService.setIsLoading(false); 
    }
  });
}

handleBreedSelection(breed: string) {
  this.appService.setIsLoading(true); 

  this.subscription = this.service.getByBreed(breed).subscribe({
    next: (animalList: Animal[]) => {
      this.animals = animalList;
    },
    error: (error) => {
      console.log(error);
    },
    complete: () => {
      this.appService.setIsLoading(false); 
    }
  });
}

ngOnDestroy(): void {
  this.subscription?.unsubscribe();
}

toggleSort(key: string) {
  switch (key) {
    case 'age':
      this.ageSortType = this.ageSortType === 'asc' ? 'desc' : 'asc';
      this.animals = orderBy(this.animals, [(animal: any) => {
        switch (animal.age) {
          case AgeEnum.OneYearsOld:
            return 1;
          case AgeEnum.TwoYearsOld:
            return 2;
          case AgeEnum.ThreeYearsOld:
            return 3;
          case AgeEnum.SevenYearsOld:
            return 7;
          case AgeEnum.NineYearsOld:
            return 9;
          case AgeEnum.ThirteenYearsOld:
            return 13;
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




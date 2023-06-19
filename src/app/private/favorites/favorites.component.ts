import { Component, OnInit } from '@angular/core';
import { PrivateService } from '../private.service';
import { MyServiceService } from '../../my-service.service';
import { Router } from '@angular/router';
import { Animal, FavoriteAnimal } from 'shared';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

    constructor(private service: PrivateService,  private appService: MyServiceService, private router: Router){}

  favoriteAnimals : Animal[] = [];;
  subscription: Subscription | undefined



  ngOnInit(): void {
    this.getData();
}

getData(): void {
    console.log('Starting "findAllFavoriteAnimals" API call');
  this.appService.setIsLoading(true);
  this.subscription = this.service.getAllFavoriteAnimals().subscribe({
  next: (response: any) => {
      this.favoriteAnimals = response;
      console.log("component after subscribe", this.favoriteAnimals);
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

deleteFromFavorites(animalId: number): void {
  const userId = this.appService.getCurrentUser().id;

  console.log("component, userid, animalid", userId, animalId);

  this.service.deleteFromFavorites(userId, animalId).subscribe({
      next: () => {
      console.log("Favorite animal removed successfully");
      // Additional actions or updates after successful deletion can be placed here
    },
    error: (error: HttpErrorResponse) => {
      console.error('Error deleting favorite animals:', error);
    },
        complete: () => {
          this.getData();
      console.log("API call completed");
    }
  });
}


inquireTheAnimal(animalId:number){
this.service.inquireAnAnimal(animalId)
}

}

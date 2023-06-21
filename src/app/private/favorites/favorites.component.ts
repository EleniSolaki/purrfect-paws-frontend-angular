import { Component, OnInit } from '@angular/core';
import { PrivateService } from '../private.service';
import { MyServiceService } from '../../my-service.service';
import { Animal } from 'shared';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  constructor(private service: PrivateService,  private appService: MyServiceService){}

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

deleteFromFavorites(animalId: number): void {
  const userId = this.appService.getCurrentUser().id;

  this.service.deleteFromFavorites(userId, animalId).subscribe({
      next: () => {
      console.log("Cat removed successfully from favorites");
    },
    error: (error: HttpErrorResponse) => {
      console.error('Error deleting favorite animals:', error);
    },
        complete: () => {
          this.getData();
    }
  });
}


inquireTheAnimal(animalId:number){
this.service.inquireAnAnimal(animalId)
}
}

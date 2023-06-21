import { Component, Inject, OnInit } from '@angular/core';
import { PrivateService } from '../private.service';
import { MyServiceService } from '../../my-service.service';
import { Animal } from 'shared';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UiService } from 'ui';



@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  constructor(private service: PrivateService,  private appService: MyServiceService, private alertService: UiService){}

  favoriteAnimals : Animal[] = [];;
  subscription: Subscription | undefined


ngOnInit(): void {
    this.getData();
}

getData(): void {
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



async inquireTheAnimal(animalId: number) {
  const userId = this.appService.getCurrentUser().id;

  try {
    const claimInterestExists = await this.service.checkClaimInterestExists(userId, animalId);
    if (claimInterestExists) {
      console.log('Inquiry already exists');
        this.alertService.newAlert({
        type: 'danger',
        text: 'You have already claimed interest for this cat.',
        autoDismiss: true,
      });
    } else {
      this.service.inquireAnAnimal(animalId);
    }
  } catch (error) {
    console.error('Error checking inquiry existence:', error);
  }
}
}

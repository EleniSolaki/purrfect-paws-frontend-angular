import { Component } from '@angular/core';
import { PrivateService } from '../private/private.service';
import { MyServiceService } from '../my-service.service';
import { Router } from '@angular/router';
import { Animal } from 'shared';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {

    constructor(private service: PrivateService,  private appService: MyServiceService, private router: Router){}

  loading = false;
  animals : Animal[] = [];
  subscription: Subscription | undefined



  ngOnInit(): void {
  console.log('Starting "findAllFavoriteAnimals" API call');
  // this.loading = true;
  this.appService.setIsLoading(true);
  this.subscription = this.service.getAllFavoriteAnimals().subscribe({
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

}

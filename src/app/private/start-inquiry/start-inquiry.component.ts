import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrivateService } from '../private.service';
import { MyServiceService } from 'src/app/my-service.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { UserAnimalData} from 'shared';



@Component({
  selector: 'start-inquiry',
  templateUrl: './start-inquiry.component.html',
  styleUrls: ['./start-inquiry.component.css']
})
export class StartInquiryComponent implements OnInit {

    constructor(private service: PrivateService,  private appService: MyServiceService, private router: Router, private route: ActivatedRoute){}

userId = this.appService.getCurrentUser().id;
animalId: number | undefined;

userEmail$!: Observable<string | undefined>;
animalName$!: Observable<string | undefined>;

// userId: number | undefined;
//   animalId: number | undefined;
//   userEmail: string | undefined;
//   animalName: string | undefined;

// userEmailAndAnimalName$: Observable<UserAnimalData[]>;

ngOnInit(): void {}
// this.route.queryParams.pipe(
//       switchMap(params => {
//         this.animalId = +params['pet'];
//         this.userId = this.appService.getCurrentUser().id;

      
//   this.userEmailAndAnimalName$ = this.service.initiateForm(this.userId, this.animalId);}))
// }

// ngOnInit(): void {
//     console.log(this.userId)
//     this.route.queryParams
//       .subscribe(params => {
//         console.log(params);
//         this.animalId = +params['pet']; 
//         console.log(this.animalId)
//         this.getUserEmailAndAnimalName(this.userId, this.animalId);
//       }
//       );
//     }


// ngOnInit(): void {
//     this.route.queryParams.pipe(
//       switchMap(params => {
//         this.animalId = +params['pet'];
//         this.userId = this.appService.getCurrentUser().id;

//         return this.service.initiateForm(this.userId, this.animalId);
//       })
//     ).subscribe(
//       (response: UserAnimalData[]) => {
//         if (response.length > 0) {
//           this.userEmail = response[0].email;
//           this.animalName = response[0].name;
//           console.log('User Email:', this.userEmail);
//           console.log('Animal Name:', this.animalName);
//         } else {
//           console.log('No data found.');
//         }
//       },
//       (error: any) => {
//         console.error('Error:', error);
//       }
//     );}

// ngAfterViewInit(): void {
//   this.getUserEmailAndAnimalName(this.userId, this.animalId);
// }


// getUserEmailAndAnimalName(userId: number, animalId: number): void {
//   const result$ = this.service.initiateForm(userId, animalId);
//   console.log("result obs:",result$)
//   this.userEmail$ = result$.pipe(map(result => result[0]?.email));
//   this.animalName$ = result$.pipe(map(result => result[0]?.name));
//   console.log('User Email:', this.userEmail$);
//   console.log('Animal Name:', this.animalName$);
// }



// getUserEmailAndAnimalName(userId: number, animalId: number):  void {
//     this.service.initiateForm(userId, animalId)
//       .subscribe({
//   next: (result: UserAnimalData[]) => {
//     if (result.length > 0) {
//       this.userEmail = result[0]?.email;
//       this.animalName = result[0]?.name;
//       console.log('User Email:', this.userEmail);
//       console.log('Animal Name:', this.animalName);
//     } else {
//       console.log('No data found.');
//     }
//   },
//   error: (error: any) => {
//     console.error('Error:', error);
//   }
// });
// }

}

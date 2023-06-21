import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrivateService } from '../private.service';
import { MyServiceService } from 'src/app/my-service.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, of, throwError } from 'rxjs';
import { ClaimInterestRequest} from 'shared';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'start-inquiry',
  templateUrl: './start-inquiry.component.html',
  styleUrls: ['./start-inquiry.component.css']
})
export class StartInquiryComponent implements OnInit {
form: FormGroup;
animalId: number | undefined;
userId: number | undefined;
animalName: string | undefined;

comments = new FormControl('', Validators.required);
otherpets= new FormControl(false);
maxCharacters = 530;

loggedInEmail$ = this.appService.loggedInEmail$
isLoggedIn$ = this.appService.isLoggedIn$


private selectedAnimalSubject = new BehaviorSubject<string>('');
selectedAnimal$ = this.selectedAnimalSubject.asObservable()

constructor(private service: PrivateService, private appService: MyServiceService, private route: ActivatedRoute, private fb: FormBuilder) {
  this.form = this.fb.group({
    otherpets: this.otherpets,
    comments: this.comments 
  });
}

animalName$: Observable<string> = of('');


ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    console.log(params, "oninit");
    this.animalId = +params['pet'];
    this.userId = this.appService.getCurrentUser().id;

    this.animalName$ = this.retrieveAnimalName(this.animalId);
  });
}

retrieveAnimalName(id: number): Observable<string> {
  return this.service.getAnimalNameById(id)
    .pipe(
      map(response => response.name),
      catchError((error: any) => {
        console.error(error);
        return throwError(() => new Error('Error getting animal name'));
      })
    );
}


onSubmit(): void {
    const otherPetsAtHome: boolean = this.form.get('otherpets')!.value;
    const comments: string = this.form.get('comments')!.value;

    const claimInterestRequest: ClaimInterestRequest = {
      user: { id: this.userId ?? 0 },
      animal: { id: this.animalId ?? 0},
      comments: comments,
      otherPetsAtHome: otherPetsAtHome
    };

    this.service.adoptionInquiry(claimInterestRequest).subscribe({
      next: () => {
        console.log("success in inquiry");
      },
      error: error => {
        console.error(error,"error in inquiry");
      }
    });
  }

updateCharacterCount(): void {
  const comments = this.comments.value || '';
  if (comments.length > this.maxCharacters) {
    this.comments.setValue(comments.slice(0, this.maxCharacters));
  }
}

}
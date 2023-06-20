import { Component } from '@angular/core';
import { SlideInterface } from 'shared';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

    slides: SlideInterface[] = [
    { url: 'https://source.unsplash.com/iPsOfXA79U4/800x500', title: 'cat1' },
    { url: 'https://source.unsplash.com/9InoCDfQu1w/800x500', title: 'cat2' },
    { url: 'https://source.unsplash.com/P7Siasw9aN4/800x500', title: 'cat3' },
    { url: 'https://source.unsplash.com/FZdsNiYklQ8/800x500', title: 'cat4' },
    { url: 'https://source.unsplash.com/0przFioBl74/800x500', title: 'cat5' },
  ];
  


}

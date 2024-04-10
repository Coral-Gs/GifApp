import { Component } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {

  constructor (private gifsSErvice: GifsService) {}

  get gifs(): Gif[] {
    return this.gifsSErvice.gifList;
  }
}

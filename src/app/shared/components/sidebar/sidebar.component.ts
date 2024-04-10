import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';
import { Gif } from '../../../gifs/interfaces/gifs.interfaces';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  
  constructor(private gifsService: GifsService) {}

  get tagHistory(): string[] {
    return this.gifsService.tagsHistory;
  }
//Función para volver a llamar a la API de gifs cuando pulsamos en una etiqueta
  searchResponse(tag: string):void {
  this.gifsService.addSearchTag(tag);}
}

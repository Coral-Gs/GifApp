import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';


@Component({
    selector: 'gifs-search-box',
    template: `
    <h5>Buscar</h5>
    <input type="text"
    class="form-control"
    placeholder="Buscar gifs..."
    (keyup.enter)="searchTag()"
    #txtTagInput>
    `
})

export class searchBoxComponent{

    //Toma una referencia local
    //@viewChildren array con todos los elementos html
    @ViewChild('txtTagInput')
    public tagInput!: ElementRef<HTMLInputElement>; //nombre! non-null operator, significa que siempre va a tener un valor

    constructor(private gifsService: GifsService){}

    searchTag(){
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.addSearchTag(newTag);
    this.tagInput.nativeElement.value = '';

    }
   
}
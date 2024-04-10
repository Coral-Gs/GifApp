import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' }) //Servicio disponible para todos los componentes con 'root'

export class GifsService {

  public gifList: Gif[] = [];

  private _tagsHistory: string[] = []; //Almacena los tags en propiedad privada
  private apiKey: string = 'o2EMs4WuWYyCuHCtlxuHE5OQ3TMAZvTk';
  private serviceURL: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();//Cuando usamos el servicio cargamos el historial de gifs
  }

  get tagsHistory() {
    return [...this._tagsHistory]; //Creo copia con [...]
  }

  //Función para organizar y añadir tags al historial
  private organizeHistory(tagN: string): void {
    tagN = tagN.toLowerCase();
    //Si la etiqueta buscada ya existe en el array, eliminamos la etiqueta
    if (this._tagsHistory.includes(tagN)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tagN);
    }
    //Añade el tag al principio del arreglo
    this._tagsHistory.unshift(tagN);
    //Limita la lista de tag a 10 elementos
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    //Guarda en localstorage el historial
    this.saveLocalStorage();
  }

  //Función para organizar y añadir tags al historial
  //al tiempo que hace llamas http a la API
  async addSearchTag(tag: string): Promise<void> {
    if (tag.length === 0) return; //No hace nada si no hemos escrito un tag
    this.organizeHistory(tag);

    //Parámetros de la llamada
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag);

    this.http
      .get<SearchResponse>(`${this.serviceURL}/search`, { params })
      .subscribe((res) => {

        this.gifList=res.data;
        console.log(this.gifList);

      }); //Observable: objeto que puede emitir valores a lo largo del tiempo
  }

  private saveLocalStorage():void {
    //Localstorage es soportado en JS directamente sin importarlo
    //JSON.stringify -> serializa la información pasando de un objeto de JS a un JSON string
    localStorage.setItem('history', JSON.stringify(this._tagsHistory)) 
  }

  private loadLocalStorage(): void{
    if (!localStorage.getItem('history')) return; //Si no tenemos datos en el local storage no hay que hacer nada
    //Convierte JSON string a un objeto de JS y hay que usar el operador ! para asegurar que siempre va a recibir un dato
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!)
    
    if(this._tagsHistory.length === 0) return; //Si no hay historial no hacemos nada, si hay llama a la API con el tag buscado más reciente
    this.addSearchTag(this._tagsHistory[0]); 
  }
}

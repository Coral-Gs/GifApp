import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home/home-page.component';
import { searchBoxComponent } from './components/searchbox/search-box.component';
import { CardListComponent } from './components/card-list/card-list.component';

@NgModule({
  declarations: [HomePageComponent, searchBoxComponent, CardListComponent],
  exports: [HomePageComponent],
  imports: [CommonModule],
})
export class GifsModule {}

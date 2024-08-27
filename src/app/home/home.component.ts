import { Component, inject, ViewChild, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../interfaces';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent, FormsModule],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" [(ngModel)]="currentFilter" name="current-filter"/>
        <button *ngIf="currentFilter" class="secondary" type="button" (click)="removeAllFilters()" >Remove</button>
        <button class="primary" type="button" (click)="filterResults(currentFilter)" >Search</button>
      </form>
    </section>
    <section class="results">
      <housing-location *ngFor="let housingLocation of filteredLocationList"
      [housingLocation]="housingLocation"></housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  housingLocationList : HousingLocation[] = [];
  filteredLocationList : HousingLocation[] = [];

  housingService: HousingService = inject(HousingService);
  currentFilter! : string;

  constructor() {
    this.housingLocationList = this.housingService.getAllHousingLocations();
    this.filteredLocationList = this.housingLocationList;
  }

  filterResults(filter: string) {
    if (!filter) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }

    this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
      housingLocation?.city.toLowerCase().includes(filter.toLowerCase()),
    );
  }

  removeAllFilters() {
    this.filteredLocationList = this.housingLocationList;
    this.currentFilter = '';
  }
}

import { Component, inject } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { HousingService } from '../housing.service';
import { HousingLocation } from '../interfaces';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule],
  template: `
  <section class="detail">
    <a [routerLink]="['/']">Back to list</a>
    <article>
      <img
        class="listing-photo"
        [src]="housingLocation?.photo"
        alt="Exterior photo of {{ housingLocation?.name }}"
        crossorigin
      />
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <p class="listing-location">{{ housingLocation?.city }}, {{ housingLocation?.state }}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{ housingLocation?.availableUnits }}</li>
          <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
          <li>Does this location have laundry: {{ housingLocation?.laundry }}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <!-- firstName -->
            <label for="first-name">First name</label>
            <input id="first-name" type="text" formControlName="firstName" />
            
            <!-- lastName -->
            <label for="last-name">Last name</label>
            <input id="last-name" type="text" formControlName="lastName" />

            <!-- email -->
            <label for="email">Email</label>
           <input id="email" type="email" formControlName="email" />

           <button type="submit" class="primary">Apply now</button>
        </form>
      </section>
    </article>
  </section>
  `,
  styleUrl: `./details.component.css`
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);

  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  })
  
  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById(housingLocationId).then((housingLocation) => {
      this.housingLocation = housingLocation;
    });
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    )
  }
}

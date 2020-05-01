import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatInputModule, MatSelectModule, MatCheckboxModule, MatDatepickerModule } from '@angular/material';

import { TeamFormComponent } from '../../forms/team-form/team-form.component';
import { SupplierFormComponent } from '../../forms/supplier-form/supplier-form.component';
import { GuestAppearanceFormComponent } from '../../forms/guest-appearance-form/guest-appearance-form.component';
import { ArtistBookingFormComponent } from '../../forms/artist-booking-form/artist-booking-form.component';
import { SharedModule } from '../../shared.module';
import { ContactComponent } from './contact.component';
import { ContactRoutingModule } from './contact-routing.module';

@NgModule({
	declarations: [
		ContactComponent,
		ArtistBookingFormComponent,
		TeamFormComponent,
		SupplierFormComponent,
		GuestAppearanceFormComponent,
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatMomentDateModule,
		MatInputModule,
		MatSelectModule,
		MatCheckboxModule,
		MatDatepickerModule,
		SharedModule,
		ContactRoutingModule,
	],
	providers: [
		{
			provide: LOCALE_ID,
			useValue: 'de',
		},
	],
})
export class ContactModule {}

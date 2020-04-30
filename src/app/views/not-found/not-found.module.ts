import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared.module';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from './not-found.component';

@NgModule({
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	declarations: [NotFoundComponent],
	imports: [CommonModule, SharedModule, NotFoundRoutingModule],
})
export class NotFoundModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared.module';
import { EventOverviewRoutingModule } from './event-overview-routing.module';
import { EventOverviewComponent } from './event-overview.component';

@NgModule({
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	declarations: [EventOverviewComponent],
	imports: [CommonModule, SharedModule, EventOverviewRoutingModule],
})
export class EventOverviewModule {}

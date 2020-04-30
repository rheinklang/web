import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared.module';
import { ContentLoaderTeaserEventComponent } from '../../components/atoms/content-loader-teaser-event/content-loader-teaser-event.component';
import { TeaserEventComponent } from '../../components/molecules/teaser-event/teaser-event.component';
import { EventOverviewRoutingModule } from './event-overview-routing.module';
import { EventOverviewComponent } from './event-overview.component';

@NgModule({
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	declarations: [EventOverviewComponent, TeaserEventComponent, ContentLoaderTeaserEventComponent],
	imports: [CommonModule, SharedModule, EventOverviewRoutingModule],
})
export class EventOverviewModule {}

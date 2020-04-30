import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared.module';
import { ContentLoaderTeaserSponsorComponent } from '../../components/atoms/content-loader-teaser-sponsor/content-loader-teaser-sponsor.component';
import { TeaserSponsorComponent } from '../../components/molecules/teaser-sponsor/teaser-sponsor.component';
import { SponsorsRoutingModule } from './sponsors-overview-routing.module';
import { SponsorsOverviewComponent } from './sponsors-overview.component';

@NgModule({
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	declarations: [SponsorsOverviewComponent, ContentLoaderTeaserSponsorComponent, TeaserSponsorComponent],
	imports: [CommonModule, SharedModule, SponsorsRoutingModule],
})
export class SponsorsOverviewModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared.module';
// tslint:disable-next-line:max-line-length
import { ContentLoaderTeaserSponsorComponent } from '../../components/atoms/content-loader-teaser-sponsor/content-loader-teaser-sponsor.component';
import { TeaserSponsorComponent } from '../../components/molecules/teaser-sponsor/teaser-sponsor.component';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from './not-found.component';

@NgModule({
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	declarations: [NotFoundComponent, ContentLoaderTeaserSponsorComponent, TeaserSponsorComponent],
	imports: [CommonModule, SharedModule, NotFoundRoutingModule],
})
export class NotFoundModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared.module';
// tslint:disable-next-line:max-line-length
// import { ContentLoaderTeaserSponsorComponent } from '../../components/atoms/content-loader-teaser-sponsor/content-loader-teaser-sponsor.component';
// import { TeaserSponsorComponent } from '../../components/molecules/teaser-sponsor/teaser-sponsor.component';
import { PopupRoutingModule } from './popup-routing.module';
import { PopupComponent } from './popup.component';
import { PopupTicketComponent } from './popup-ticket.component';

@NgModule({
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	declarations: [PopupComponent, PopupTicketComponent],
	imports: [CommonModule, SharedModule, PopupRoutingModule],
})
export class PopupHeerbruggModule {}

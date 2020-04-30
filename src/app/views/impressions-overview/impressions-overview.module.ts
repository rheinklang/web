import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared.module';
import { ContentLoaderImpressionComponent } from '../../components/atoms/content-loader-impression/content-loader-impression.component';
import { ImpressionsRoutingModule } from './impressions-overview-routing.module';
import { ImpressionsOverviewComponent } from './impressions-overview.component';

@NgModule({
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	declarations: [ImpressionsOverviewComponent, ContentLoaderImpressionComponent],
	imports: [CommonModule, SharedModule, ImpressionsRoutingModule],
})
export class ImpressionsOverviewModule {}

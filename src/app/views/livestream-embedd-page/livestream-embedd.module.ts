import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared.module';
import { LivestreamComponent } from '../../components/organisms/livestream/livestream.component';
import { LivestreamEmbeddRoutingModule } from './livestream-embedd-routing.module';
import { LivestreamEmbeddPageComponent } from './livestream-embedd-page.component';

@NgModule({
	declarations: [LivestreamEmbeddPageComponent, LivestreamComponent],
	imports: [CommonModule, SharedModule, LivestreamEmbeddRoutingModule],
})
export class LivestreamEmbeddModule {}

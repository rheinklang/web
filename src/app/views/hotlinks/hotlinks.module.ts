import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotlinksRoutingModule } from './hotlinks-routing.module';
import { HotlinksComponent } from './hotlinks.component';
import { SharedModule } from '../../shared.module';

@NgModule({
	declarations: [HotlinksComponent],
	imports: [CommonModule, SharedModule, HotlinksRoutingModule],
})
export class HotlinksModule {}

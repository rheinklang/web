import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImpressionRoutingModule } from './impression-routing.module';
import { ImpressionComponent } from './impression.component';
import { SharedModule } from '../../shared.module';

@NgModule({
	declarations: [ImpressionComponent],
	imports: [CommonModule, SharedModule, ImpressionRoutingModule],
})
export class ImpressionModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared.module';
import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event.component';

@NgModule({
	declarations: [EventComponent],
	imports: [CommonModule, SharedModule, EventRoutingModule],
})
export class EventModule {}

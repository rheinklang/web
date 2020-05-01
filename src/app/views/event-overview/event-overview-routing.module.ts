import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventOverviewComponent } from './event-overview.component';

const routes: Routes = [{ path: '', component: EventOverviewComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class EventOverviewRoutingModule {}

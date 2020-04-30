import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SponsorsOverviewComponent } from './sponsors-overview.component';

const routes: Routes = [{ path: '', component: SponsorsOverviewComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SponsorsRoutingModule {}

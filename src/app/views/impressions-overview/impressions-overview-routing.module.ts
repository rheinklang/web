import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImpressionsOverviewComponent } from './impressions-overview.component';

const routes: Routes = [{ path: '', component: ImpressionsOverviewComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ImpressionsRoutingModule {}

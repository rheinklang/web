import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LivestreamEmbeddPageComponent } from './livestream-embedd-page.component';

const routes: Routes = [{ path: '', component: LivestreamEmbeddPageComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class LivestreamEmbeddRoutingModule {}

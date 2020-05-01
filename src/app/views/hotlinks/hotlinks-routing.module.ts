import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HotlinksComponent } from './hotlinks.component';

const routes: Routes = [{ path: '', component: HotlinksComponent }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class HotlinksRoutingModule {}

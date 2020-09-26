import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PopupTicketComponent } from './popup-ticket.component';
import { PopupComponent } from './popup.component';

const routes: Routes = [
	{ path: '', component: PopupComponent },
	{ path: 'ticket/:guid', component: PopupTicketComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PopupRoutingModule {}

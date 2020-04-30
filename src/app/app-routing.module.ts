import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { EventComponent } from './views/event/event.component';
import { EventOverviewComponent } from './views/event-overview/event-overview.component';
import { ImpressionsOverviewComponent } from './views/impressions-overview/impressions-overview.component';
import { ImpressionComponent } from './views/impression/impression.component';
import { ContactComponent } from './views/contact/contact.component';
import { ArticlesComponent } from './views/articles/articles.component';
import { SponsorsOverviewComponent } from './views/sponsors-overview/sponsors-overview.component';
import { PrivacyComponent } from './views/privacy/privacy.component';
import { LivestreamEmbeddPageComponent } from './views/livestream-embedd-page/livestream-embedd-page.component';
import { environment } from '../environments/environment';
import { HotlinksComponent } from './views/hotlinks/hotlinks.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
	},
	{
		path: 'about',
		data: { preload: true },
		loadChildren: () =>
			import(/* webpackChunkName: "about" */ './views/about/about.module').then((mod) => mod.AboutModule),
	},
	{
		path: 'contact',
		// component: ContactComponent,
		data: { preload: false },
		loadChildren: () =>
			import(/* webpackChunkName: "contact" */ './views/contact/contact.module').then((mod) => mod.ContactModule),
	},
	{
		path: 'impressions',
		data: { preload: true },
		loadChildren: () =>
			import(
				/* webpackChunkName: "impressions" */ './views/impressions-overview/impressions-overview.module'
			).then((mod) => mod.ImpressionsOverviewModule),
	},
	{
		path: 'impressions/:impressionSlug',
		data: { preload: false },
		loadChildren: () =>
			import(/* webpackChunkName: "impression" */ './views/impression/impression.module').then(
				(mod) => mod.ImpressionModule
			),
	},
	{
		path: 'sponsors',
		data: { preload: false },
		loadChildren: () =>
			import(/* webpackChunkName: "sponsors" */ './views/sponsors-overview/sponsors-overview.module').then(
				(mod) => mod.SponsorsOverviewModule
			),
	},
	{
		path: 'events',
		data: { preload: true },
		loadChildren: () =>
			import(/* webpackChunkName: "events" */ './views/event-overview/event-overview.module').then(
				(mod) => mod.EventOverviewModule
			),
	},
	{
		path: 'articles/:articleId',
		component: ArticlesComponent,
	},
	{
		path: 'events/:eventSlug',
		component: EventComponent,
	},
	{
		path: 'privacy',
		data: { preload: false },
		loadChildren: () =>
			import(/* webpackChunkName: "privacy" */ './views/privacy/privacy.module').then((mod) => mod.PrivacyModule),
	},
	{
		path: 'live',
		component: LivestreamEmbeddPageComponent,
		data: { disableLiveIndicator: true, modifier: 'no-space' },
	},
	{
		path: 'hotlinks',
		data: { preload: true },
		loadChildren: () =>
			import(/* webpackChunkName: "hotlinks" */ './views/hotlinks/hotlinks.module').then(
				(mod) => mod.HotlinksModule
			),
	},
	{
		path: 'not-found',
		component: NotFoundComponent,
	},
	{
		path: '**',
		component: NotFoundComponent,
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'enabled',
			anchorScrolling: 'enabled',
			enableTracing: `${environment.debugNgRouter}` === 'true',
		}),
	],
	exports: [RouterModule],
})
export class RheinklangRoutingModule {}

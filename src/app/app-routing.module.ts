import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { environment } from '../environments/environment';

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
		data: { preload: false },
		loadChildren: () =>
			import(/* webpackChunkName: "article" */ './views/article/article.module').then((mod) => mod.ArticleModule),
	},
	{
		path: 'events/:eventSlug',
		// component: EventComponent,
		data: { preload: true },
		loadChildren: () =>
			import(/* webpackChunkName: "event" */ './views/event/event.module').then((mod) => mod.EventModule),
	},
	{
		path: 'privacy',
		data: { preload: false },
		loadChildren: () =>
			import(/* webpackChunkName: "privacy" */ './views/privacy/privacy.module').then((mod) => mod.PrivacyModule),
	},
	{
		path: 'live',
		data: { disableLiveIndicator: true, modifier: 'no-space', preload: false },
		loadChildren: () =>
			import(/* webpackChunkName: "live" */ './views/livestream-embedd-page/livestream-embedd.module').then(
				(mod) => mod.LivestreamEmbeddModule
			),
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
		loadChildren: () =>
			import(/* webpackChunkName: "not-found" */ './views/not-found/not-found.module').then(
				(mod) => mod.NotFoundModule
			),
	},
	{
		path: '**',
		loadChildren: () =>
			import(/* webpackChunkName: "not-found" */ './views/not-found/not-found.module').then(
				(mod) => mod.NotFoundModule
			),
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

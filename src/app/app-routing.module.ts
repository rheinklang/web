import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { AboutComponent } from './views/about/about.component';
import { EventComponent } from './views/event/event.component';
import { EventOverviewComponent } from './views/event-overview/event-overview.component';
import { ImpressionOverviewComponent } from './views/impression-overview/impression-overview.component';
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
		component: AboutComponent,
	},
	{
		path: 'contact',
		component: ContactComponent,
	},
	{
		path: 'impressions',
		component: ImpressionOverviewComponent,
	},
	{
		path: 'impressions/:impressionSlug',
		component: ImpressionComponent,
	},
	{
		path: 'sponsors',
		component: SponsorsOverviewComponent,
	},
	{
		path: 'events',
		component: EventOverviewComponent,
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
		component: PrivacyComponent,
	},
	{
		path: 'live',
		component: LivestreamEmbeddPageComponent,
		data: { disableLiveIndicator: true, modifier: 'no-space' },
	},
	{
		path: 'hotlinks',
		component: HotlinksComponent,
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
			enableTracing: environment.production === false,
		}),
	],
	exports: [RouterModule],
})
export class RheinklangRoutingModule {}

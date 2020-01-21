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
import { CustomPreloadingStrategy } from './handler/PreloadHandler';

const routes: Routes = [
	{
		path: '',
		data: { seoID: 'home' },
		component: HomeComponent
	},
	{
		path: 'about',
		data: { preload: true },
		loadChildren: () =>
			import(/* webpackChunkName: "about" */ './views/about/about.module')
				.then(mod => mod.AboutModule)
	},
	{
		path: 'contact',
		component: ContactComponent
	},
	{
		path: 'impressions',
		component: ImpressionOverviewComponent
	},
	{
		path: 'impressions/:impressionId',
		component: ImpressionComponent
	},
	{
		path: 'sponsors',
		component: SponsorsOverviewComponent
	},
	{
		path: 'events',
		component: EventOverviewComponent
	},
	{
		path: 'articles/:articleId',
		component: ArticlesComponent
	},
	{
		path: 'events/:eventSlug',
		component: EventComponent
	},
	{
		path: 'not-found',
		component: NotFoundComponent
	},
	{
		path: '**',
		component: NotFoundComponent
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'enabled',
			anchorScrolling: 'enabled',
			preloadingStrategy: CustomPreloadingStrategy
			// enableTracing: environment.production !== true
		})
	],
	exports: [RouterModule]
})
export class RheinklangRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentLoaderModule } from '@ngneat/content-loader';

import { AboutComponent } from './views/about/about.component';
import { AppComponent } from './app.component';
import { ArticlesComponent } from './views/articles/articles.component';
import { BurgerComponent } from './components/atoms/burger/burger.component';
import { ButtonComponent } from './components/atoms/button/button.component';
import { ButtonFacebookComponent } from './components/atoms/button-facebook/button-facebook.component';
import { ButtonLinkComponent } from './components/atoms/button-link/button-link.component';
import { CardComponent } from './components/molecules/card/card.component';
import { ComingSoonPageComponent } from './components/atoms/coming-soon-page/coming-soon-page.component';
import { ContactComponent } from './views/contact/contact.component';
import { ContentBlockComponent } from './components/organisms/content-block/content-block.component';
// tslint:disable-next-line: max-line-length
import { ContentLoaderTeaserArticleComponent } from './components/atoms/content-loader-teaser-article/content-loader-teaser-article.component';
import { DefaultLayoutComponent } from './components/layouts/default-layout/default-layout.component';
import { EventComponent } from './views/event/event.component';
import { EventOverviewComponent } from './views/event-overview/event-overview.component';
import { FooterComponent } from './components/organisms/footer/footer.component';
import { GraphQLModule } from './graphql.module';
import { HeaderComponent } from './components/organisms/header/header.component';
import { HeadingComponent } from './components/atoms/heading/heading.component';
import { HomeComponent } from './views/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { IconComponent } from './components/atoms/icon/icon.component';
import { ImageComponent } from './components/atoms/image/image.component';
import { ImpressionComponent } from './views/impression/impression.component';
import { ImpressionOverviewComponent } from './views/impression-overview/impression-overview.component';
import { InputComponent } from './components/atoms/input/input.component';
import { LinkComponent } from './components/atoms/link/link.component';
import { LinkListComponent } from './components/molecules/link-list/link-list.component';
import { LogoComponent } from './components/atoms/logo/logo.component';
import { NewsletterComponent } from './components/molecules/newsletter/newsletter.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { PictureComponent } from './components/atoms/picture/picture.component';
import { RheinklangRoutingModule as AppRoutingModule } from './app-routing.module';
import { SeoManagerComponent } from './components/helper/seo-manager/seo-manager.component';
import { SpinnerComponent } from './components/atoms/spinner/spinner.component';
import { SponsorsOverviewComponent } from './views/sponsors-overview/sponsors-overview.component';
import { TagComponent } from './components/atoms/tag/tag.component';
import { TagListComponent } from './components/molecules/tag-list/tag-list.component';
import { TeaserComponent } from './components/molecules/teaser/teaser.component';
import { TeaserEventComponent } from './components/molecules/teaser-event/teaser-event.component';
import { TeaserSponsorComponent } from './components/molecules/teaser-sponsor/teaser-sponsor.component';
import { ScrollAnchorDirective } from './directives/scroll-anchor.directive';
import { RichtextComponent } from './components/atoms/richtext/richtext.component';
import { TooltipDirective } from './directives/tooltip.directive';
import { SafeHtml } from './pipes/safe-html';
import { StaticMapComponent } from './components/molecules/map/static-map.component';
import { MapComponent } from './components/molecules/map/map.component';
import { GlobalErrorHandler } from './handler/GlobalErrorHandler';

@NgModule({
	declarations: [
		SafeHtml,
		AppComponent,
		DefaultLayoutComponent,
		AboutComponent,
		ArticlesComponent,
		BurgerComponent,
		ButtonComponent,
		ButtonFacebookComponent,
		ButtonLinkComponent,
		CardComponent,
		ComingSoonPageComponent,
		ContactComponent,
		ContentBlockComponent,
		ContentLoaderTeaserArticleComponent,
		EventComponent,
		EventOverviewComponent,
		FooterComponent,
		HeaderComponent,
		HeadingComponent,
		HomeComponent,
		IconComponent,
		ImageComponent,
		ImpressionComponent,
		ImpressionOverviewComponent,
		InputComponent,
		LinkComponent,
		LinkListComponent,
		LogoComponent,
		NewsletterComponent,
		NotFoundComponent,
		PictureComponent,
		RichtextComponent,
		ScrollAnchorDirective,
		SeoManagerComponent,
		SpinnerComponent,
		SponsorsOverviewComponent,
		TagComponent,
		TagListComponent,
		TeaserComponent,
		TeaserEventComponent,
		TeaserSponsorComponent,
		TooltipDirective,
		StaticMapComponent,
		MapComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		GraphQLModule,
		FormsModule,
		ReactiveFormsModule,
		ContentLoaderModule
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	providers: [{
		provide: ErrorHandler,
		useClass: GlobalErrorHandler
	}],
	bootstrap: [AppComponent]
})
export class AppModule { }

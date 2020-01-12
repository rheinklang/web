import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { SharedModule } from './shared.module';

import { RheinklangRoutingModule as AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { DefaultLayoutComponent } from './components/layouts/default-layout/default-layout.component';
import { HeaderComponent } from './components/organisms/header/header.component';
import { FooterComponent } from './components/organisms/footer/footer.component';
import { IconComponent } from './components/atoms/icon/icon.component';
import { HomeComponent } from './views/home/home.component';
import { SeoManagerComponent } from './components/helper/seo-manager/seo-manager.component';
import { LinkComponent } from './components/atoms/link/link.component';
import { LinkListComponent } from './components/molecules/link-list/link-list.component';
import { LogoComponent } from './components/atoms/logo/logo.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { HeadingComponent } from './components/atoms/heading/heading.component';
import { AboutComponent } from './views/about/about.component';
import { EventComponent } from './views/event/event.component';
import { EventOverviewComponent } from './views/event-overview/event-overview.component';
import { ImpressionComponent } from './views/impression/impression.component';
import { ImpressionOverviewComponent } from './views/impression-overview/impression-overview.component';
import { NewsletterComponent } from './components/molecules/newsletter/newsletter.component';
import { InputComponent } from './components/atoms/input/input.component';
import { ButtonComponent } from './components/atoms/button/button.component';
import { ImageComponent } from './components/atoms/image/image.component';
import { CardComponent } from './components/molecules/card/card.component';
import { ContentBlockComponent } from './components/organisms/content-block/content-block.component';
import { PictureComponent } from './components/atoms/picture/picture.component';
import { ContactComponent } from './views/contact/contact.component';
import { BurgerComponent } from './components/atoms/burger/burger.component';
import { ArticlesComponent } from './views/articles/articles.component';
import { TeaserComponent } from './components/molecules/teaser/teaser.component';
import { TagComponent } from './components/atoms/tag/tag.component';
import { TagListComponent } from './components/molecules/tag-list/tag-list.component';
import { SponsorsOverviewComponent } from './views/sponsors-overview/sponsors-overview.component';
import { TeaserSponsorComponent } from './components/molecules/teaser-sponsor/teaser-sponsor.component';
import { TeaserEventComponent } from './components/molecules/teaser-event/teaser-event.component';
import { ButtonFacebookComponent } from './components/atoms/button-facebook/button-facebook.component';
import { ComingSoonPageComponent } from './components/atoms/coming-soon-page/coming-soon-page.component';
import { SpinnerComponent } from './components/atoms/spinner/spinner.component';
import { ContentLoaderTeaserArticleComponent } from './components/atoms/content-loader-teaser-article/content-loader-teaser-article.component';

@NgModule({
	declarations: [
		AppComponent,
		DefaultLayoutComponent,
		HeaderComponent,
		FooterComponent,
		IconComponent,
		HomeComponent,
		SeoManagerComponent,
		LinkComponent,
		LinkListComponent,
		LogoComponent,
		NotFoundComponent,
		HeadingComponent,
		AboutComponent,
		EventComponent,
		EventOverviewComponent,
		ImpressionComponent,
		ImpressionOverviewComponent,
		NewsletterComponent,
		InputComponent,
		ButtonComponent,
		ImageComponent,
		PictureComponent,
		CardComponent,
		ContentBlockComponent,
		ContactComponent,
		BurgerComponent,
		ArticlesComponent,
		TagComponent,
		TagListComponent,
		TeaserComponent,
		SponsorsOverviewComponent,
		TeaserSponsorComponent,
		TeaserEventComponent,
		ButtonFacebookComponent,
		ComingSoonPageComponent,
		SpinnerComponent,
		ContentLoaderTeaserArticleComponent
	],
	imports: [
		SharedModule,
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		GraphQLModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}

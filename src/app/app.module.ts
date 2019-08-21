import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { TooltipDirective } from './directives/tooltip.directive';
import { ScrollAnchorDirective } from './directives/scroll-anchor.directive';

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
		TooltipDirective,
		ScrollAnchorDirective
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		GraphQLModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }

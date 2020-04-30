import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { IonicStorageModule } from '@ionic/storage';

// set i18n language context
registerLocaleData(localeDe);

// tslint:disable-next-line: max-line-length
import {
	MatInputModule,
	MatSelectModule,
	MatCheckboxModule,
	MatDatepickerModule,
	MatSnackBarModule,
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { AppComponent } from './app.component';
import { ArticlesComponent } from './views/articles/articles.component';
import { ContactComponent } from './views/contact/contact.component';
import { EventComponent } from './views/event/event.component';
import { EventOverviewComponent } from './views/event-overview/event-overview.component';
import { GraphQLModule } from './graphql.module';
import { HomeComponent } from './views/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ImpressionComponent } from './views/impression/impression.component';
import { ImpressionsOverviewComponent } from './views/impressions-overview/impressions-overview.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { RheinklangRoutingModule as AppRoutingModule } from './app-routing.module';
import { SponsorsOverviewComponent } from './views/sponsors-overview/sponsors-overview.component';
import { GlobalErrorHandler } from './handler/GlobalErrorHandler';
import { LogService } from './services/log.service';
import { environment } from '../environments/environment';
import { RemoteLogService } from './services/remote-log.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrivacyComponent } from './views/privacy/privacy.component';
import { LivestreamEmbeddPageComponent } from './views/livestream-embedd-page/livestream-embedd-page.component';
import { HotlinksComponent } from './views/hotlinks/hotlinks.component';
import { SharedModule } from './shared.module';

@NgModule({
	declarations: [
		// SafeHtml,
		AppComponent,
		// DefaultLayoutComponent,
		// AboutComponent, -> Part of AboutModule and AboutRoutingModule
		ArticlesComponent,
		// BurgerComponent,
		// ButtonComponent,
		// ButtonFacebookComponent,
		// ButtonLinkComponent,
		// CardComponent,
		// ComingSoonPageComponent,
		// ContactComponent, --> Part of ContactModule and ContactRoutingModule
		// ContentBlockComponent,
		// ContentLoaderTeaserArticleComponent,
		// ContentLoaderTeaserEventComponent,
		// ContentLoaderTitleComponent,
		// ContentLoaderImpressionComponent,
		// ContentLoaderTeaserSponsorComponent,
		EventComponent,
		// EventOverviewComponent, --> Part of EventOverviewModule and EventOverviewRoutingModule
		// FooterComponent,
		// HeaderComponent,
		// HeadingComponent,
		HomeComponent,
		// IconComponent,
		// ImageComponent,
		// ImpressionComponent, --> Part of ImpressionModule and ImpressionRoutingModule
		// ImpressionsOverviewComponent, --> Part of ImpressionsOverviewModule and ImpressionsOverviewRoutingModule
		// InputComponent,
		// LinkComponent,
		// LinkListComponent,
		// LogoComponent,
		// NewsletterComponent,
		NotFoundComponent,
		// PictureComponent,
		// RichtextComponent,
		// ScrollAnchorDirective,
		// SeoManagerComponent,
		// SpinnerComponent,
		// SponsorsOverviewComponent, --> Part of SponsorsOverviewModule and SponsorsOverviewRoutingModule
		// TagComponent,
		// TagListComponent,
		// TeaserComponent,
		// TeaserEventComponent,
		// TeaserSponsorComponent,
		// TooltipDirective,
		// StaticMapComponent,
		// MapComponent,
		// SelectComponent,
		// CheckboxComponent,
		// FormGroupComponent,
		// AccordionPanelComponent,
		// AccordionComponent,
		// GuestAppearanceFormComponent,
		// FormComponent,
		// SupplierFormComponent,
		// TeamFormComponent,
		// PrivacyBannerComponent,
		// PrivacyComponent, --> Part of PrivacyModule and PrivacyRoutingModule
		// ArtistBookingFormComponent,
		// LivestreamComponent,
		// LivestreamIndicatorComponent,
		LivestreamEmbeddPageComponent,
		// StageSliderComponent,
		// StageSlideItemComponent,
		// HotlinksComponent, --> Part of HotlinksModule and HotlinksRoutingModule
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		// Storage adapters
		IonicStorageModule.forRoot({
			name: 'rk-storage',
			driverOrder: ['indexeddb', 'sqlite', 'websql'],
		}),
		// GraphQL & Apollo
		GraphQLModule,
		// Forms Module,
		// ReactiveFormsModule,
		ContentLoaderModule,
		BrowserAnimationsModule,
		// Material Dependencies
		// MatMomentDateModule,
		// Material
		// MatInputModule,
		// MatSelectModule,
		// MatCheckboxModule,
		// MatDatepickerModule,
		MatSnackBarModule,
		SharedModule,
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	providers: [
		{
			provide: LOCALE_ID,
			useValue: 'de',
		},
		{
			provide: ErrorHandler,
			useClass: GlobalErrorHandler,
		},
		{
			provide: LogService,
			useClass: environment.production ? RemoteLogService : LogService,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}

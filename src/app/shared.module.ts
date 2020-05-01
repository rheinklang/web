import { CommonModule } from '@angular/common';
import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ContentLoaderModule } from '@ngneat/content-loader';
import {
	MatInputModule,
	MatSelectModule,
	MatCheckboxModule,
	MatDatepickerModule,
	MatSnackBarModule,
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { SeoManagerComponent } from './components/helper/seo-manager/seo-manager.component';
import { PictureComponent } from './components/atoms/picture/picture.component';
import { ImageComponent } from './components/atoms/image/image.component';
import { ContentBlockComponent } from './components/organisms/content-block/content-block.component';
import { HeadingComponent } from './components/atoms/heading/heading.component';
import { ScrollAnchorDirective } from './directives/scroll-anchor.directive';
import { IconComponent } from './components/atoms/icon/icon.component';
import { LinkComponent } from './components/atoms/link/link.component';
import { RouterModule } from '@angular/router';
import { TooltipDirective } from './directives/tooltip.directive';
import { CardComponent } from './components/molecules/card/card.component';
import { AccordionComponent } from './components/molecules/accordion/accordion.component';
import { AccordionPanelComponent } from './components/atoms/accordion-panel/accordion-panel.component';
import { ButtonComponent } from './components/atoms/button/button.component';
import { ButtonFacebookComponent } from './components/atoms/button-facebook/button-facebook.component';
import { ButtonLinkComponent } from './components/atoms/button-link/button-link.component';
import { CheckboxComponent } from './components/atoms/checkbox/checkbox.component';
import { ComingSoonPageComponent } from './components/atoms/coming-soon-page/coming-soon-page.component';
// tslint:disable-next-line:max-line-length
import { ContentLoaderTeaserArticleComponent } from './components/atoms/content-loader-teaser-article/content-loader-teaser-article.component';
import { ContentLoaderTitleComponent } from './components/atoms/content-loader-title/content-loader-title.component';
import { InputComponent } from './components/atoms/input/input.component';
import { LivestreamIndicatorComponent } from './components/atoms/livestream-indicator/livestream-indicator.component';
import { LogoComponent } from './components/atoms/logo/logo.component';
import { RichtextComponent } from './components/atoms/richtext/richtext.component';
import { SelectComponent } from './components/atoms/select/select.component';
import { SpinnerComponent } from './components/atoms/spinner/spinner.component';
import { TagComponent } from './components/atoms/tag/tag.component';
import { DefaultLayoutComponent } from './components/layouts/default-layout/default-layout.component';
import { FormGroupComponent } from './components/molecules/form-group/form-group.component';
import { LinkListComponent } from './components/molecules/link-list/link-list.component';
import { MapComponent } from './components/molecules/map/map.component';
import { StaticMapComponent } from './components/molecules/map/static-map.component';
import { NewsletterComponent } from './components/molecules/newsletter/newsletter.component';
import { PrivacyBannerComponent } from './components/molecules/privacy-banner/privacy-banner.component';
import { TagListComponent } from './components/molecules/tag-list/tag-list.component';
import { TeaserComponent } from './components/molecules/teaser/teaser.component';
import { FooterComponent } from './components/organisms/footer/footer.component';
import { FormComponent } from './components/organisms/form/form.component';
import { HeaderComponent } from './components/organisms/header/header.component';
import { SafeHtml } from './pipes/safe-html';
import { BurgerComponent } from './components/atoms/burger/burger.component';
import { TeaserEventComponent } from './components/molecules/teaser-event/teaser-event.component';
import { ContentLoaderTeaserEventComponent } from './components/atoms/content-loader-teaser-event/content-loader-teaser-event.component';

const COMPONENTS = [
	// atoms
	AccordionPanelComponent,
	BurgerComponent,
	ButtonComponent,
	ButtonFacebookComponent,
	ButtonLinkComponent,
	CheckboxComponent,
	ComingSoonPageComponent,
	ContentLoaderTeaserArticleComponent, // TODO: Article Module
	ContentLoaderTeaserEventComponent, // TODO: Events Module
	ContentLoaderTitleComponent,
	HeadingComponent,
	IconComponent,
	ImageComponent,
	InputComponent,
	LinkComponent,
	LivestreamIndicatorComponent,
	LogoComponent,
	PictureComponent,
	RichtextComponent,
	SelectComponent,
	SpinnerComponent,
	TagComponent,
	// helpers
	SeoManagerComponent,
	// layouts
	DefaultLayoutComponent,
	// molecules
	AccordionComponent,
	CardComponent,
	FormGroupComponent,
	LinkListComponent,
	MapComponent,
	StaticMapComponent,
	NewsletterComponent,
	PrivacyBannerComponent,
	TagListComponent,
	TeaserComponent,
	TeaserEventComponent,
	// organisms
	ContentBlockComponent,
	FooterComponent,
	FormComponent,
	HeaderComponent,
	// directives
	ScrollAnchorDirective,
	TooltipDirective,
	// pipes
	SafeHtml,
];

@NgModule({
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	declarations: COMPONENTS,
	imports: [
		CommonModule,
		RouterModule,
		// Forms Module,
		ReactiveFormsModule,
		ContentLoaderModule,
		// Material Dependencies
		MatMomentDateModule,
		// Material
		MatInputModule,
		MatSelectModule,
		MatCheckboxModule,
		MatDatepickerModule,
		MatSnackBarModule,
	],
	providers: [
		{
			provide: LOCALE_ID,
			useValue: 'de',
		},
	],
	exports: COMPONENTS,
})
export class SharedModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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

@NgModule({
	declarations: [
		SeoManagerComponent,
		PictureComponent,
		ImageComponent,
		ContentBlockComponent,
		HeadingComponent,
		IconComponent,
		LinkComponent,
		CardComponent,
		ScrollAnchorDirective,
		TooltipDirective
	],
	imports: [
		CommonModule,
		RouterModule
	],
	exports: [
		RouterModule,
		SeoManagerComponent,
		PictureComponent,
		ImageComponent,
		ContentBlockComponent,
		HeadingComponent,
		IconComponent,
		LinkComponent,
		CardComponent,
		ScrollAnchorDirective,
		TooltipDirective
	]
})
export class SharedModule { }

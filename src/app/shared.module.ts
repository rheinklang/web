import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentLoaderModule } from '@ngneat/content-loader';

import { TooltipDirective } from './directives/tooltip.directive';
import { SafeHtml } from './pipes/safe-html';
import { CommonModule } from '@angular/common';
import { ScrollAnchorDirective } from './directives/scroll-anchor.directive';

@NgModule({
	declarations: [
		// Directives
		TooltipDirective,
		ScrollAnchorDirective,
		// Pipes
		SafeHtml
	],
	imports: [CommonModule, BrowserModule, FormsModule, ReactiveFormsModule, ContentLoaderModule],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	providers: [],
	exports: [TooltipDirective, ScrollAnchorDirective, SafeHtml]
})
export class SharedModule {}

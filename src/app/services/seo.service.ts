import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { map, first, flatMap } from 'rxjs/operators';
import { template, TemplateKey, TemplateValue } from '../utils/templating';
import { SEOContextQueryGQL, SEOEntry } from '../queries/SeoContext.query';
import { REFETCH_POLICY } from '../config/policies';
import { Router, NavigationEnd } from '@angular/router';

declare var ga;

@Injectable({
	providedIn: 'root',
})
export class SEOService {
	constructor(private title: Title, private meta: Meta, private seoContextQueryGQL: SEOContextQueryGQL) {}

	private rewriteSEOContext(data: SEOEntry, additionalTemplateData: Record<TemplateKey, TemplateValue> = {}) {
		// aggregate full template data
		const templateData = {
			...additionalTemplateData,
			seoTitle: data.title,
			seoDescription: data.description,
		};

		const customOgImage: { path: string } | any = additionalTemplateData.og_image;
		const fallbackOgImage = data.og_image;
		const ogImagePath = customOgImage ? customOgImage.path : fallbackOgImage.path || null;

		// set new page title with opt. template data
		this.title.setTitle(template(data.title, templateData));

		this.meta.addTags([
			// add meta description
			{ name: 'description', content: template(data.description || '', templateData) },
			// add opengraph title or use page title
			{ name: 'og:title', content: template(data.og_title || data.title || '', templateData) },
			// add opengraph image if defined
			ogImagePath ? { name: 'og:image', content: ogImagePath } : undefined,
		]);
	}

	public setCurrentContext(context: string, additionalTemplateData?: Record<string, any>) {
		if (!context) {
			return;
		}

		this.seoContextQueryGQL
			.watch(
				{
					filter: {
						context,
					},
				},
				{
					fetchPolicy: REFETCH_POLICY,
				}
			)
			.valueChanges.pipe(
				map((result) => result.data.seoCollection),
				flatMap((entry) => entry),
				first()
			)
			.subscribe((data) => {
				if (data) {
					this.rewriteSEOContext(data, additionalTemplateData);
				}
			});
	}
}

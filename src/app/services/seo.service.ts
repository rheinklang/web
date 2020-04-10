import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { map, first, flatMap } from 'rxjs/operators';
import { template, TemplateKey, TemplateValue } from '../utils/templating';
import { SEOContextQueryGQL, SEOEntry } from '../queries/SeoContext.query';
import { REFETCH_POLICY } from '../config/policies';
import { Router, NavigationEnd } from '@angular/router';
import { GLOBAL_KEYWORDS } from '../config/meta';

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

		const description = template(data.description || '', templateData);
		const keywords = template([...GLOBAL_KEYWORDS, ...(data.keywords || [])].join(','), templateData);
		const ogTitle = template(data.og_title || data.title || '', templateData);
		const ogImagePath = customOgImage ? customOgImage.path : fallbackOgImage.path || null;

		// set new page title with opt. template data
		this.title.setTitle(template(data.title, templateData));

		this.meta.addTags([
			// add meta description
			{ name: 'description', content: description },
			// add meta keywords
			{ name: 'keywords', content: keywords },
			// add opengraph title or use page title
			{ property: 'og:title', content: ogTitle },
			// add opengraph dsecription from base description, cut to FB limits
			{ property: 'og:description', content: `${description.substr(0, 293)} ...` },
			// add opengraph image if available
			ogImagePath ? { property: 'og:image', content: ogImagePath } : undefined,
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

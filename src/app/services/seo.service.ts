import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Title, Meta } from '@angular/platform-browser';
import { GetSEOForPageQueryResponse, getSEOForPageQuery, SEOEntry } from '../queries/seo';
import { template, TemplateKey, TemplateValue } from '../utils/templating';

@Injectable({
	providedIn: 'root'
})
export class SEOService {
	constructor(private apollo: Apollo, private title: Title, private meta: Meta) { }

	private rewriteCurrentSEOData(data: SEOEntry, additionalTemplateData: Record<TemplateKey, TemplateValue> = {}) {
		const templateData = {
			...additionalTemplateData,
			seoTitle: data.title,
			seoDescription: data.description
		};

		this.title.setTitle(template(data.title, templateData));

		this.meta.addTags([
			// add meta description
			{ name: 'description', content: template(data.description || '', templateData) },
			// add opengraph title or use page title
			{ name: 'og:title', content: template(data.og_title || data.title || '', templateData) },
			// add opengraph image if defined
			data.og_image.path
				? { name: 'og:image', content: data.og_image.path }
				: undefined
		]);
	}

	public setCurrentContext(context: string, additionalTemplateData?: Record<string, any>) {
		if (!context) {
			return;
		}

		this.apollo.watchQuery<GetSEOForPageQueryResponse>({
			query: getSEOForPageQuery(context)
		})
			.valueChanges
			.subscribe(({ data, loading }) => {
				if (!loading && data.seoCollection[0]) {
					this.rewriteCurrentSEOData(data.seoCollection[0], additionalTemplateData);
				}
			});
	}
}

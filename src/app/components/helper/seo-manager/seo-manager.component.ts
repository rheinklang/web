import { Component, OnInit, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { getSEOForPageQuery, GetSEOForPageQueryResponse, SEOEntry } from '../../../queries/seo';
import { Title, Meta } from '@angular/platform-browser';

@Component({
	selector: 'rk-seo-manager',
	templateUrl: './seo-manager.component.html'
})
export class SeoManagerComponent implements OnInit {
	@Input() context: string;

	constructor(private apollo: Apollo, private title: Title, private meta: Meta) { }

	ngOnInit() {
		if (!this.context) {
			return;
		}

		this.apollo.watchQuery<GetSEOForPageQueryResponse>({
			query: getSEOForPageQuery(this.context)
		})
			.valueChanges
			.subscribe(({ data, loading }) => {
				if (!loading && data.seoCollection[0]) {
					this.rewriteCurrentSEOData(data.seoCollection[0]);
				}
			});
	}

	private rewriteCurrentSEOData(data: SEOEntry) {
		this.title.setTitle(data.title);
		this.meta.addTags([
			// add meta description
			{ name: 'description', content: data.description },
			// add opengraph title or use page title
			{ name: 'og:title', content: data.og_title || data.title },
			// add opengraph image if defined
			data.og_image.path
				? { name: 'og:image', content: data.og_image.path }
				: undefined
		]);
	}

}

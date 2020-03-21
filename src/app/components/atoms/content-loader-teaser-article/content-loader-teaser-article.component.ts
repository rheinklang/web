import { Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'rk-content-loader-teaser-article',
	templateUrl: './content-loader-teaser-article.component.html',
	styleUrls: ['./content-loader-teaser-article.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class ContentLoaderTeaserArticleComponent {
	public fillStyle = {
		fill: '#0000',
	};

	public primaryColor = '#efefef';
	public secondaryColor = '#eaeaea';
}

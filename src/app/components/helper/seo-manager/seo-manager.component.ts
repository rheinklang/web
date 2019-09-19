import { Component, OnInit, Input } from '@angular/core';
import { TemplateKey, TemplateValue } from '../../../utils/templating';
import { SEOService } from '../../../services/seo.service';

@Component({
	selector: 'rk-seo-manager',
	templateUrl: './seo-manager.component.html'
})
export class SeoManagerComponent implements OnInit {
	@Input() public context: string;
	@Input() public data: Record<TemplateKey, TemplateValue>;

	constructor(private seoService: SEOService) { }

	ngOnInit() {
		this.seoService.setCurrentContext(this.context, this.data);
	}

}

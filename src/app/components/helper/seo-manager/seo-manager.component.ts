import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TemplateKey, TemplateValue } from '../../../utils/templating';
import { unsubscribe } from '../../../utils/subscription';
import { SEOService } from '../../../services/seo.service';

@Component({
	selector: 'rk-seo-manager',
	templateUrl: './seo-manager.component.html',
})
export class SeoManagerComponent implements OnInit, OnDestroy {
	@Input() public context: string;
	@Input() public data: Record<TemplateKey, TemplateValue>;

	private navEndSubscription$?: Subscription;

	constructor(private seoService: SEOService) {}

	ngOnInit() {
		this.seoService.setCurrentContext(this.context, this.data);
	}

	public ngOnDestroy() {
		unsubscribe([this.navEndSubscription$]);
	}
}

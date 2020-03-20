import { Component, OnInit, ContentChild, OnDestroy, AfterContentInit } from '@angular/core';
import { FooterComponent } from '../../organisms/footer/footer.component';
import { HeaderComponent } from '../../organisms/header/header.component';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { unsubscribe } from '../../../utils/subscription';

@Component({
	selector: 'rk-default-layout',
	templateUrl: './default-layout.component.html',
	styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit, OnDestroy, AfterContentInit {
	@ContentChild(FooterComponent, { static: true })
	public footerComponent: FooterComponent;

	@ContentChild(HeaderComponent, { static: true })
	public headerComponent: HeaderComponent;

	public modifier?: string;

	private routeSubscription$?: Subscription;

	constructor(private route: ActivatedRoute, private router: Router) {}

	ngOnInit() {
		this.getMetaInformation();
	}

	ngAfterContentInit() {
		this.getMetaInformation();
	}

	ngOnDestroy() {
		unsubscribe([this.routeSubscription$]);
	}

	private getMetaInformation() {
		this.routeSubscription$ = this.router.events
			.pipe(
				filter(event => event instanceof NavigationEnd),
				map(() => {
					let child = this.route.firstChild;
					while (child) {
						if (child.firstChild) {
							child = child.firstChild;
						} else if (child.snapshot.data && child.snapshot.data.modifier) {
							return child.snapshot.data.modifier;
						}

						return null;
					}
					return null;
				})
			)
			.subscribe((modifier?: string) => {
				this.modifier = modifier;
			});
	}

	public get cssClass() {
		if (this.modifier) {
			return `l-default-layout--${this.modifier}`;
		}
	}
}

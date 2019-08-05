import { Component, OnInit, ViewChild, ContentChild } from '@angular/core';
import { FooterComponent } from '../../organisms/footer/footer.component';
import { HeaderComponent } from '../../organisms/header/header.component';

@Component({
	selector: 'app-default-layout',
	templateUrl: './default-layout.component.html',
	styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {
	@ContentChild(FooterComponent, { static: true }) footerComponent: FooterComponent;
	@ContentChild(HeaderComponent, { static: true }) headerComponent: HeaderComponent;

	constructor() {}

	ngOnInit() {}
}

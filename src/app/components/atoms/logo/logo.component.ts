import { Component, OnInit, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LogoQueryResponse, getLogoQuery } from '../../../queries/logo-singleton';
import { environment } from '../../../../environments/environment';

@Component({
	selector: 'app-logo',
	templateUrl: './logo.component.html'
})
export class LogoComponent implements OnInit {
	@Input() id: string;
	@Input() highlight = false;

	public image: string | null;

	constructor(private apollo: Apollo) { }

	ngOnInit() {

		this.apollo.watchQuery<LogoQueryResponse<any>>({
			query: getLogoQuery(this.id)
		})
			.valueChanges
			.subscribe(({ data, loading }) => {
				const asset = data.logosSingleton[this.id];
				this.image = asset ? `${environment.assetCDNHost}${asset.path}` : null;
			});
	}

}

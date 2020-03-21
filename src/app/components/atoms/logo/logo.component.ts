import { Component, OnInit, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { LogoService } from '../../../services/logo.service';
import { resolveCDNImagePath } from '../../../utils/image';

@Component({
	selector: 'rk-logo',
	templateUrl: './logo.component.html',
	styleUrls: ['./logo.component.scss'],
})
export class LogoComponent implements OnInit {
	@Input() id: string;
	@Input() highlight = false;
	@Input() location?: string;

	public image: string | null;

	constructor(private logoService: LogoService) {}

	ngOnInit() {
		this.logoService.getLogo(this.id).subscribe(({ data }) => {
			const asset = data.logosSingleton[this.id];
			this.image = resolveCDNImagePath(asset, null);
		});
	}
}

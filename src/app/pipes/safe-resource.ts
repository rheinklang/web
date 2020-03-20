import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safeResource' })
export class SafeResource implements PipeTransform {
	constructor(private sanitizer: DomSanitizer) {}

	public transform(url: any) {
		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}
}

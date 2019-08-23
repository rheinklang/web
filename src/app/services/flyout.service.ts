import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class FlyoutService {
	public isOpen: boolean;
	@Output() changeDetection = new EventEmitter<boolean>();

	public open() {
		this.isOpen = true;
		this.changeDetection.emit(this.isOpen);
		document.body.style.overflow = 'hidden';
	}

	public close() {
		this.isOpen = false;
		this.changeDetection.emit(this.isOpen);
		document.body.style.overflow = 'unset';
	}

	public toggle() {
		this.isOpen = !this.isOpen;
		this.changeDetection.emit(this.isOpen);
	}
}

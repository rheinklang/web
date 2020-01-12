import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FlyoutService } from '../../../services/flyout.service';

@Component({
	selector: 'rk-burger',
	templateUrl: './burger.component.html',
	styleUrls: ['./burger.component.scss', './burger.collapse.scss'],
	encapsulation: ViewEncapsulation.None
})
export class BurgerComponent {
	@Input() public type = 'collapse';
	@Input() public active = false;

	@Output() public handleClick = new EventEmitter<boolean>();

	public handleInternalClick() {
		this.active = !this.active;
		this.handleClick.emit(this.active);
	}
}

import { Component, HostListener, Input } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
	selector: 'rk-back-to-top',
	templateUrl: './back-to-top.component.html',
	styleUrls: ['./back-to-top.component.scss'],
	animations: [
		trigger('appearInOut', [
			state(
				'in',
				style({
					display: 'block',
					opacity: '1',
				})
			),
			state(
				'out',
				style({
					display: 'none',
					opacity: '0',
				})
			),
			transition('in => out', animate('400ms ease-in-out')),
			transition('out => in', animate('400ms ease-in-out')),
		]),
	],
})
export class BackToTopComponent {
	animationState = 'out';
	private timerID: any = null;

	@Input() scrollDistance = 50;
	@Input() animate = false;
	@Input() speed = 80;
	@Input() acceleration = 0;

	/**
	 * Listens to window scroll and animates the button
	 */
	@HostListener('window:scroll', [])
	onWindowScroll() {
		if (this.isBrowser()) {
			this.animationState = this.getCurrentScrollTop() > this.scrollDistance / 2 ? 'in' : 'out';
		}
	}

	scrollTop(event: any) {
		if (!this.isBrowser()) {
			return;
		}

		event.preventDefault();
		if (this.animate) {
			this.animateScrollTop();
		} else {
			window.scrollTo(0, 0);
		}
	}

	/**
	 * Performs the animated scroll to top
	 */
	animateScrollTop() {
		if (this.timerID !== null) {
			return;
		}

		let initialSpeed = this.speed;
		this.timerID = setInterval(() => {
			window.scrollBy(0, -initialSpeed);
			initialSpeed = initialSpeed + this.acceleration;
			if (this.getCurrentScrollTop() === 0) {
				clearInterval(this.timerID);
				this.timerID = null;
			}
		}, 15);
	}

	/**
	 * Get current Y scroll position
	 */
	getCurrentScrollTop() {
		if (typeof window.scrollY !== 'undefined' && window.scrollY >= 0) {
			return window.scrollY;
		}

		if (typeof window.pageYOffset !== 'undefined' && window.pageYOffset >= 0) {
			return window.pageYOffset;
		}

		if (typeof document.body.scrollTop !== 'undefined' && document.body.scrollTop >= 0) {
			return document.body.scrollTop;
		}

		if (typeof document.documentElement.scrollTop !== 'undefined' && document.documentElement.scrollTop >= 0) {
			return document.documentElement.scrollTop;
		}

		return 0;
	}

	/**
	 * This check will prevent 'window' logic to be executed
	 * while executing the server rendering
	 */
	isBrowser(): boolean {
		return typeof window !== 'undefined';
	}
}

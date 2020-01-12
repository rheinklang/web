import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpressionOverviewComponent } from './impression-overview.component';

describe('ImpressionOverviewComponent', () => {
	let component: ImpressionOverviewComponent;
	let fixture: ComponentFixture<ImpressionOverviewComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ImpressionOverviewComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ImpressionOverviewComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

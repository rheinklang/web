import { Component, ContentChildren, QueryList, AfterContentInit, Input, ViewEncapsulation } from '@angular/core';
import { AccordionPanelComponent } from '../../atoms/accordion-panel/accordion-panel.component';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'rk-accordion',
	templateUrl: './accordion.component.html',
	styleUrls: ['./accordion.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class AccordionComponent implements AfterContentInit {
	@Input() public initialOpenPanel?: number;

	@ContentChildren(AccordionPanelComponent, { descendants: true })
	private panels: QueryList<AccordionPanelComponent>;

	private initialSelectedId: string | undefined;

	constructor(route: ActivatedRoute) {
		route.queryParams.subscribe((params) => {
			if (params.view) {
				this.initialSelectedId = params.view;
			}
		});
	}

	public ngAfterContentInit() {
		const panels = this.panels.toArray();

		if (this.initialOpenPanel) {
			panels[this.initialOpenPanel].opened = true;
		}

		if (this.initialSelectedId) {
			const matchingSection = panels.find((panel) => panel.id === this.initialSelectedId);
			if (matchingSection) {
				matchingSection.opened = true;
			}
		}

		this.panels.toArray().forEach((panel: AccordionPanelComponent) => {
			panel.toggle.subscribe(() => {
				if (!panel.opened) {
					this.openPanel(panel);
				} else {
					this.closePanel(panel);
				}
			});
		});
	}

	public openPanel(panel: AccordionPanelComponent) {
		this.panels.toArray().forEach((p) => (p.opened = false));
		panel.opened = true;
	}

	public closePanel(panel: AccordionPanelComponent) {
		const found = this.panels.toArray().find((p) => p === panel);
		found.opened = false;
	}
}

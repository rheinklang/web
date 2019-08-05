import { Component, Input } from '@angular/core';
import { IGridSizeDef, gridSizeDefToClass } from './utils';

@Component({
	selector: 'app-grid-column',
	templateUrl: './column.component.html',
	styleUrls: ['./column.component.scss']
})
export class ColumnComponent {
	@Input() xs?: IGridSizeDef['xs'];
	@Input() sm?: IGridSizeDef['sm'];
	@Input() md?: IGridSizeDef['md'];
	@Input() lg?: IGridSizeDef['lg'];
	@Input() reverse = false;
}

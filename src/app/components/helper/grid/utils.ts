export type GridSizeValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface IGridSizeDef {
	xs: GridSizeValue;
	sm: GridSizeValue;
	md: GridSizeValue;
	lg: GridSizeValue;
}

export const gridSizeDefToClass = (baseClass: string = 'h-col--', sizes: Partial<IGridSizeDef> = {}) =>
	Object.keys(sizes).filter(Boolean).reduce(
		(prev, curr) => sizes[curr] ? prev.concat(`${baseClass}${curr}-${sizes[curr]}`) : prev,
		[] as string[]
	);

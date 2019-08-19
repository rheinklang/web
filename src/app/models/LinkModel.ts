export class LinkModel {
	private $target = '_self';
	private $needsRelationSafety = false;

	constructor(public href: string, public text: string, public icon?: string) { }

	public get relation(): string | null {
		if (this.$needsRelationSafety) {
			return 'noopener noreferrer';
		}

		return null;
	}

	public set target(value: string) {
		if (value === '_blank') {
			this.$needsRelationSafety = true;
		}

		this.$target = value;
	}

	public get target() {
		return this.$target;
	}
}

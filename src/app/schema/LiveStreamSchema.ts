export interface LiveStreamSchema {
	enabled: boolean;
	startDate: string;
	startTime: string;
	duration: string;
	channel: string | null;
}

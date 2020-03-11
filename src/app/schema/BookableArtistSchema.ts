export interface RawBookableArtistSchema {
	name: string;
	agency: string;
	live: boolean;
	genre: string;
	labels: string;
	wage: string;
	bookingFee: string;
	flights: string;
	flightDepartureLocation: string;
	totalFlightCost: string;
	hotelAmount: string;
	transferAmount: string;
	mealAmount: string;
	subtotalEUR: string;
	subtotalCHF: string;
	total: string;
}

export interface BookableArtistSchema {
	name: string;
	agency: string;
	live: boolean;
	genre: string;
	labels: string;
	wage: number;
	bookingFee: number;
	flights: number;
	flightDepartureLocation: string;
	totalFlightCost: number;
	hotelAmount: number;
	transferAmount: number;
	mealAmount: number;
	subtotalEUR: number;
	subtotalCHF: number;
	total: number;
}

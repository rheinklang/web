import { Injectable } from '@angular/core';
import { map, flatMap, first } from 'rxjs/operators';
import { CACHED_POLICY } from '../config/policies';
import { TicketByIdGQL } from '../queries/TicketById.query';

@Injectable({
	providedIn: 'root',
})
export class TicketsService {
	constructor(private ticketsByIdGQL: TicketByIdGQL) {}

	public getTicketInfoById(id: string) {
		return this.ticketsByIdGQL
			.watch(
				{
					filter: { _id: id },
				},
				{
					fetchPolicy: CACHED_POLICY,
				}
			)
			.valueChanges.pipe(
				map((res) => res.data.ticketshopsCollection),
				flatMap((entry) => entry),
				first()
			);
	}
}

import { Subscription } from 'rxjs';

export type PossibleSubscription = Subscription | undefined | null;

export const unsubscribe = (subscriptions: PossibleSubscription | PossibleSubscription[]) =>
	Array.isArray(subscriptions)
		? subscriptions.map(unsubscribe)
		: (subscriptions ? subscriptions.unsubscribe() : void 0);

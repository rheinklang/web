import { createId } from './id';
import { noop } from './noop';

export type CallbackFn = () => void;

const currentCallbackId = createId(8);

export class CallbackFactory {
	static callbacks = new Map<string, CallbackFn[]>();
	static calledCallbacks: string[] = [];

	constructor() {
		throw new Error('Callback Factory is not constructable');
	}

	public static tryRunImmediate(callbackId: string) {
		if (CallbackFactory.calledCallbacks.indexOf(callbackId) > -1) {
			if (CallbackFactory.callbacks.has(callbackId)) {
				const userCallbacks = CallbackFactory.callbacks.get(callbackId) || [];
				userCallbacks.forEach(callback => {
					callback();
				});
				window[callbackId] = undefined;
				CallbackFactory.callbacks.delete(callbackId);
			}
		}
	}

	public static attachCallback(type: string, fn: CallbackFn | CallbackFn[]) {
		const callbackId = CallbackFactory.getIdFor(type);

		if (!Array.isArray(fn)) {
			fn = [fn];
		}

		CallbackFactory.callbacks.set(callbackId, fn);

		if (this.calledCallbacks.indexOf(callbackId) > -1) {
			// callback already executed, running immediately ...
			return this.tryRunImmediate(callbackId);
		}

		window[callbackId] = () => {
			// attach listener and run immediately if executed
			this.calledCallbacks.push(callbackId);
			CallbackFactory.tryRunImmediate(callbackId);
		};
	}

	public static getIdFor(type: string) {
		return `__cbf_${currentCallbackId}_${type}`;
	}

	public static safe(types: string[]) {
		types.map(type => CallbackFactory.getIdFor(type)).forEach(type => {
			window[type] = noop;
		});
	}
}


// @ts-ignore
window.CallbackService = CallbackFactory;

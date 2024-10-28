export function safePromise<T>(
	promise: Promise<T>
): Promise<[undefined, T] | [Error, undefined]> {
	return promise
		.then((data) => [undefined, data] as [undefined, T])
		.catch((error) => [error, undefined] as [Error, undefined]);
}

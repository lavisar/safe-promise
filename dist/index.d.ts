export declare function safePromise<T>(promise: Promise<T>): Promise<[undefined, T] | [Error, undefined]>;

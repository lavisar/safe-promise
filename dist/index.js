"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safePromise = safePromise;
function safePromise(promise) {
    return promise
        .then((data) => [undefined, data])
        .catch((error) => [error, undefined]);
}

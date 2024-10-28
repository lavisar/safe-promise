# ts-safe-promise

A lightweight utility for handling promises safely without the need for `try...catch`. This package returns both error and result in a predictable format, simplifying asynchronous error handling in JavaScript and TypeScript.

## Installation
```bash
npm install ts-safe-promise
```
Or with yarn:
```bash
yarn add ts-safe-promise
```

### Example
- Import catchError and use it to handle async functions without try...catch:
```typescript
import { safePromise } from 'ts-safe-promise';

async function fetchData() {
    const [error, data] = await safePromise(fetchDataFromAPI());

    if (error) {
        console.error('Error fetching data:', error);
        return;
    }

    console.log('Data:', data);
}
```

## Why `ts-safe-promise`?

In JavaScript, handling asynchronous operations often involves using `try...catch` blocks around `await` statements. While effective, this approach has a few downsides:

1. **Verbosity**: Every time you need to handle errors, you end up writing `try...catch` around each async function, making code longer and less readable.
2. **Nested Error Handling**: When chaining multiple promises, `try...catch` becomes cumbersome and may lead to nested error handling.
3. **Inconsistent Results**: Without `try...catch`, an unhandled promise rejection can crash your application, making it necessary to handle errors carefully in every async call.

### Example Problem

Using `try...catch` repeatedly can clutter your code:

```typescript
async function fetchData() {
    try {
        const data = await fetchDataFromAPI();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}
```
### With multiple await statements, this can get repetitive and harder to read:
```typescript
async function performActions() {
    try {
        const data1 = await fetchDataFromAPI1();
        const data2 = await fetchDataFromAPI2(data1);
        const result = await processData(data2);
        return result;
    } catch (error) {
        console.error('Error performing actions:', error);
    }
}
```
### How `ts-safe-promise` Solves This
- `ts-safe-promise` offers a simpler way to handle asynchronous operations by ensuring every Promise returns in a consistent [error, data] format:

- Consistent Results: Each async function call always returns either [undefined, result] (on success) or [error, undefined] (on failure).
- Readable Code: Avoids try...catch, allowing for more readable and maintainable code.
Flexible Error Handling: Handle errors directly in the response without needing to wrap each call.

### Usage
```typescript
import { safePromise } from 'ts-safe-promise';

async function performActions() {
    const [error1, data1] = await safePromise(fetchDataFromAPI_1());
    if (error1) {
        console.error('Error fetching data 1:', error1);
        return;
    }

    const [error2, data2] = await safePromise(fetchDataFromAPI_2(data1));
    if (error2) {
        console.error('Error fetching data 2:', error2);
        return;
    }

    const [error3, result] = await safePromise(processData(data2));
    if (error3) {
        console.error('Error processing data:', error3);
        return;
    }

    console.log('Result:', result);
}

```

### API
- safePromise(promise: Promise<T>): Promise<[Error, undefined] | [undefined, T]>
- Parameters: Accepts a promise that resolves with type T.
- Returns: A promise resolving to [undefined, result] if successful, or [error, undefined] if failed.

### License
MIT License.

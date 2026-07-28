# client-error-logger

## Install

- After creating a new tag you can install the new version by running the following command:

```bash
    npm install github:ramonkroetz/client-error-logger#v2.0.0
```

## How to use

```ts
import { configure, getBrowserId, logError } from "client-error-logger";

configure({
  /* not call endpoint, just show in console */
  debug: true, // default: false
  /* disable logger */
  disable: false, // default: false
  /* endpoint to send logs */
  logEndpoint: "/log", // default: ''
});

const anyObjectError = {};
logError("Error message", { anyObjectError });

// Returns a stable, anonymous identifier for the current browser.
const browserId = await getBrowserId();
console.log("Browser ID:", browserId);
```

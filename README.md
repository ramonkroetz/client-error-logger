# client-error-logger

## Install

```bash
  npm install github:ramonkroetz/client-error-logger#v1.0.1
```

## How to use

```ts
import { configure, logError } from "client-error-logger"

configure({
  /* not call endpoint, just show in console */
  debug: true, // default: false
  /* disable logger */
  disable: false, // default: false
  /* endpoint to send logs */
  logEndpoint: "/log", // default: ''
})

const anyObjectError = {}
logError("Error message", { anyObjectError })
```

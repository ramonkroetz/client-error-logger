# client-error-logger

## How to use

testing workflows 2

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

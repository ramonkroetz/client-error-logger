import { configure, getBrowserId, logError } from './src/index.ts'

async function main() {
  console.log('Browser ID:', await getBrowserId())

  configure({
    debug: true,
    logEndpoint: '/log',
  })

  logError('This is a test error message from the browser logger.', {
    userId: '12345',
  })
}

main()

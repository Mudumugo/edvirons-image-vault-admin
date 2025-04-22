
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// Initialize the MSW worker
export const worker = setupWorker(...handlers)

// This is important - it will create the mockServiceWorker.js file in the public folder
if (typeof window !== 'undefined') {
  // Only in browser environment
  import('msw/browser').then(({ worker }) => {
    worker.start({
      onUnhandledRequest: 'bypass', // Don't warn about unhandled requests
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
    })
  })
}

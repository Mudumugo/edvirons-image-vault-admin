
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

// Initialize the MSW worker
export const worker = setupWorker(...handlers)

// Do not attempt to import MSW again from within this file
// This would cause circular imports

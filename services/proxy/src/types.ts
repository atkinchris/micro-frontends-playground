import { IncomingMessage } from 'http'

interface Context {
  headersToAddToResponse?: Record<string, string | string[]>
}

type RequestWithContext = IncomingMessage & { context: Context }

export { Context, RequestWithContext }

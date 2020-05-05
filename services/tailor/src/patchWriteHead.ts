import { ServerResponse, OutgoingHttpHeaders } from 'http'

import { Context } from './types'

const patchWriteHead = (res: ServerResponse, context: Context) => {
  const originalWriteHead = res.writeHead.bind(res)

  // writeHead is an overloaded method, and the spread prop typing is too loose
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res.writeHead = (statusCode: number, ...rest: any[]) => {
    if (statusCode >= 500) {
      return originalWriteHead(statusCode, ...rest)
    }

    // Get headers based on number of arguments passed, as this method can be overloaded
    const headers: OutgoingHttpHeaders | undefined = typeof rest[0] === 'string' ? rest[1] : rest[0]
    const reasonPhrase: string | undefined = typeof rest[0] === 'string' ? rest[0] : undefined

    // Combine headers from arguments with headers from the context
    const patchedHeaders = {
      ...context.headersToAddToResponse,
      ...headers,
    }

    if (reasonPhrase) {
      return originalWriteHead(statusCode, reasonPhrase, patchedHeaders)
    }

    return originalWriteHead(statusCode, patchedHeaders)
  }
}

export default patchWriteHead

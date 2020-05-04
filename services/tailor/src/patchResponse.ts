import { ServerResponse, OutgoingHttpHeaders } from 'http'
import RequestWithContext from './RequestWithContext'

const patchResponse = (req: RequestWithContext, res: ServerResponse) => {
  const originalWriteHead = res.writeHead.bind(res)
  res.writeHead = (statusCode: number, ...rest: any[]) => {
    if (statusCode >= 500) {
      return originalWriteHead(statusCode, ...rest)
    }

    const incomingHeaders: OutgoingHttpHeaders | undefined = typeof rest[0] === 'string' ? rest[1] : rest[0]
    const reasonPhrase: string | undefined = typeof rest[0] === 'string' ? rest[0] : undefined
    const patchedHeaders = { ...incomingHeaders, ...req.context?.headers.entries() }

    console.log('Patching headers', patchedHeaders)

    if (reasonPhrase) {
      return originalWriteHead(statusCode, reasonPhrase, patchedHeaders)
    }

    return originalWriteHead(statusCode, patchedHeaders)
  }
}

export default patchResponse

import { ServerResponse, OutgoingHttpHeaders } from 'http'
import RequestWithContext from './RequestWithContext'

const patchResponse = (req: RequestWithContext, res: ServerResponse) => {
  const originalWriteHead = res.writeHead.bind(res)

  // writeHead is an overloaded method, and the spread prop typing is too loose
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res.writeHead = (statusCode: number, ...rest: any[]) => {
    if (statusCode >= 500) {
      return originalWriteHead(statusCode, ...rest)
    }

    const incomingHeaders: OutgoingHttpHeaders | undefined = typeof rest[0] === 'string' ? rest[1] : rest[0]
    const reasonPhrase: string | undefined = typeof rest[0] === 'string' ? rest[0] : undefined
    const patchedHeaders = {
      ...req.context?.headers.raw(),
      ...incomingHeaders,
    }

    delete patchedHeaders['content-length']
    delete patchedHeaders['content-encoding']

    if (reasonPhrase) {
      return originalWriteHead(statusCode, reasonPhrase, patchedHeaders)
    }

    return originalWriteHead(statusCode, patchedHeaders)
  }
}

export default patchResponse

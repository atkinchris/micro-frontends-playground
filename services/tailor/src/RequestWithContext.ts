import { IncomingMessage } from 'http'
import { Headers } from 'node-fetch'

type RequestWithContext = IncomingMessage & { context?: { headers: Headers } }

export default RequestWithContext
